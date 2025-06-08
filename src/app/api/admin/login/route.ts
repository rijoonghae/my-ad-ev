import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import * as jose from 'jose';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
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

    // Create a JWT token using jose
    const token = await new jose.SignJWT({ 
      id: admin.id_admin,
      username: admin.username,
      role: 'admin'
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(JWT_SECRET);

    // Return the JWT token
    return NextResponse.json({ token });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ message: 'Login gagal' }, { status: 500 });
  }
} 