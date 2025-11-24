import { createSupabaseServerClient } from "./supabase-server";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Profile, Child } from "@/types/user";

type ChildWithCategoriesAndGoals = Child & {
    categories?: {
        id: string;
        name: string;
    }[] | null;
    goals?: {
        id: string;
        name: string;
    }[] | null;
};

type ChildWithCategoryJoin={
    categories: {id: string; name: string}[] | null;
}

type ChildWithGoalJoin={
    goals: {id: string; name: string}[] | null;
}

export const fetchUserProfile = async (): Promise<Profile | null> => {
    const supabase: SupabaseClient = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const { data, error } = await supabase
        .from('profile')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }

    return data as Profile;
}
export const fetchUserChildren = async (): Promise<Child[]> => {
    const supabase: SupabaseClient = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return [];
    }

    const { data, error } = await supabase
        .from('child')
        .select('*')
        .eq('parent_id', user.id)
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching user children:', error);
        return [];
    }

    return data as Child[];
}

export const fetchUserChildrenWithCategoriesAndGoals = async (): Promise<ChildWithCategoriesAndGoals[]> => {
    const supabase: SupabaseClient = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return [];
    }

    const { data, error } = await supabase
        .from('child')
        .select(`
            *,
            child_categories (
                ch_id,
                categories (
                    id,
                    name
                )
            ),
            child_goals (
                ch_id,
                goals (
                    id,
                    name
                )
            )
        `)
        .eq('parent_id', user.id)
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching user children with categories and goals:', error);
        return [];
    }
    const mappedData: ChildWithCategoriesAndGoals[] = (data ?? []).map((row) => ({
        id: row.id,
        parent_id: row.parent_id,
        name: row.name,
        birthday: row.birthday,
        categories: row.child_categories?.map((cc:ChildWithCategoryJoin) => cc.categories)?.filter(Boolean) ?? [],
        goals: row.child_goals?.map((cg:ChildWithGoalJoin) => cg.goals)?.filter(Boolean) ?? [],
    }));
    return mappedData;
}



