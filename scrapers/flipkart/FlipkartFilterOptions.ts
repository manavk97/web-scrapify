import { FilterOptions } from "../FilterOptions";

export interface FlipkartFilterOptions extends FilterOptions {
    price?: {
        min?: number;
        max?: number;
    };
}