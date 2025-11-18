'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function DonationsPage() {
  const pathname = usePathname();
  const router = useRouter();

  // active-link style helper (current page turns black)
  const linkStyle = (path) =>
    pathname === path
      ? 'px-3 py-1 rounded-md border-2 border-black bg-black text-white transition'
      : 'px-3 py-1 rounded-md border-2 border-black bg-white text-black hover:bg-gray-100 transition';

  const [form, setForm] = useState({
    name: '',
    phone: '',
    type: 'Jumpers',
    condition: 'Good',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState('');

  const clothingOptions = [
    'Jumpers','Trousers','Shirts','T-Shirts','Jeans','Shorts','Dresses','Skirts',
    'Jackets','Coats','Hoodies','Cardigans','Blazers',
    'Shoes','Trainers','Boots','Sandals',
    'Scarves','Hats','Gloves','Socks','Underwear (new only)',
    'Baby Clothes','Kids Clothes','Sportswear','Nightwear','Accessories','Other'
  ];

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setNotice('');

    // TODO: replace with your real API call when ready
    setTimeout(() => {
      setSubmitting(false);
      setNotice('Thank you! Your donation has been recorded. We’ll follow up soon.');
      setForm({ name: '', phone: '', type: 'Jumpers', condition: 'Good', description: '' });
    }, 600);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-slate-900">
      {/* Header (same look as dashboard) */}
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

      {/* Donation Box */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <div className="bg-white border-2 border-black rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-extrabold text-center mb-8">Donation Box</h1>

          {notice && (
            <div className="mb-6 border-2 border-black rounded-md bg-gray-100 px-4 py-3 text-center text-sm">
              {notice}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row: Name / Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  className="w-full px-3 py-2 border-2 border-black rounded-md focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  inputMode="tel"
                  className="w-full px-3 py-2 border-2 border-black rounded-md focus:outline-none"
                  placeholder="Optional"
                />
              </div>
            </div>

            {/* Row: Type / Condition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="type" className="block text-sm font-medium mb-1">What would you like to donate?</label>
                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={onChange}
                  className="w-full px-3 py-2 border-2 border-black rounded-md bg-white focus:outline-none"
                >
                  {clothingOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="condition" className="block text-sm font-medium mb-1">Condition</label>
                <select
                  id="condition"
                  name="condition"
                  value={form.condition}
                  onChange={onChange}
                  className="w-full px-3 py-2 border-2 border-black rounded-md bg-white focus:outline-none"
                >
                  <option>New</option>
                  <option>Good</option>
                  <option>Used</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={onChange}
                rows={3}
                className="w-full px-3 py-2 border-2 border-black rounded-md focus:outline-none"
                placeholder="Optional: size, brand, quantity, notes…"
              />
            </div>

            {/* Submit */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto px-6 py-2 border-2 border-black rounded-md bg-black text-white hover:bg-gray-800 transition disabled:opacity-70"
              >
                {submitting ? 'Submitting…' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
