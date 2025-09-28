import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
// For query names use exactly the same shown in Supabase UI
// If no data is shown, check your Row Level Security (RLS) policies
// Make sure to add your .env.local file with the variables below
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)