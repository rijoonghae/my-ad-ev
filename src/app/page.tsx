import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
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

      {/* MAINPAGE */}
      <main className="max-w-3xl text-gray-700 mx-auto px-6 py-24">
        <h1 className="text-3xl font-bold mb-6">Selamat datang di Ada-EV</h1>

        <Image src="/ADA-EV.png" alt="Logo Ada-EV" width={108*4.5} height={60} priority/>

        <p className="text-2xl font-normal max-w-md py-6 text-gray-800">
          Bingung cari mobil listrik? Ada-EV bisa bantu rekomendasiin kamu cari mobil listrik terbaik!
        </p>
      </main>
      
      {/* Placeholder section untuk form rekomendasi */}
      <section className="max-w-4xl mx-auto px-6 py-24">
          <h2 className="text-center font-bold mb-6 text-3xl text-gray-800 ">
            Mobil yang baru ditambahkan
          </h2>
          <h3 className="text-center font-normal mb-12 text-xl text-gray-500 ">
            Bingung? coba lihat dulu mobil-mobil yang baru kami tambahkan
          </h3>

          <div className="flex justify-center px-5 gap-8">
            {/* Placeholder gambar mobil listrik */}
            {[1, 2, 3].map((item) => (
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
        </section>

        {/* Placeholder section untuk rekomendasi */}
          <section className="flex items-center justify-center gap-8 bg-[#FBD9CD] text-gray-700 py-20">
            <div className="max-w-xs text-center">
              <h2 className="m4-4 mb-5 font-bold text-3xl">Kami bantu rekomendasikan</h2>
              <p className="mb-4 font-light xl">
                Tekan tombol dibawah jika kamu penasaran dengan rekomendasi mobil listrik yang sesuai dengan kebutuhanmu!
              </p>
              <Link href="/rekomendasi">
                <button className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition">
                  Coba Rekomendasi
                </button>
              </Link>
            </div>
            <div className="w-40 h-40 flex items-center justify-center rounded-md">
              <Image
                src="/product_suggestion.png"
                alt="Product Suggestion"
                width={170*2}
                height={170*2}
                className="object-cover rounded-md"
              />
            </div>
      </section>
    </div>
  );
}
