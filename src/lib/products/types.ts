export interface Product {
    id: number;
    title: string;
    category: string;
    price: number;
    description: string;
    rating: number;
    availabilityStatus: string;
}

export interface ProductFilters {
    query?: string;
    category?: string;
}