export abstract class ProductScraper {
    protected baseUrl: string;
    protected url: string;
    protected headers: Record<string, string>;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.url = '';
        this.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
        };
    }

    abstract scrape(url: string, headers?: Record<string, string>): Promise<any>;
}
