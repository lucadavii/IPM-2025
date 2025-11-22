
import { Tip, TipCategory } from '@/types/tips'
import { Goal, ActivityCategory, Activity, ActivityWithTagsAndSaved } from '@/types/activities'
import { createSupabaseServerClient } from './supabase-server'
// Create a single supabase client for interacting with your database
// For query names use exactly the same shown in Supabase UI
// If no data is shown, check your Row Level Security (RLS) policies
// Make sure to add your .env.local file with the variables below

// export const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )

type ActivityCategoryJoin = {
    c_id: ActivityCategory['id'];
    categories?: {
        id: ActivityCategory['id'];
        name: ActivityCategory['name'];
    }[] | null;
}

type ActivityGoalJoin = {
    g_id: Goal['id'];
    goals?: {
        id: Goal['id'];
        name: Goal['name'];
    }[] | null;
}
type ActivityRowWithJoins = Activity & {
    activity_categories?: ActivityCategoryJoin[] | null;
    activity_goals?: ActivityGoalJoin[] | null;
};

type SavedActivityRow = {
    a_id: Activity['id'];
};
export const fetchTipCategories = async (): Promise<TipCategory[]> => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from('tip_categories')
        .select('*')

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

export const fetchGoals = async (): Promise<Goal[]> => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from('goals')
        .select('*')
        .order('name', { ascending: true })

    if (error) {
        console.error('Error fetching goals:', error)
        return []
    }

    return data || []
}

export const fetchActivityCategories = async (): Promise<ActivityCategory[]> => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true })
    if (error) {
        console.error('Error fetching activity categories:', error)
        return []
    }

    return data || []
}

export const fetchActivitiesFilter = async (
    goalId: string|undefined,
    categoryId: string|undefined, 
    ageMin: number|undefined, 
    ageMax: number|undefined): Promise<Activity[]> => {
    const supabase = await createSupabaseServerClient();
    let query = supabase
    .from("activities")
    .select(
        "id, title, description, text, img_url, age_min, age_max, activity_goals!inner(g_id), activity_categories!inner(c_id)"
    ).order('title', { ascending: true });

    if (ageMin) {
        query = query.gte("age_min", ageMin)
        }
    if(ageMax){
        query = query.lte("age_max", ageMax)
    }
    if (categoryId){
        query = query.eq("activity_categories.c_id", categoryId)
    }
    if (goalId) {
        query = query.eq("activity_goals.g_id", goalId)
    }
    const { data, error } = await query;
    if (error) {
        console.error('Error fetching activities by category:', error)
        return []
    }

    return (data ?? []) as Activity[];
}


export const fetchActivitiesWithTagsAndSaved = async (
  goalId: string | undefined,
  categoryId: string | undefined,
  ageMin: number | undefined,
  ageMax: number | undefined,
  userId: string | undefined
): Promise<ActivityWithTagsAndSaved[]> => {
    const catJoin = categoryId ? 'activity_categories!inner' : 'activity_categories';
    const goalJoin = goalId ? 'activity_goals!inner' : 'activity_goals';
    const supabase = await createSupabaseServerClient();
    let query = supabase
    .from("activities")
    .select(
      `
        id,
        title,
        description,
        text,
        img_url,
        age_min,
        age_max,
        ${catJoin} (
            c_id,
            categories (
                id,
                name
            )
        ),
        ${goalJoin} (
            g_id,
            goals (
                id,
                name
            )
        )
      `,
    )
    .order("title", { ascending: true });

  // Optional filters
    if (goalId) {
    // filter via join table; you can also use "activity_goals.g_id"
        query = query.eq("activity_goals.g_id", goalId);
    }

    if (categoryId) {
        query = query.eq("activity_categories.c_id", categoryId);
    }

    if(typeof ageMin === "number") {
        query = query.gte("age_min", ageMin);
    }

    if(typeof ageMax === "number") {
        query = query.lte("age_max", ageMax);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching activities with tags and saved status:", error);
        return [];
    }
    let savedIds = new Set<Activity['id']>();

    if (userId) {
        const { data: savedData, error: savedError } = await supabase
            .from("saved_activities")
            .select("a_id")
            .eq("p_id", userId);

        if (savedError) {
            console.error("Error fetching saved activities:", savedError);
        } else if(savedData) {
            const typedSaved = savedData as SavedActivityRow[];
            savedIds = new Set(typedSaved.map((item) => item.a_id));
        }
    }

    const rows = (data ?? []) as ActivityRowWithJoins[];

    const activitiesWithTagsAndSaved: ActivityWithTagsAndSaved[] = rows.map(
        (activity) => {
        const categoryTags =
            activity.activity_categories
            ?.flatMap((ac) => ac.categories ?? [])
            .map((cat) => cat.name)
            .filter((name): name is string => Boolean(name)) ?? [];

        const goalTags =
            activity.activity_goals
            ?.flatMap((ag) => ag.goals ?? [])
            .map((goal) => goal.name)
            .filter((name): name is string => Boolean(name)) ?? [];

        return {
            id: activity.id,
            title: activity.title,
            description: activity.description,
            text: activity.text,
            img_url: activity.img_url,
            age_min: activity.age_min,
            age_max: activity.age_max,
            tags: [...categoryTags, ...goalTags],
            saved: userId ? savedIds.has(activity.id) : false,
        };
    },
  );

  return activitiesWithTagsAndSaved;
};

export const fetchSavedActivitiesByUser = async (userId: string): Promise<ActivityWithTagsAndSaved[]> => {
    if (!userId) {
        return [];
    }
    return await fetchActivitiesWithTagsAndSaved(undefined, undefined, undefined, undefined, userId);
}
