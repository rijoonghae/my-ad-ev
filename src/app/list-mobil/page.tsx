import Image from "next/image";
import Link from "next/link";

export default function ListMobil() {
    return  (
    <div className="min-h-screen bg-[#FBD9CD]">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between bg-[#F27E68] px-10 py-4">
        {/* LOGO */}
        <div className="flex items-center space-x-2">
          <Link href="/">
              <Image src="/ADA-EV.png" alt="Logo Ada-EV" width={108} height={60} priority/>
          </Link>
        </div>

        {/* MENU NAVBAR */}
        <div className="flex space-x-8 text-white font-normal text-lg">
          <Link href="/rekomendasi" className="hover:underline">Rekomendasi</Link>
          <Link href="/list-mobil" className="hover:underline">Mobil Listrik</Link>
          
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-24">
          <h2 className="text-left font-bold mb-16 text-3xl text-gray-800 ">
            Mobil yang baru ditambahkan
          </h2>

          <div className="flex justify-center px-5 gap-8">
            {/* Placeholder gambar mobil listrik */}
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="w-70 h-70 bg-gray-300 flex items-center justify-center rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 16V8a4 4 0 10-8 0v8"
                  />
                </svg>
              </div>
            ))}
          </div>
        </main>
    </div>
    );
}