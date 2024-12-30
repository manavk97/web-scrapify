import axios from 'axios';
import * as cheerio from 'cheerio';
import { ProductScraper } from '../ProductScraper';
import { FLIPKART_BASE_URL } from './Constants';
import { Product } from '../Product';
import { HeaderOptions } from '../Headers';
import { Agents } from '../../agents/Agents';
import { extractPid, timer } from '../../utils/Utils';
import { FlipkartSearchOptions } from './FlipkartSearchOptions';
import { FlipkartSortOptions } from './FlipkartSortOptions';
import { FlipkartFilterOptions } from './FlipkartFilterOptions';

/**
 * FlipkartScraper class for scraping Flipkart product listings and details.
 */
export class FlipkartScraper extends ProductScraper {
    constructor({
        baseUrl = FLIPKART_BASE_URL,
        enableAgentRotations = false,
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
        },
        enableLogging = false,
        timeout = 30000
    }: HeaderOptions = {}) {
        super({
            baseUrl,
            enableAgentRotations,
            enableLogging,
            headers,
            timeout
        });
    }

    /**
     * Searches for products on Flipkart.
     * 
     * @param query - The search query.
     * @returns The FlipkartScraper instance with the applied search.
     */
    search(query: FlipkartSearchOptions): FlipkartScraper {
        if(query.search) {
            this.searchURL = `${this.searchURL}&q=${encodeURIComponent(query.search)}`;
        }
        if(query.page) {
            this.searchURL = `${this.searchURL}&page=${query.page}`;
        }
        return this;
    }

    /**
     * Filters the search results based on the specified options.
     * 
     * @param query - The filter options.
     * @returns The FlipkartScraper instance with the applied filters.
     */
    filter(query: FlipkartFilterOptions): FlipkartScraper {
        if(query.price?.min) {
            this.searchURL = `${this.searchURL}&p[]=facets.price_range.from=${query.price.min}`;
        }
        if(query.price?.max) {
            this.searchURL = `${this.searchURL}&p[]=facets.price_range.to=${query.price.max}`;
        }
       return this;
    }

    /*
     * Sorts the search results based on the specified option.
     * 
     * Available sort options: 
     * - popularity for sorting by popularity
     * - relevance for sorting by relevance
     * - price_asc for sorting by price low to high
     * - price_desc for sorting by price high to low
     * - recency_desc for newest arrivals
    */
    sort(query: FlipkartSortOptions): FlipkartScraper {
        if(query.sort) {
            this.searchURL = `${this.searchURL}&sort=${query.sort}`;
        }
        return this;
    }

    /**
     * Builds the final URL for the Flipkart search.
     * 
     * @returns The final URL for the Flipkart search.
     */
    buildURL(): string {
        return `${this.baseUrl}/search?${this.searchURL}`;
    }

    /**
     * Scrapes the listings from the Flipkart search results.
     * 
     * @param url - The URL to scrape.
     * @returns The listings from the Flipkart search results.
     */
    async scrapListings(url: string = this.buildURL()): Promise<Partial<Product>[]> {
        if (!url.includes(this.baseUrl)) {
            url = `${this.baseUrl}/s?${url}`;
        }

        this.logger.info(`Scraping Flipkart listings.. ${url}`)

        const method = async (url: string) => {
            try {
                const { data } = await axios.get(url, { headers: { ...this.headers } });
                const $ = cheerio.load(data);
                const listings = $('.slAVV4');
                const list = listings.map((i, el) => {
                    return {
                        id: extractPid($(el).find('a').attr('href')) || null,
                        title: $(el).find('.wjcEIp').text().trim() || null,
                        price: $(el).find('.Nx9bqj').text().trim() || null,
                        imageUrl: $(el).find('img').attr('src') || null,
                        rating: $(el).find('.XQDdHH').text().trim() || null,
                        ratingCount: $(el).find('.Wphh3N').text().trim() || null,
                    };
                }).get();
                console.log(list);
                return list;
            } catch (error) {
                this.logger.error('Error scraping Flipkart listings:', error);
                return [];
            }
        }

        return timer(() => method(url), this.timeout);
    }

    /**
     * Scrapes the product details from the Flipkart product page.
     * 
     * @param url - The URL of the product page.
     * @returns The product details from the Flipkart product page.
     */
    async scrape(url: string): Promise<Product | null> {
        const method = async (url: string) => {
            try {
                this.logger.log('Scraping Flipkart...');

                if(this.enableAgentRotations) {
                    const agent = new Agents();
                    this.headers['User-Agent'] = agent.getAgent();
                }
                this.logger.log('Request Headers: ', this.headers);
                this.logger.log('Request URL: ', `${this.baseUrl}/${url}`);
    
                const { data } = await axios.get(`${this.baseUrl}/${url}`, {  headers: { ...this.headers } });

                const $ = cheerio.load(data);
                
                const productInfo: Product = {
                    id: extractPid($('.VJA3rP').attr('href')) || null,
                    title: $('h1._6EBuvT span').text().trim() || null,
                    price: $('div.Nx9bqj.CxhGGd').text().trim() || null,
                    imageUrl: $('img._0DkuPH').attr('src') || null,
                    rating: $('div.XQDdHH').first().text().trim() || null,
                    ratingCount: $('span.Wphh3N span > span').first().text().trim().split(' Ratings')[0] || null,
                    details: $('.xFVion > ul > li').map((i, el) => $(el).text().trim()).get().reduce((acc, el) => {
                        const [key, value] = el.split(':').map(s => s.trim());
                        acc[key] = value;
                        return acc;
                    }, {} as Record<string, string>) || null,
                    description: $('div._4gvKMe').text().trim() || null,
                    features: $('ul._7eSDEz li').map((i, el) => $(el).text().trim()).get() || null,
                    reviews: $('div.RcXBOT').map((i, el) => {
                        const rating = $(el).find('div.XQDdHH').text().trim().split(' ')[0] || null;
                        const description = $(el).find('div.ZmyHeo > div > div').text().trim() || null;
                        const title = $(el).find('p.z9E0IG').text().trim() || null;
                        const author = $(el).find('p._2NsDsF.AwS1CA').first().text().trim() || null;
                        const date = $(el).find('p._2NsDsF').last().text().trim() || null;
                        return { rating, description, title, author, date };
                    }).get() || [],
                };
                
                return productInfo;
            } catch (error) {
                this.logger.error('Error scraping Flipkart:', error);
                return null;
            }
        }

        return timer(() => method(url), this.timeout)
    }
}