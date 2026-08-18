export interface Category {
    id: number;
    name: string;
    image: string | null;
    slug: string;
    description: string;
    position?: number;
    meals_count?: number;
    pivot?: any;
}