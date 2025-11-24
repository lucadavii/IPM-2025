import { UUID } from "crypto";

export type EventTag = {
    id: UUID,
    name: string
}

export type Event = {
    id: UUID,
    title: string,
    description: string | null,
    text: string | null,
    img_url: string | null,
    age_min: number | null,
    age_max: number | null,
    date : string,
    location : string | null
}

export type EventWithTagsSavedBooked = Event & {
    tags: string[],
    saved: boolean,
    booked: boolean,
    n_children: number,
    notes: string | null
}