import { EventCard } from "@/components/ui/eventcard";
import { fetchEventsFilter } from "@/lib/event-connector";
import { createSupabaseServerClient } from "@/lib/supabase-server";

type EventsPageProps = {
    searchParams: {
        goal?: string;
        category?: string;
        age_min?: string;
        age_max?: string;
        date_from?: string;
        date_to?: string;
    };
};
export default async function EventsPage({ searchParams }: EventsPageProps) {
    searchParams = await searchParams;
    const goalParam = searchParams.goal;
    const categoryParam = searchParams.category;
    const ageMinParam = searchParams.age_min;
    const ageMaxParam = searchParams.age_max;
    const dateFromParam = searchParams.date_from;
    const dateToParam = searchParams.date_to;

    const goalId = typeof goalParam === "string" && goalParam !== "all" ? goalParam : undefined;
    const categoryId = typeof categoryParam === "string" && categoryParam !== "all" ? categoryParam : undefined;
    const ageMin = typeof ageMinParam === "string" ? parseInt(ageMinParam, 10) : undefined;
    const ageMax = typeof ageMaxParam === "string" ? parseInt(ageMaxParam, 10) : undefined;
    const dateFrom = typeof dateFromParam === "string" ? dateFromParam : undefined;
    const dateTo = typeof dateToParam === "string" ? dateToParam : undefined;

    const supabase = await createSupabaseServerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const userId = user ? user.id : undefined;

    const events = await fetchEventsFilter(
        goalId,
        categoryId,
        ageMin,
        ageMax,
        dateFrom,
        dateTo,
        userId
    );
    return (
        <main className="mx-auto w-full px-8">
            <h1 className="text-3xl font-semibold tracking-tight">Events</h1>
            <div className="mt-2 w-full flex flex-col"> 
                {events.map((event) => (
                    <EventCard event={event} key={event.title} />
                    /*Modify event booking: should specify how many children etc etc*/
                ))}
            </div>
        </main>
    );
}