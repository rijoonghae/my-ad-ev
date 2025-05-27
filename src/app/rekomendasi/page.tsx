'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";


export default function Rekomendasi() {
  const [formData, setFormData] = useState({
    harga: '',
    baterai: '',
    tenaga: '',
    jarak: '',
    kecepatan_max: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic pencarian rekomendasi nanti di sini
    alert('End of the feature');
  };

  return (
    <main className="min-h-screen bg-[#FBD9CD] text-gray-800">
        {/* NAVBAR */}
      <nav className="flex items-center justify-between bg-[#F27E68] px-10 py-4">
        {/* LOGO */}
        <div className="flex items-center space-x-2">
          <Link href="/">
              <Image src="/Ada-EV.png" alt="Logo Ada-EV" width={108} height={60} priority/>
          </Link>
        </div>

        {/* MENU NAVBAR */}
        <div className="flex space-x-8 text-white font-normal text-lg">
          <Link href="/" className="hover:underline">Rekomendasi</Link>
          <Link href="/" className="hover:underline">Mobil Listrik</Link>
          
        </div>
      </nav>

        {/* FORM REKOMENDASI */}
      <section className="max-w-xl mx-auto px-6 py-24">
        <h1 className="mb- text-2xl text-gray-800 font-semibold text-center mx-auto px-6 py-24">Apa yang ingin kamu inginkan?</h1>
          
          <form
              onSubmit={handleSubmit}
              className="max-w-3xl mx-auto grid grid-cols-2 gap-6"
          >
              {/* 1 Dropdown Harga POIN:3*/}
              <div className="mb-4">
                  <label htmlFor="harga" className="block mb-1 font-semibold">
                      Harga
                  </label>
                  <select
                  name="harga"
                  value={formData.harga}
                  onChange={handleChange}
                  className="p-3 rounded border border-gray-500 min-w-[250px]"
                  required
                  >
                  <option value="" disabled>Pilih Harga</option>
                  <option value="3">Ekonomis</option>
                  <option value="2">Menengah</option>
                  <option value="1">Premium</option>
                  </select> 
              </div>  

              {/* 2 Dropdown Kapasitas Baterai POIN:3 */}
              <div className="mb-4">
                  <label htmlFor="baterai" className="block mb-1 font-semibold">
                      Kapasitas Baterai (kWh)
                  </label>
                  <select
                  id='baterai'
                  name="baterai"
                  value={formData.baterai}
                  onChange={handleChange}
                  className="p-3 rounded border border-gray-500 min-w-[250px]"
                  required
                  >
                  <option value="" disabled>Pilih Kapasitas Baterai</option>
                  <option value="1">Kecil</option>
                  <option value="2">Menengah</option>
                  <option value="3">Besar</option>
                  </select>
              </div>

              {/* 3 Dropdown Tenaga POIN:5*/}
              <div className="mb-4">
                  <label htmlFor="tenaga" className="block mb-1 font-semibold whitespace-nowrap">
                      Tenaga (HP)
                  </label>
                  <select
                  name="tenaga"
                  value={formData.tenaga}
                  onChange={handleChange}
                  className="p-3 rounded border border-gray-500 min-w-[250px]"
                  required
                  >
                  <option value="" disabled>Kategori Tenaga</option>
                  <option value="1">Sangat Rendah</option>
                  <option value="2">Rendah</option>
                  <option value="3">Biasa</option>
                  <option value="4">Besar</option>
                  <option value="5">Sangat Besar</option>
                  </select>
              </div>

              {/* 4 Dropdown Waktu Pengisian POIN:3*/}
              <div className="mb-4">
                  <label htmlFor="jarak" className="block mb-1 font-semibold whitespace-nowrap">
                      Jarak Tempuh (km)
                  </label>
                  <select
                  name="jarak"
                  value={formData.jarak}
                  onChange={handleChange}
                  className="p-3 rounded border border-gray-500 min-w-[250px]"
                  required
                  >
                  <option value="" disabled>Kategori Jarak</option>
                  <option value="1">Dekat</option>
                  <option value="2">Menengah</option>
                  <option value="3">Jauh</option>
                  </select>
              </div>

              {/* 5 Dropdown Kecepatan MAX POIN:3*/}
              <div className="mb-4">
                  <label htmlFor="kecepatan_max" className="block mb-1 font-semibold">
                      Kecepatan Maksimum (km/jam)
                  </label>
                  <select
                  name="kecepatan_max"
                  value={formData.kecepatan_max}
                  onChange={handleChange}
                  className="p-3 rounded border border-gray-500 min-w-[250px]"
                  required
                  >
                  <option value="" disabled>Kategori Kecepatan</option>
                  <option value="1">Rendah</option>
                  <option value="2">Menengah</option>
                  <option value="3">Cepat</option>

                  </select>
              </div>

              {/* Tombol Cari */}
              <div className="col-span-2 text-right">
              <button
                  type="submit"
                  className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
              >
                  Cari  
              </button>
              </div>
          </form>
      </section>
    </main>
  );
}
