import { ActivityCard } from "@/components/ui/activitycard";
import { fetchActivitiesWithTagsAndSaved } from "@/lib/activity-connector";
import { createSupabaseServerClient } from "@/lib/supabase-server";


type ActivitiesPageProps = {
    searchParams: {
        goal?: string;
        category?: string;
        age_min?: string;
        age_max?: string;
    };
};

export default async function ActivitiesPage({searchParams}: ActivitiesPageProps) {
    searchParams = await searchParams;
    const goalParam = searchParams.goal 
    const categoryParam = searchParams.category 
    const ageMinParam = searchParams.age_min
    const ageMaxParam = searchParams.age_max

    const goalId = typeof goalParam === "string" && goalParam !== "all" ? goalParam : undefined;
    const categoryId = typeof categoryParam === "string" && categoryParam !== "all" ? categoryParam : undefined;
    const ageMin = typeof ageMinParam === "string" ? parseInt(ageMinParam, 10) : undefined;
    const ageMax = typeof ageMaxParam === "string" ? parseInt(ageMaxParam, 10) : undefined;


    const supabase = await createSupabaseServerClient();

    const{data:{user},} = await supabase.auth.getUser();
    const userId = user?.id ?? undefined;


    const activities =  await fetchActivitiesWithTagsAndSaved(goalId, categoryId, ageMin, ageMax, userId);
    // Map activities to include saved status
    // const activitiesWithSavedStatus = activities.map((activity) => ({
    //     ...activity,
    //     saved: savedActivitiesIds.includes(activity.id),
    // }));
    return (
        <main className="mx-auto w-full px-8">
            <h1 className="text-3xl font-semibold tracking-tight">Activities</h1>
            <div className="mt-2 w-full flex flex-col"> 
                {activities.map((activity) => (
                    <ActivityCard activity={activity} key={activity.id} />
                ))}
            </div>
        </main>
    );
}