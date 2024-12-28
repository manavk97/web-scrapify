export interface Product {
    title: string | null;
    price: string | null;
    imageUrl: string | null;
    rating: string | null;
    ratingCount: string | null;
    details: Record<string, string | null> | null;
    description: string | null;
    features: string[];
    reviews: any[];
}
