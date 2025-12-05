import Link from 'next/link';
import Image from "next/image"; 

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-gray-50 text-gray-800">

      {/* ---------- HERO SECTION ---------- */}
      <section className="flex flex-col items-center text-center pt-28 pb-20 px-4">
        <h1 className="text-9xl font-extrabold mb-6 text-black-600">SustainWear</h1>

        <h2 className="text-xl md:text-2xl font-semibold mb-8">
          Help the planet, one outfit at a time
        </h2>

        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-2 bg-black text-white rounded-lg border shadow hover:bg-white hover:text-black transition"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="px-6 py-2 border border-black text-black rounded-lg hover:bg-gray-200 transition"
          >
            Sign Up
          </Link>
        </div>
      </section>

      {/* ---------- ABOUT SECTION ---------- */}
      <section className="flex flex-col md:flex-row items-center justify-center max-w-6xl my-20 px-6 gap-10">
        <div className="md:w-1/2">
          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
            <Image
  src="/Charity-photo.jpg"
  alt="About SustainWear"
  width={600}
  height={400}
  className="rounded-xl shadow-lg object-cover"
/>
          </div>
        </div>

        <div className="md:w-1/2">
          <h3 className="text-3xl font-bold mb-4">About SustainWear</h3>
          <p className="mb-4">
            SustainWear is a charity dedicated to reducing clothing waste while supporting
            communities in need. We collect, sort, and distribute pre-loved garments
            directly to local charities across the region.
          </p>
          <p>
            By choosing SustainWear, you're helping protect the planet while making a
            meaningful impact on the lives of those who need it most.
          </p>
        </div>
      </section>

      {/* ---------- IMPACT SECTION ---------- */}
      <section className="bg-gray-100 py-16 w-full">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h3 className="text-3xl font-bold mb-10">Our Impact</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="text-xl font-semibold mb-2">1000kg Recycled</h4>
              <p>Clothes saved from landfills through sustainable donation efforts.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="text-xl font-semibold mb-2">50+ Charities Supported</h4>
              <p>We work closely with local charity organizations to distribute clothing.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="text-xl font-semibold mb-2">500+ Donors</h4>
              <p>Growing community of people making a difference with every donation.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
