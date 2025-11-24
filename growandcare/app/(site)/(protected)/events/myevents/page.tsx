import { EventCard } from "@/components/ui/eventcard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { fetchBookedEventsForUser, fetchSavedEventsForUser } from "@/lib/event-connector";
import { createSupabaseServerClient } from "@/lib/supabase-server";


export default async function MyEventsPage() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id ?? undefined;

    const savedEvents = await fetchSavedEventsForUser(userId!);
    // console.log("Fetched saved events:", savedEvents);

    const bookedEvents = await fetchBookedEventsForUser(userId!);
    // console.log("Fetched booked events:", bookedEvents);

    return (
        <main className="mx-auto w-full px-8">
            <h1 className="text-3xl font-semibold tracking-tight">My Saved Events</h1>
            { (!savedEvents || savedEvents.length === 0) ? (
                <p className="mt-4 text-lg">You have no saved events yet.</p>
            ) :
            <ScrollArea className="mt-4 w-full">
                <div className="flex flex-row flex-wrap gap-4">
                    {savedEvents.filter(event => event.saved).map((event) => (
                        <div key={event.title} className="w-full ">
                            <EventCard event={event} key={event.title} />
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="vertical" />
            </ScrollArea>
            }
            <h1 className="text-3xl font-semibold tracking-tight mt-12">My Booked Events</h1>
            { (!bookedEvents || bookedEvents.length === 0) ? (
                <p className="mt-4 text-lg">You have no booked events yet.</p>
            ) :
            <ScrollArea className="mt-4 w-full">
                <div className="flex flex-row flex-wrap gap-4">
                    {bookedEvents.filter(event => event.booked).map((event) => (
                        <div key={event.title} className="w-full ">
                            <EventCard event={event} key={event.title} />
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="vertical" />
            </ScrollArea>
        }
        </main>
    );
}