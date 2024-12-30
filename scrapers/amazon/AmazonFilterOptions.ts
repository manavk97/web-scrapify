import { FilterOptions } from "../FilterOptions";

export interface AmazonFilterOptions extends FilterOptions {
    price?: {
        min?: number;
        max?: number;
    };
}