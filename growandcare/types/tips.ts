import { UUID } from "crypto"

type Tip = {
    id: UUID,
    title: string,
    description: string,
    text:string
}

type TipCategory = {
    id: UUID,
    name: string
}


export type { Tip, TipCategory };