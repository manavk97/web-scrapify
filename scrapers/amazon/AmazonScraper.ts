import axios, { AxiosHeaders } from 'axios';
import cheerio from 'cheerio';
import { ProductScraper } from '../ProductScraper';
import { AMAZON_BASE_URL } from './Constants';

export class AmazonScraper extends ProductScraper {
    constructor(baseUrl: string = AMAZON_BASE_URL) {
        super(baseUrl);
    }

    async scrape(url: string, headers?: Record<string, string>): Promise<{ title: string; price: string } | null> {
        try {
            const { data } = await axios.get(url, { headers });
            const $ = cheerio.load(data);
            
            const title = $('#productTitle').text().trim();
            const price = $('#priceblock_ourprice').text().trim();
            
            return { title, price };
        } catch (error) {
            console.error('Error scraping Amazon:', error);
            return null;
        }
    }
}