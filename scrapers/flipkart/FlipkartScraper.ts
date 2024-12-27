import axios from 'axios';
import * as cheerio from 'cheerio';
import { ProductScraper } from '../ProductScraper';
import { FLIPKART_BASE_URL } from './Constants';
import { Product } from '../Product';
import { HeaderOptions } from '../Headers';
import { Agents } from '../../agents/Agents';
import { timer } from '../../utils/Utils';

export class FlipkartScraper extends ProductScraper {
    private logger: Console;
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
        
        this.logger = Object.assign({}, console);

        if(!enableLogging) {
            this.logger.log = () => {};
            this.logger.error = () => {};
            this.logger.info = () => {};
            this.logger.warn = () => {};
            this.logger.debug = () => {};
         }
    }

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