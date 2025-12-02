'use client';
import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function HistoryPage() {
  const pathname = usePathname();
  const router = useRouter();

  // Active nav styling
  const linkStyle = (path) =>
    pathname === path
      ? 'px-3 py-1 rounded-md border-2 border-black bg-black text-white transition'
      : 'px-3 py-1 rounded-md border-2 border-black bg-white text-black hover:bg-gray-100 transition';

  // 🔥 REAL DATA INSTEAD OF demo[]
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---- Filters & UI state ----
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [type, setType] = useState('All');
  const [sort, setSort] = useState('newest'); // newest | oldest
  const [visible, setVisible] = useState(6);  // pagination: how many rows to show
  const [detail, setDetail] = useState(null); // selected row for modal

  const clothingTypes = [
    'All','Jumpers','Trousers','Shirts','T-Shirts','Jeans','Shorts','Dresses','Skirts',
    'Jackets','Coats','Hoodies','Cardigans','Blazers','Shoes','Trainers','Boots','Sandals',
    'Scarves','Hats','Gloves','Socks','Underwear (new only)','Baby Clothes','Kids Clothes',
    'Sportswear','Nightwear','Accessories','Other'
  ];

   const rows = useMemo(() => {
  let r = [...donations];

  // --- SEARCH ---
  if (search.trim()) {
    const q = search.toLowerCase();
    r = r.filter((x) =>
      x.items.join(', ').toLowerCase().includes(q) ||
      (x.description || "").toLowerCase().includes(q) ||
      x.id.toLowerCase().includes(q)
    );
  }

  // --- STATUS FILTER ---
  if (status !== "All") {
    r = r.filter((x) => x.status === status);
  }

  // --- TYPE FILTER ---
  if (type !== "All") {
    r = r.filter((x) => x.items[0] === type);
  }

  // --- SORT ---
  r.sort((a, b) =>
    sort === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  return r;
}, [donations, search, status, type, sort]);

  // Fetch donation history for logged-in user
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
      return;
    }

    async function load() {
      try {
        const res = await fetch(`/api/donations/history?userId=${userId}`);
        const data = await res.json();
        if (res.ok) {
          // convert DB rows → UI format
          const formatted = data.map((d) => ({
            id: d.DonationID,
            date: d.SubmittedAt,
            items: [d.Type],        // your table has only a single Type
            quantity: d.Quantity,
            condition: d.Condition,
            status: d.Status,
            description: d.Description || '',
          }));
          setDonations(formatted);
        }
      } catch (e) {
        console.error("History fetch error:", e);
      }
      setLoading(false);
    }

    load();
  }, []);

  // If loading still…
  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center text-xl">
        Loading…
      </main>
    );


  




  // ---- Summary ----
  const totalDonations = rows.length;
  const totalItems = rows.reduce((sum, r) => sum + r.quantity, 0);

  // ---- CSV export of current rows ----
  const exportCSV = () => {
    const header = ['Reference','Date','Items','Quantity','Condition','Status','Description'];
    const body = rows.map((r) => [
      r.id,
      r.date,
      r.items.join(' | '),
      r.quantity,
      r.condition,
      r.status,
      r.description.replace(/\n/g, ' '),
    ]);
    const csv = [header, ...body].map((line) =>
      line.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sustainwear-donation-history.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // ---- Status badge ----
  const StatusBadge = ({ value }) => {
    const base = 'inline-flex items-center px-2 py-0.5 rounded-md text-xs border-2 border-black';
    if (value === 'Approved') return <span className={`${base} bg-white`}>Approved</span>;
    if (value === 'Distributed') return <span className={`${base} bg-white`}>Distributed</span>;
    return <span className={`${base} bg-white`}>Pending</span>;
  };

  return (
    <main className="min-h-screen bg-gray-50 text-slate-900">
      {/* Header */}
      <header className="bg-white border-b-2 border-black">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md border-2 border-black flex items-center justify-center font-bold">SW</div>
            <span className="text-lg font-bold">SustainWear</span>
          </div>
          <nav className="hidden md:flex items-center gap-3">
            <Link href="/donor" className={linkStyle('/donor')}>Dashboard</Link>
            <Link href="/donor/donations" className={linkStyle('/donor/donations')}>Submit Donation</Link>
            <Link href="/donor/history" className={linkStyle('/donor/history')}>History</Link>
            <Link href="/donor/contactUs" className={linkStyle('/donor/contactUs')}>Contact Us</Link>
          </nav>
          <button
            onClick={() => router.push('/login')}
            className="px-3 py-1 rounded-md border-2 border-black bg-black text-white hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        {/* Title + actions */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-extrabold">Donation History</h1>
          <div className="flex gap-2">
            <button
              onClick={exportCSV}
              className="px-3 py-1 rounded-md border-2 border-black bg-white hover:bg-gray-100 transition"
            >
              Export CSV
            </button>
            <Link
              href="/donor/donations"
              className="px-3 py-1 rounded-md border-2 border-black bg-black text-white hover:bg-gray-800 transition"
            >
              New Donation
            </Link>
          </div>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border-2 border-black rounded-xl p-5 text-center">
            <p className="text-sm text-slate-600">Total Donations</p>
            <p className="mt-1 text-4xl font-extrabold">{totalDonations}</p>
          </div>
          <div className="bg-white border-2 border-black rounded-xl p-5 text-center">
            <p className="text-sm text-slate-600">Total Items</p>
            <p className="mt-1 text-4xl font-extrabold">{totalItems}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-2 border-black rounded-xl p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by item, description, or reference…"
              className="w-full px-3 py-2 border-2 border-black rounded-md focus:outline-none"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black rounded-md bg-white"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Distributed</option>
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black rounded-md bg-white"
            >
              {clothingTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black rounded-md bg-white"
            >
              <option value="newest">Newest → Oldest</option>
              <option value="oldest">Oldest → Newest</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border-2 border-black rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 border-b-2 border-black">
                <tr>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Reference</th>
                  <th className="text-left px-4 py-3">Items</th>
                  <th className="text-left px-4 py-3">Qty</th>
                  <th className="text-left px-4 py-3">Condition</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, visible).map((r) => (
                  <tr key={r.id} className="border-b border-black/20">
                    <td className="px-4 py-3">{new Date(r.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{r.id}</td>
                    <td className="px-4 py-3">
                      {r.items.length > 2 ? `${r.items[0]}, ${r.items[1]} +${r.items.length - 2} more` : r.items.join(', ')}
                    </td>
                    <td className="px-4 py-3">{r.quantity}</td>
                    <td className="px-4 py-3">{r.condition}</td>
                    <td className="px-4 py-3"><StatusBadge value={r.status} /></td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setDetail(r)}
                        className="px-2 py-1 border-2 border-black rounded-md bg-white hover:bg-gray-100 transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-600">
                      No donations yet. Start with your first one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Load more */}
          {visible < rows.length && (
            <div className="p-4 border-t-2 border-black text-center">
              <button
                onClick={() => setVisible((v) => v + 6)}
                className="px-4 py-2 border-2 border-black rounded-md bg-white hover:bg-gray-100 transition"
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Details Modal */}
      {detail && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black rounded-xl max-w-lg w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-extrabold">Donation Details</h3>
              <button
                onClick={() => setDetail(null)}
                className="px-2 py-1 border-2 border-black rounded-md bg-white hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Reference:</span> {detail.id}</p>
              <p><span className="font-semibold">Date:</span> {new Date(detail.date).toLocaleDateString()}</p>
              <p><span className="font-semibold">Items:</span> {detail.items.join(', ')}</p>
              <p><span className="font-semibold">Quantity:</span> {detail.quantity}</p>
              <p><span className="font-semibold">Condition:</span> {detail.condition}</p>
              <p><span className="font-semibold">Status:</span> {detail.status}</p>
              <p><span className="font-semibold">Notes:</span> {detail.description}</p>
              <div className="pt-3">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1 border-2 border-black rounded-md bg-white hover:bg-gray-100 transition"
                >
                  Print / Save as PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
