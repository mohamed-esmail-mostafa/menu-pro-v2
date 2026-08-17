import { Category } from "./category";

export interface Product {
    id: number;
    store_id: number;
    store_category_id: number;
    title: string;
    slug?: string;
    description?: string | null;
    image?: string | null;
    price: number;
    sale_price?: number | null;
    is_featured?: boolean;
    is_simple?: boolean;
    storeCategory?: any;
    category?: Category;
}