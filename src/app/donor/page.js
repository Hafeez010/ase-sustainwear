'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Donor() {
  const router = useRouter();
  const pathname = usePathname(); // 👈 tells us which page we’re on

  const [username, setUsername] = useState('Donor');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ donationsMade: 0, totalItems: 0 });

  useEffect(() => {
    const stored =
      typeof window !== 'undefined' ? localStorage.getItem('username') : null;
    if (stored) setUsername(stored);

    // demo data; swap for API later
    setTimeout(() => {
      setStats({ donationsMade: 8, totalItems: 29 });
      setLoading(false);
    }, 200);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    router.push('/login');
  };

  // helper to style links based on current route
  const linkStyle = (href) =>
    pathname === href
      ? 'px-3 py-1 rounded-md border-2 border-black bg-black text-white transition'
      : 'px-3 py-1 rounded-md border-2 border-black bg-white text-black hover:bg-gray-100 transition';

  return (
    <main className="min-h-screen bg-gray-50 text-slate-900">
      {/* Header */}
      <header className="bg-white border-b-2 border-black">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md border-2 border-black flex items-center justify-center font-bold">
              SW
            </div>
            <span className="text-lg font-bold">SustainWear</span>
          </div>

          {/* Top navigation */}
          <nav className="hidden md:flex items-center gap-3">
            <Link href="/donor" className={linkStyle('/donor')}>
              Dashboard
            </Link>
            <Link
              href="/donor/donations"
              className={linkStyle('/donor/donations')}
            >
              Submit Donation
            </Link>
            <Link href="/donor/history" className={linkStyle('/donor/history')}>
              History
            </Link>
            <Link
              href="/donor/contactUs"
              className={linkStyle('/donor/contactUs')}
            >
              Contact Us
            </Link>
          </nav>

          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded-md border-2 border-black bg-black text-white hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="bg-white border-2 border-black rounded-xl p-8 shadow-sm">
            <h1 className="text-3xl font-extrabold mb-3">Hello, {username}.</h1>
            <p className="text-slate-600 leading-relaxed">
              Thanks for supporting circular fashion. Use the options above to
              submit a donation or browse your past contributions. Your
              generosity helps clothing reach people who need it.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/donor/donations"
                className="px-4 py-2 rounded-md border-2 border-black bg-black text-white hover:bg-gray-800 transition"
              >
                Submit Donation
              </Link>
              <Link
                href="/donor/history"
                className="px-4 py-2 rounded-md border-2 border-black bg-white hover:bg-gray-100 transition"
              >
                View History
              </Link>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="bg-white border-2 border-black rounded-xl p-4 shadow-sm">
            <div className="aspect-video w-full rounded-md border border-black bg-gray-100 flex items-center justify-center">
              <span className="text-slate-500 text-sm">
                Hero Image / Donation Photo Placeholder
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-6 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-black rounded-xl p-6 shadow-sm">
            <p className="text-sm text-slate-600">Donations Made</p>
            <p className="mt-1 text-4xl font-extrabold">
              {loading ? '—' : stats.donationsMade}
            </p>
          </div>
          <div className="bg-white border-2 border-black rounded-xl p-6 shadow-sm">
            <p className="text-sm text-slate-600">Total Items Donated</p>
            <p className="mt-1 text-4xl font-extrabold">
              {loading ? '—' : stats.totalItems}
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Submit Donation */}
          <Link
            href="/donor/donations"
            className="group block bg-white border-2 border-black rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <div className="aspect-[4/3] w-full border-b-2 border-black bg-gray-100 flex items-center justify-center">
              <span className="text-slate-500 text-sm">
                Image: neatly folded clothes
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Submit Donation</h3>
              <p className="text-slate-600">
                Log items with type, condition, and a photo. Simple form, a few
                minutes.
              </p>
              <span className="mt-4 inline-block px-3 py-1 border-2 border-black rounded-md bg-white group-hover:bg-gray-100 transition">
                Start Now →
              </span>
            </div>
          </Link>

          {/* View History */}
          <Link
            href="/donor/history"
            className="group block bg-white border-2 border-black rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <div className="aspect-[4/3] w-full border-b-2 border-black bg-gray-100 flex items-center justify-center">
              <span className="text-slate-500 text-sm">Image: timeline / list</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">View History</h3>
              <p className="text-slate-600">
                See dates, items, and statuses (Pending, Approved, Distributed).
              </p>
              <span className="mt-4 inline-block px-3 py-1 border-2 border-black rounded-md bg-white group-hover:bg-gray-100 transition">
                View Records →
              </span>
            </div>
          </Link>

          {/* Contact Us */}
          <Link
            href="/donor/contactUs"
            className="group block bg-white border-2 border-black rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <div className="aspect-[4/3] w-full border-b-2 border-black bg-gray-100 flex items-center justify-center">
              <span className="text-slate-500 text-sm">
                Image: support / chat bubbles
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Contact Us</h3>
              <p className="text-slate-600">
                Questions or issues? Reach our team for quick support.
              </p>
              <span className="mt-4 inline-block px-3 py-1 border-2 border-black rounded-md bg-white group-hover:bg-gray-100 transition">
                Get Help →
              </span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
