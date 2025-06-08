import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if a user has admin role
export const isAdmin = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.log('isAdmin: No authenticated user found.');
    return false;
  }

  console.log('isAdmin: Checking admin status for user ID:', user.id);

  try {
    const { data: profile, error, status } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single(); // .single() will error if 0 or >1 rows are returned

    if (error) {
      console.error(
        'isAdmin: Error fetching profile. Supabase error details:',
        JSON.stringify(error, null, 2),
        'HTTP Status:',
        status
      );
      // PGRST116 is the error code when .single() finds 0 rows.
      // HTTP status 406 (Not Acceptable) is also often returned in this scenario.
      if (error.code === 'PGRST116' || status === 406) {
        console.warn(
          `isAdmin: No profile found for user ID: ${user.id}. ` +
          `This could mean the user's profile row is missing in the 'profiles' table, ` +
          `or RLS is preventing access. Ensure a profile exists with this ID and role column.`
        );
      }
      return false;
    }

    if (!profile) {
      // This case should ideally be caught by the error handling for .single()
      console.warn(`isAdmin: Profile data was unexpectedly null for user ID: ${user.id}, even though no error was thrown.`);
      return false;
    }

    console.log(`isAdmin: Fetched profile for user ID: ${user.id}. Role: ${profile.role}`);
    return profile.role === 'admin';

  } catch (catchError: any) {
    // Catch any other unexpected exceptions
    console.error(
        'isAdmin: An unexpected exception occurred during profile fetch for user ID:', user.id,
        'Exception details:', JSON.stringify(catchError, null, 2)
    );
    return false;
  }
};