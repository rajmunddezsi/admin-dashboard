export type ProductSort = 'price-asc' | 'price-desc' | '';

export interface Product {
    id: number;
    title: string;
    category: string;
    price: number;
    description: string;
    rating: number | null;
    availabilityStatus: string | null;
}

export interface ProductFilters {
    query?: string;
    category?: string;
    page?: string;
    sort?: ProductSort;
}

export interface PaginatedProducts {
    products: Product[];
    total: number;
}