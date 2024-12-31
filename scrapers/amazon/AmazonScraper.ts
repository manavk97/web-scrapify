import axios from 'axios';
import * as cheerio from 'cheerio';
import { ProductScraper } from '../ProductScraper';
import { AMAZON_BASE_URL, AMAZON_SORT_OPTIONS } from './Constants';
import { Product } from '../Product';
import { HeaderOptions } from '../Headers';
import { Agents } from '../../agents/Agents';
import { timer } from '../../utils/Utils';
import { AmazonSearchOptions } from './AmazonSearchOptions';
import { AmazonSortOptions } from './AmazonSortOptions';
import { AmazonFilterOptions } from './AmazonFilterOptions';

/**
 * AmazonScraper class for scraping Amazon product listings and details.
 */
export class AmazonScraper extends ProductScraper {
    constructor({
        baseUrl = AMAZON_BASE_URL,
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
     * Searches for products on Amazon.
     * 
     * @param query - The search query object containing keyword, category, and page.
     * @returns The AmazonScraper instance with the updated URL.
     */
    search(query: AmazonSearchOptions): AmazonScraper {
        if (query.search) {
            this.searchURL = `${this.searchURL}&k=${encodeURIComponent(query.search)}`;
        }
        if (query.category) {
            this.searchURL = `${this.searchURL}&i=${encodeURIComponent(query.category)}`;
        }
        if (query.page) {
            this.searchURL = `${this.searchURL}&page=${query.page}`;
        }

        return this;
    }

    /**
     * Filters the search results based on the specified price range.
     * 
     * @param query - The filter query object containing price range.
     * @returns The AmazonScraper instance with the updated URL.
     */
    filter(query: AmazonFilterOptions): AmazonScraper {
        if (query.price?.min) {
            this.searchURL = `${this.searchURL}&low-price=${query.price.min}`;
        }
        if (query.price?.max) {
            this.searchURL = `${this.searchURL}&high-price=${query.price.max}`;
        }
        return this;
    }

    /**
     * Sorts the search results based on the specified option.
     * 
     * Available sort options:
     * - relevanceblender for sorting by featured
     * - price-asc-rank for sorting by price low to high
     * - price-desc-rank for sorting by price high to low
     * - review-count for sorting by avg customer review
     * - date-desc-rank for sorting by newest arrivals
     * - exact-aware-popularity-rank for sorting by popularity rank (best sellers)
     */
    sort(query: AmazonSortOptions): AmazonScraper {
        if (query.sort) {
            this.searchURL = `${this.searchURL}&s=${query.sort}`;
        }
        return this;
    }

    /**
     * Builds the final URL for the Amazon search.
     * 
     * @returns The final URL.
     */
    buildURL(): string {
        return `${this.baseUrl}/s?${this.searchURL}`;
    }

    /**
     * Scrapes the listings from the Amazon search results page.
     * 
     * @param url - The URL to scrape.
     * @returns The list of products.
     */
    async scrapListings(url: string = this.buildURL()): Promise<Partial<Product>[]> {
        if (!url.includes(this.baseUrl)) {
            url = `${this.baseUrl}/s?${url}`;
        }

        this.logger.info(`Scraping Amazon listings.. ${url}`)

        const method = async (url: string) => {
            try {
                const { data } = await axios.get(url, { headers: { ...this.headers } });
                const $ = cheerio.load(data);
                const listings = $('.s-result-item').map((i, el) => {
                    return {
                        id: $(el).attr('data-asin'),
                        title: $(el).find('.a-text-normal').text().trim(),
                        price: $(el).find('.a-price-whole').text().trim(),
                        imageUrl: $(el).find('.a-link-normal').find('img').attr('src'),
                        rating: $(el).find('.a-icon-alt').text().trim(),
                        ratingCount: $(el).find('.a-size-small').text().trim(),
                    };
                }).get();
                console.log(listings);
                return listings;
            } catch (error) {
                this.logger.error('Error scraping Amazon listings:', error);
                return [];
            }
        }

        return timer(() => method(url), this.timeout);
    }


    /**
     * Scrapes the product details from the Amazon product page.
     * 
     * @param url - The URL to scrape.
     * @returns The product details.
     */
    async scrape(url: string): Promise<Product | null> {
        const method = async (url: string) => {
            try {
                this.logger.log('Scraping Amazon...');
                if (this.enableAgentRotations) {
                    const agent = new Agents();
                    this.headers['User-Agent'] = agent.getAgent();
                }

                this.logger.log('Request Headers: ', this.headers);
                this.logger.log('Request URL: ', `${this.baseUrl}/${url}`);

                const { data } = await axios.get(`${this.baseUrl}/${url}`, { headers: { ...this.headers } });
                const $ = cheerio.load(data);

                const productInfo: Product = {
                    id: $('input[name="ASIN"]').attr('value') || null, // Product title
                    title: $('#productTitle').text().trim() || null, // Product title
                    imageUrl: $('#percolate-ui-ilm_div img').attr('src') || $('#dp-container img').attr('src') || null, // Product image URL
                    rating: $('#acrPopover > span:first-child > a > span:first-child').text().trim().split(' ')[0] || null, // Product rating
                    ratingCount: $('#acrCustomerReviewText').text().trim().split('ratings')[0].trim() || null, // Rating count
                    price: $('.priceToPay').text().trim(), // Price
                    details: $('table tr').map((i, el) => $(el)).get().reduce((acc, el) => {
                        const key = el.find('td:first-child').text().trim();
                        const value = el.find('td:nth-child(2)').text().trim();
                        if (key) {
                            acc[key] = value || null;
                        }
                        return acc;
                    }, {} as Record<string, string | null>) || null,
                    description: $('#productDescription').text().trim() || null, // Product description
                    features: $('#feature-bullets ul li').map((i, el) => $(el).text().trim()).get() || [], // Product features
                    reviews: $('#cm-cr-dp-review-list li[data-hook="review"]').map((i, el) => {
                        const title = $(el).find('[data-hook="review-title"] > span').text().trim() || null; // Review title
                        const date = $(el).find('[data-hook="review-date"]').text().trim() || null; // Review date
                        const description = $(el).find('[data-hook="review-body"]').text().trim() || null; // Review body
                        const author = $(el).find('span.a-profile-name').text().trim() || null; // Review author
                        const rating = $(el).find('[data-hook="review-star-rating"] span.a-icon-alt').text().trim() || null; // Review rating
                        return { title, date, description, author, rating };
                    }).get() || [],
                };

                return productInfo;
            } catch (error) {
                this.logger.error('Error scraping Amazon:', error);
                return null;
            }
        }

        return timer(() => method(url), this.timeout)
    }
}