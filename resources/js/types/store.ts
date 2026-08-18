import { Category } from "./category";
import { Country } from "./country";
import { Product } from "./product";
import { Table } from "./table";

export interface Store {
    id: number;
    country_id:number;
    name: string;
    slug: string;
    description: string;
    banner: string | null;
    image: string | null;
    address: string | null;
    phone: string | null;
    email: string | null;
    is_verified: number;
    categories: Category[];
    products?: Product[];
    country?:Country;
    tables?:Table[]
}