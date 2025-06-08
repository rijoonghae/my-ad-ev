import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Query the admin table
    const { data: admin, error } = await supabase
      .from('admin')
      .select('id_admin, username')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error || !admin) {
      console.error('Login error:', error);
      return NextResponse.json({ message: 'Username atau password salah' }, { status: 401 });
    }

    // Return admin ID as token
    return NextResponse.json({ token: admin.id_admin });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ message: 'Login gagal' }, { status: 500 });
  }
} 