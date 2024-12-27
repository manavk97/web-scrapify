import axios from 'axios';
import * as cheerio from 'cheerio';
import { ProductScraper } from '../ProductScraper';
import { FLIPKART_BASE_URL } from './Constants';
import { Product } from '../Product';

export class FlipkartScraper extends ProductScraper {
    constructor(baseUrl: string = FLIPKART_BASE_URL) {
        super(baseUrl);
    }

    async scrape(url: string, headers?: Record<string, string>): Promise<Product | null> {
        try {
            const { data } = await axios.get(`${this.baseUrl}/${url}`, { maxRedirects: 10, headers });
            const $ = cheerio.load(data);
            
            const productInfo: Product = {
                title: $('span.B_NuCI').text().trim() || null,
                price: $('div._30jeq3').text().trim() || null,
                imageUrl: $('img._396cs4').attr('src') || null,
                rating: $('div._3LWZlK').text().trim() || null,
                ratingCount: $('span._2_R_DZ').text().trim() || null,
                brand: $('span._2BhA3M').text().trim() || null,
                description: $('div._1mXcCf').text().trim() || null,
                features: $('ul._1xgFaf li').map((i, el) => $(el).text().trim()).get() || null,
            };
            
            return productInfo;
        } catch (error) {
            console.error('Error scraping Flipkart:', error);
            return null;
        }
    }
}