export interface Product {
    id : string | null,
    title: string | null;
    price: string | null;
    imageUrl: string | null;
    rating: string | null;
    ratingCount: string | null;
    details: Record<string, string | null> | null;
    description: string | null;
    features: string[];
    reviews: Review[];
}

export interface Review {
    rating: string | null;
    title: string | null;
    author: string | null;
    description: string | null;
    date: string | null;
}