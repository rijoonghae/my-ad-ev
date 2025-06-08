'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';

interface MobilListrik {
  id: number;
  merk: string;
  model: string;
  harga: number;
  kapasitas_baterai: number;
  tenaga_hp: number;
  jarak_tempuh: number;
  kecepatan_maks: number;
}

export default function AdminDashboard() {
  const [mobil, setMobil] = useState<MobilListrik[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Cek autentikasi
    const checkAuth = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/admin/dashboard');
        return;
      }
      
      // Ambil data mobil
      fetchMobil();
    };
    
    checkAuth();
  }, [router]);

  const fetchMobil = async () => {
    try {
      setLoading(true);
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data, error } = await supabase
        .from('mobil_listrik')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      setMobil(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { error } = await supabase
        .from('mobil_listrik')
        .delete()
        .eq('id', id);
      if (error) throw error;
      
      // Refresh data
      fetchMobil();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };
  const handleLogout = async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-[#F27E68] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/ADA-EV.png" alt="Logo Ada-EV" width={100} height={50} />
            <span className="ml-4 font-semibold">Admin Dashboard</span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-[#F27E68] px-4 py-2 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Daftar Mobil Listrik</h1>
            <Link
              href="/admin/dashboard/add"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Tambah Mobil
            </Link>
          </div>
          
          {loading ? (
            <p className="text-center py-4">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-4">{error}</p>
          ) : mobil.length === 0 ? (
            <p className="text-center py-4">Belum ada data mobil listrik.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">ID</th>
                    <th className="py-2 px-4 border-b text-left">Merk</th>
                    <th className="py-2 px-4 border-b text-left">Model</th>
                    <th className="py-2 px-4 border-b text-left">Harga</th>
                    <th className="py-2 px-4 border-b text-left">Kapasitas</th>
                    <th className="py-2 px-4 border-b text-left">Tenaga</th>
                    <th className="py-2 px-4 border-b text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {mobil.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{item.id}</td>
                      <td className="py-2 px-4 border-b">{item.merk}</td>
                      <td className="py-2 px-4 border-b">{item.model}</td>
                      <td className="py-2 px-4 border-b">Rp {item.harga.toLocaleString()}</td>
                      <td className="py-2 px-4 border-b">{item.kapasitas_baterai} kWh</td>
                      <td className="py-2 px-4 border-b">{item.tenaga_hp} HP</td>
                      <td className="py-2 px-4 border-b text-center">
                        <div className="flex justify-center space-x-2">
                          <Link
                            href={`/admin-dashboard/edit/${item.id}`}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
