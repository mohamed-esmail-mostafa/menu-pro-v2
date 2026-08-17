import { Category } from "./category";

export interface Store {
    id: number;
    name: string;
    slug: string;
    description: string;
    banner: string | null;
    image: string | null;
    address: string | null;
    phone: string | null;
    is_verified: number;
    categories:Category[]
}