import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ActivityCard } from "@/components/ui/activitycard";
import { fetchSavedActivitiesByUser } from "@/lib/activity-connector";
import { createSupabaseServerClient } from "@/lib/supabase-server";


export default async function MyActivitiesPage() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id ?? undefined;
    const activities = await fetchSavedActivitiesByUser(userId!);
    // console.log("Fetched saved activities:", activities);
    // console.log("User ID:", userId);
    if (!activities || activities.length === 0) {
        return (
            <main className="mx-auto w-full px-8">
                <h1 className="text-3xl font-semibold tracking-tight">My Saved Activities</h1>
                <p className="mt-4 text-lg">You have no saved activities yet.</p>
            </main>
        );
    }
    return (
        <main className="mx-auto w-full px-8">
            <h1 className="text-3xl font-semibold tracking-tight">My Saved Activities</h1>
            <ScrollArea className="mt-4 w-full">
                <div className="flex flex-row flex-wrap gap-4">
                    {activities.filter(activity => activity.saved).map((activity) => (
                        <div key={activity.title} className="w-full ">
                            <ActivityCard activity={activity} key={activity.title} />
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="vertical" />
            </ScrollArea>
        </main>
    );
}