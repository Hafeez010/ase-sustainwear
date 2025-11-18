'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function ContactUsPage() {
  const pathname = usePathname();
  const router = useRouter();

  // active nav styling (current page is black)
  const linkStyle = (path) =>
    pathname === path
      ? 'px-3 py-1 rounded-md border-2 border-black bg-black text-white transition'
      : 'px-3 py-1 rounded-md border-2 border-black bg-white text-black hover:bg-gray-100 transition';

  // simple form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setNotice('');

    // Simulate API call — replace with your endpoint later
    setTimeout(() => {
      setSubmitting(false);
      setNotice('Thanks! Your message has been sent. Our team will get back to you soon.');
      setForm({ name: '', email: '', phone: '', message: '' });
    }, 600);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-slate-900">
      {/* Header (same as other pages) */}
      <header className="bg-white border-b-2 border-black">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md border-2 border-black flex items-center justify-center font-bold">
              SW
            </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Contact form */}
          <div className="bg-white border-2 border-black rounded-xl shadow-sm p-8">
            <h1 className="text-3xl font-extrabold mb-6">Contact us</h1>
            <p className="text-slate-700 font-semibold mb-6">
              Please fill in the form below:
            </p>

            {notice && (
              <div className="mb-6 border-2 border-black rounded-md bg-gray-100 px-4 py-3 text-sm">
                {notice}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={onChange}
                  className="w-full px-3 py-2 border-2 border-black rounded-md focus:outline-none"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  className="w-full px-3 py-2 border-2 border-black rounded-md focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  inputMode="tel"
                  value={form.phone}
                  onChange={onChange}
                  className="w-full px-3 py-2 border-2 border-black rounded-md focus:outline-none"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  What’s on your mind? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={onChange}
                  className="w-full px-3 py-2 border-2 border-black rounded-md focus:outline-none"
                  placeholder="Tell us how we can help…"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full md:w-auto px-6 py-2 border-2 border-black rounded-md bg-black text-white hover:bg-gray-800 transition disabled:opacity-70"
                >
                  {submitting ? 'Sending…' : 'Submit'}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Service info */}
          <div className="bg-white border-2 border-black rounded-xl shadow-sm p-8 flex items-center">
            <div className="w-full text-center lg:text-left">
              <h2 className="text-xl font-extrabold mb-4">Customer Service</h2>
              <p className="text-slate-700 leading-relaxed">
                Do you need support or would like to receive information? Our team is available to
                answer your questions.
              </p>
              <p className="mt-4 text-slate-900 font-semibold break-words">
                Email: <span className="underline">support@sustainwear.com</span>
              </p>
              <p className="mt-2 text-slate-700">
                Our Customer Care team is available from <br />
                <span className="font-semibold">Monday to Friday: 9:00 am – 5:30 pm</span>
              </p>

              <div className="mt-6 border-2 border-black rounded-md bg-gray-50 px-4 py-3 text-sm">
                Prefer to call? <span className="font-semibold">+44 0200 123 456</span><br />
                Response time: usually within 1–2 business days.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
