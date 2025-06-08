'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function AddMobil() {
  const [formData, setFormData] = useState({
    merk: '',
    model: '',
    harga: '',
    kapasitas_baterai: '',
    tenaga_hp: '',
    jarak_tempuh: '',
    kecepatan_maks: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Cek autentikasi
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/admin/login');
      }
    };
    
    checkAuth();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert string values to numbers where needed
      const mobilData = {
        merk: formData.merk,
        model: formData.model,
        harga: parseFloat(formData.harga),
        kapasitas_baterai: parseFloat(formData.kapasitas_baterai),
        tenaga_hp: parseFloat(formData.tenaga_hp),
        jarak_tempuh: parseFloat(formData.jarak_tempuh),
        kecepatan_maks: parseFloat(formData.kecepatan_maks),
      };

      const { error } = await supabase
        .from('mobil_listrik')
        .insert([mobilData]);

      if (error) throw error;
      
      // Redirect back to dashboard after successful insert
      router.push('/admin/dashboard');
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Tambah Mobil Listrik</h1>
            <Link
              href="/admin-dashboard"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Kembali
            </Link>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Merk
                </label>
                <input
                  type="text"
                  name="merk"
                  value={formData.merk}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  name="harga"
                  value={formData.harga}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Kapasitas Baterai (kWh)
                </label>
                <input
                  type="number"
                  name="kapasitas_baterai"
                  value={formData.kapasitas_baterai}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tenaga (HP)
                </label>
                <input
                  type="number"
                  name="tenaga_hp"
                  value={formData.tenaga_hp}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Jarak Tempuh (km)
                </label>
                <input
                  type="number"
                  name="jarak_tempuh"
                  value={formData.jarak_tempuh}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Kecepatan Maksimum (km/jam)
                </label>
                <input
                  type="number"
                  name="kecepatan_maks"
                  value={formData.kecepatan_maks}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#F27E68] hover:bg-[#e56c58] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {loading ? 'Menyimpan...' : 'Simpan Data'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
