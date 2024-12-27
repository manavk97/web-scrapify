import axios from 'axios';
import * as cheerio from 'cheerio';
import { ProductScraper } from '../ProductScraper';
import { AMAZON_BASE_URL } from './Constants';
import { Product } from '../Product';
import { HeaderOptions } from '../Headers';
import { Agents } from '../../agents/Agents';
import { timer } from '../../utils/Utils';

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
                    title: $('#productTitle').text().trim() || null, // Product title
                    imageUrl: $('#percolate-ui-ilm_div img').attr('src') || $('#dp-container img').attr('src') || null, // Product image URL
                    rating: $('#acrPopover > span:first-child > a > span:first-child').text().trim().split(' ')[0] || null, // Product rating
                    ratingCount: $('#acrCustomerReviewText').text().trim().split('ratings')[0].trim() || null, // Rating count
                    price: $('.priceToPay').text().trim(), // Price
                    details:  $('table tr').map((i, el) => $(el)).get().reduce((acc, el) => {
                            const key = el.find('td:first-child').text().trim();
                            const value = el.find('td:nth-child(2)').text().trim();
                            if (key) {
                                acc[key] = value || null;
                            }
                            return acc;
                    }, {} as any) || null,
                    description: $('#productDescription').text().trim() || null, // Product description
                    features: $('#feature-bullets ul li').map((i, el) => $(el).text().trim()).get() || [], // Product features
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