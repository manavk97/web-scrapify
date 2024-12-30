import { SortOptions } from "../SortOptions";
import { AMAZON_SORT_OPTIONS } from "./Constants";

export interface AmazonSortOptions extends SortOptions {
    sort: AMAZON_SORT_OPTIONS;
}