import axios, { AxiosHeaders } from 'axios';
import * as cheerio from 'cheerio';
import { ProductScraper } from '../ProductScraper';
import { AMAZON_BASE_URL } from './Constants';
import { Product } from '../Product';

export class AmazonScraper extends ProductScraper {
    constructor(baseUrl: string = AMAZON_BASE_URL) {
        super(baseUrl);
    }

    async scrape(url: string, headers?: Record<string, string>): Promise<Product | null> {
        try {
            const { data } = await axios.get(`${this.baseUrl}/${url}`, { headers });
            const $ = cheerio.load(data);
            
            const productInfo: Product = {
                title: $('#productTitle').text().trim() || null, // Product title
                imageUrl: $('#percolate-ui-ilm_div img').attr('src') || $('#dp-container img').attr('src') || null, // Product image URL
                rating: $('#gridRegion-buybox [data-testid="rating"]').text().trim() || null, // Product rating
                ratingCount: $('#acrCustomerReviewText').text().trim() || null, // Rating count
                price: $('a-price-symbol').text().trim() + $('a-price-whole').text().trim() + $('a-price-decimal').text().trim() + $('a-price-fraction').text().trim(), // Price
                brand: $('#dp-container .grid-logo-image img').attr('alt') || null, // Brand name
                description: $('#productDescription').text().trim() || null, // Product description
                features: $('#feature-bullets ul li').map((i, el) => $(el).text().trim()).get() || null, // Product features
            };

            return productInfo;
        } catch (error) {
            console.error('Error scraping Amazon:', error);
            return null;
        }
    }
}