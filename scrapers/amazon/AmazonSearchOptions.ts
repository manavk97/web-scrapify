import { SearchOptions } from "../SearchOptions";

export interface AmazonSearchOptions extends SearchOptions {
    category?: string;
    page?: number;
}