# Web Scrapify

A simple web scraper that can scrape product details from various e-commerce platforms. 

## Features

- [x] Scrape product details from Amazon.
- [x] Scrape product details from Flipkart.

## Amazon Scraper

```
import { AmazonScraper } from "web-scrapify";

const scraper = new AmazonScraper();

const productUrl = // sample url;

scraper.scrape(productUrl).then((data) => {
    console.log(data);
});
```

## Flipkart Scraper
```
import { FlipkartScraper } from "web-scrapify";

const flipkartScraper = new FlipkartScraper();

const productUrl = // sample url

flipkartScraper.scrape(productUrl).then((data) => {
    console.log(data);
});
```
//Future Features

- [ ] Add more agent rotations and retries
- [ ] Add more capabilities like search, filter, sort, etc.. and make it scrape with it.
- [ ] Add more scrapers.
- [ ] Add AI capable scraper.
- [ ] Add Web Search Capability (google, duckduckgo, bing etc..)
- [ ] Add more documentation
- [ ] Add more error handling
