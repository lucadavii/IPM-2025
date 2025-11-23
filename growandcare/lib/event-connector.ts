import { createSupabaseServerClient } from "./supabase-server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Event, EventWithTagsSavedBooked, EventTag } from "@/types/events";
import { Goal } from "@/types/activities";

type EventTagJoin = {
    t_id: Event['id'];
    tags?: {
        id: Event['id'];
        name: string;
    }[] | null;
}

type EventGoalJoin = {
    g_id: Event['id'];
    goals?: {
        id: Event['id'];
        name: string;
    }[] | null;
}

type EventRowWithJoins = Event & {
    event_tags?: EventTagJoin[] | null;
    event_goals?: EventGoalJoin[] | null;
};

type SavedEventRow = {
    e_id: Event['id'];
};

type BookedEventRow = {
    e_id: Event['id'];
    n_children: number;
    notes: string | null;
};

export const fetchEventTags = async (): Promise<EventTag[]> => {
    const supabase: SupabaseClient = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name', { ascending: true });
    if (error) {
        console.error('Error fetching event tags:', error);
        return [];
    }
    return data || [];
}

export const fetchEventsFilter = async (
    goalId: string|undefined,
    tagId: string|undefined,
    ageMin: number|undefined,
    ageMax: number|undefined,
    dateFrom: string|undefined,
    dateTo: string|undefined,
    userId : string|undefined
): Promise<EventWithTagsSavedBooked[]> => {
    const supabase: SupabaseClient = await createSupabaseServerClient();
    const goalJoin = goalId ? "event_goals!inner": "event_goals";
    const tagJoin = tagId ? "event_tags!inner": "event_tags";

    let query = supabase
    .from('events')
    .select(
        `
            id,
            title,
            description,
            text,
            img_url,
            age_min,
            age_max,
            date,
            location,
            ${goalJoin} (
                g_id,
                goals ( id, name )
            ),
            ${tagJoin} (
                t_id,
                tags ( id, name )
            )
        `
    )
    .order('date', { ascending: true });

    if (goalId) {
        query = query.eq('event_goals.g_id', goalId);
    }
    if (tagId) {
        query = query.eq('event_tags.t_id', tagId);
    }
    if (typeof ageMin === 'number') {
        query = query.gte('age_min', ageMin);
    }
    if (typeof ageMax === 'number') {
        query = query.lte('age_max', ageMax);
    }
    if (dateFrom) {
        query = query.gte('date', dateFrom);
    }
    if (dateTo) {
        query = query.lte('date', dateTo);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching events with filters:', error);
        return [];
    }

    let savedIds = new Set<Event['id']>();
    let bookedIds = new Map<Event['id'], {n_children: number, notes: string | null}>();

    if (userId) {
        const { data: savedData, error: savedError } = await supabase
            .from('saved_events')
            .select('e_id')
            .eq('p_id', userId);

        if (savedError) {
            console.error('Error fetching saved events for user:', savedError);
        } else if (savedData) {
            savedIds = new Set(savedData.map(item => item.e_id));
        }

        const { data: bookedData, error: bookedError } = await supabase
            .from('bookings')
            .select('e_id, n_children, notes')
            .eq('p_id', userId);

        if (bookedError) {
            console.error('Error fetching booked events for user:', bookedError);
        } else if (bookedData) {
            const typedBooked = bookedData as BookedEventRow[];
            bookedIds = new Map(typedBooked.map(item => [item.e_id, {n_children:item.n_children ?? 0, notes: item.notes ?? null}]));
        }
    }
    const rows = (data ?? []) as EventRowWithJoins[];

    const events: EventWithTagsSavedBooked[] = rows.map((row) => {
        const tags = row.event_tags
            ?.flatMap((et) => et.tags?? [])
            .map((t) => t.name)
            .filter((name): name is string => Boolean(name)) ?? [];  
        const goals = row.event_goals
        ?.flatMap((eg) => eg.goals?? [])
        .map((g) => g.name)
        .filter((name): name is string => Boolean(name)) ?? [];
        const allTags = Array.from(new Set([...tags, ...goals]));
        
        const bookingInfo = userId? bookedIds.get(row.id) : undefined;
        const nChildren = bookingInfo?.n_children ?? 0;
        const notes = bookingInfo?.notes ?? null;

        const booked = userId ? bookedIds.has(row.id) : false;
        const saved = userId ? savedIds.has(row.id) : false;

        const result: EventWithTagsSavedBooked = {
            id: row.id,
            title: row.title,
            description: row.description,
            text: row.text,
            img_url: row.img_url,
            age_min: row.age_min,
            age_max: row.age_max,
            date: new Date(row.date).toISOString().replace('T', ' ').slice(0, 16),
            location: row.location,
            tags: allTags,
            saved: saved,
            booked: booked,
            n_children: nChildren,
            notes: notes
        };
        return result;
    });

    return events;
};

export const fetchBookedEventsForUser = async (userId: string): Promise<EventWithTagsSavedBooked[]> => {
    if (!userId) {
        return [];
    }
    const events = await fetchEventsFilter(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        userId
    );
    return events.filter(event => event.booked);
};

export const fetchSavedEventsForUser = async (userId: string): Promise<EventWithTagsSavedBooked[]> => {
    if (!userId) {
        return [];
    }
    const events = await fetchEventsFilter(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        userId
    );
    return events.filter(event => event.saved);
};