import { Category } from "./category";
import { Country } from "./country";
import { Order } from "./order";
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
    store_status?: string;
    is_active?: number;
    is_featured?: number;
    categories: Category[];
    products?: Product[];
    country?:Country;
    tables?:Table[];
    orders?: Order[];
}