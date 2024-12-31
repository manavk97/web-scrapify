
import { SearchOptions } from "./SearchOptions";
import { FilterOptions } from "./FilterOptions";
import { SortOptions } from "./SortOptions";

export abstract class URLBuilder {
    protected searchURL: string;

    constructor() {
        this.searchURL = '';
    }

    abstract search(query: SearchOptions): URLBuilder;
    abstract filter(query: FilterOptions): URLBuilder;
    abstract sort(query: SortOptions): URLBuilder;
    abstract buildURL(): string;
}
