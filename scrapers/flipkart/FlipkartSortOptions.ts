import { SortOptions } from "../SortOptions";
import { FLIPKART_SORT_OPTIONS } from "./Constants";

export interface FlipkartSortOptions extends SortOptions {
    sort: FLIPKART_SORT_OPTIONS;
}