import axios from 'axios';
import cheerio from 'cheerio';
import { ProductScraper } from '../ProductScraper';
import { FLIPKART_BASE_URL } from './Constants';

export class FlipkartScraper extends ProductScraper {
    constructor(baseUrl: string = FLIPKART_BASE_URL) {
        super(baseUrl);
    }

    async scrape(url: string, headers?: Record<string, string>): Promise<{ title: string; price: string } | null> {
        try {
            const { data } = await axios.get(url, { headers });
            const $ = cheerio.load(data);
            
            const title = $('span.B_NuCI').text().trim();
            const price = $('div._30jeq3').text().trim();
            
            return { title, price };
        } catch (error) {
            console.error('Error scraping Flipkart:', error);
            return null;
        }
    }
}