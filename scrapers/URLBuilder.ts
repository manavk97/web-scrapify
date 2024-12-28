export abstract class URLBuilder {
    protected baseUrl: string;
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    abstract search(query: Record<string, string>): URLBuilder;
    abstract filter(query: Record<string, string>): URLBuilder;
    abstract sort(query: Record<string, string>): URLBuilder;
    abstract buildURL(): string;
}
