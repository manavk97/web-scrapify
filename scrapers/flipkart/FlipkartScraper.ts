import axios from 'axios';
import * as cheerio from 'cheerio';
import { ProductScraper } from '../ProductScraper';
import { FLIPKART_BASE_URL } from './Constants';
import { Product } from '../Product';
import { HeaderOptions } from '../Headers';
import { Agents } from '../../agents/Agents';
import { timer } from '../../utils/Utils';

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
            headers,
            timeout
        });
        
        if(!enableLogging) {
            console.log = () => {};
            console.error = () => {};
            console.info = () => {};
            console.warn = () => {};
            console.debug = () => {};
         }
    }

    async scrape(url: string): Promise<Product | null> {
        const method = async (url: string) => {
            try {
                console.log('Scraping Flipkart...');

                if(this.enableAgentRotations) {
                    const agent = new Agents();
                    this.headers['User-Agent'] = agent.getAgent();
                }
                console.log('Request Headers: ', this.headers);
                console.log('Request URL: ', `${this.baseUrl}/${url}`);
    
                const { data } = await axios.get(`${this.baseUrl}/${url}`, {  headers: { ...this.headers } });
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

        return timer(() => method(url), this.timeout)
    }
}