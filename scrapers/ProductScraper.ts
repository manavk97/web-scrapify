import { RawAxiosRequestHeaders } from "axios";
import { ScraperHeaders } from "./Headers";
import { Product } from "./Product";

export abstract class ProductScraper {
    protected baseUrl: string;
    protected url: string;
    protected headers: RawAxiosRequestHeaders;
    protected enableAgentRotations: boolean;
    protected timeout: number;

    constructor({
        baseUrl, 
        enableAgentRotations,
        headers,
        timeout
    }: ScraperHeaders) {
        this.baseUrl = baseUrl;
        this.url = '';
        this.enableAgentRotations = enableAgentRotations;
        this.headers = headers;
        this.timeout = timeout;
    }

    abstract scrape(url: string): Promise<Product | null>;
}
