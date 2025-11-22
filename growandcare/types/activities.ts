import { UUID } from "crypto"

export type Goal = {
    id: UUID,
    name: string
}

export type ActivityCategory = {
    id: UUID,
    name: string
}

export type Activity = {
    id: UUID,
    title: string,
    description: string,
    text:string,
    img_url: string,
    age_min: number,
    age_max: number
}

export type ActivityWithTagsAndSaved = Activity & {
    tags: string[],
    saved: boolean
}