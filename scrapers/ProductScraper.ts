import { RawAxiosRequestHeaders } from "axios";
import { ScraperHeaders } from "./Headers";
import { Product } from "./Product";
import { Logger } from "../utils/Logger";
import { URLBuilder } from "./URLBuilder";

export abstract class ProductScraper extends URLBuilder {
    protected baseUrl: string;
    protected url: string;
    protected headers: RawAxiosRequestHeaders;
    protected enableAgentRotations: boolean;
    protected timeout: number;
    protected logger: Logger;

    constructor({
        baseUrl, 
        enableLogging,
        enableAgentRotations,
        headers,
        timeout
    }: ScraperHeaders) {
        super(baseUrl);

        this.baseUrl = baseUrl;
        this.url = '';
        this.enableAgentRotations = enableAgentRotations;
        this.headers = headers;
        this.timeout = timeout;
        this.logger = new Logger(enableLogging);
    }

    abstract scrape(url: string): Promise<Product | null>;

    abstract scrapListings(url: string): Promise<Product[]>;
}
