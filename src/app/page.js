import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50 text-gray-800">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold mb-4 text-black-600">SustainWear</h1>
        <h2 className="text-2xl font-semibold mb-2">Help the planet, one outfit at a time</h2>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-2 bg-black text-white rounded-lg border shadow hover:bg-white hover:text-black hover:border-black-600 transition"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="px-6 py-2 border border-black-600 text-black-600 rounded-lg hover:bg-blue-50 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
