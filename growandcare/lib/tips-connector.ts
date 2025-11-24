
import { Tip, TipCategory } from '@/types/tips'
import { createSupabaseServerClient } from './supabase-server'
// Create a single supabase client for interacting with your database
// For query names use exactly the same shown in Supabase UI
// If no data is shown, check your Row Level Security (RLS) policies
// Make sure to add your .env.local file with the variables below

// export const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )


export const fetchTipCategories = async (): Promise<TipCategory[]> => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from('tip_categories')
        .select('*')
        .order('name', { ascending: true })

    if (error) {
        console.error('Error fetching tip categories:', error)
        return []
    }

    return data || []
}

export const fetchTipsByCategory = async (categoryId: string): Promise<Tip[]> => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("tips")
        .select(
            "id, title, description, text, tip_tip_categories!inner(c_id)"
        ).eq("tip_tip_categories.c_id", categoryId)
        .order('title', { ascending: true })
    if (error) {
        console.error('Error fetching tips by category:', error)
        return []
    }

    return data || []
}   

export const fetchAllTips = async (): Promise<Tip[]> => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from('tips')
        .select('*')
        .order('title', { ascending: true })

    if (error) {
        console.error('Error fetching all tips:', error)
        return []
    }

    return data || []
}


