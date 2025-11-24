import { UUID } from "crypto";

export type Profile = {
    id: UUID,
    name: string,
    surname: string | null,
    img_url: string | null,
}

export type Child = {
    id: UUID,
    parent_id: UUID,
    name: string,
    birthday: string,
}
