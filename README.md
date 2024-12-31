# Web Scrapify

A simple web scraper that can scrape product details from various e-commerce platforms. 

## Features

- [x] Scrape product details from Amazon.
- [x] Scrape product details from Flipkart.
- [x] Supports more agent rotations.
- [x] Supports timeout for each request.
- [x] Supports logging for each request.
- [x] Supports search capabilities.
- [x] Supports filter capabilities.
- [x] Supports sort capabilities.

## Amazon Scraper

```
import { AmazonScraper, HeaderOptions, Product } from "web-scrapify";

const headers: HeaderOptions = {
    enableAgentRotations: true,
    enableLogging: true,
    timeout: 30000,
    baseUrl: 'https://www.amazon.com',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
        'Referer': 'https://www.amazon.in/',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
    }
}

const scraper = new AmazonScraper(headers);

const productURL = "Solimo-Extra-Durable-Cleaning-Eraser/dp/B08M77515R/ref=sr_1_1_ffob_sspa?_encoding=UTF8&content-id=amzn1.sym.83009b1f-702c-4be7-814b-0240b8f687d2&dib=eyJ2IjoiMSJ9.WjeStSyS-UtpCOFcUJU0C0ckHCNJY1aZA9PWNVc3qmbRJZErSZQm63vX7XbtORshGpfXkgTFSZ1k-azY0kdxLjH8aFiQWBBaFVvAi2h7YsiHOkaHFG2ubcrLhzT48y-CysqYiDvBwnVmuFziFi5IPfl0FWW9N4Pgee3ihxQ1ZrY6YeVNmVH_RG4JEBfL_oRMMs7U2OBMmx1yugmR-jfBChLADGRUtVP6tksfjCSjtXK88En7M0lgIdav1SxM6d_DYk6545ltZwcBsUu13RamO5mcAAS3AjKPdaM69OJypEc.DhGRSGmv-vBrqxQkseb5ZO0RIAu2qS1tF7NEoZsMq3s&dib_tag=se&keywords=cleaning+tools&pd_rd_r=6e139182-a89d-4e25-997f-2955f4c11ad6&pd_rd_w=wFuiM&pd_rd_wg=zVfLd&pf_rd_p=83009b1f-702c-4be7-814b-0240b8f687d2&pf_rd_r=144BC1H67M2M2X0Y99VB&qid=1735278131&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1"

// example 1
scraper.scrape(productURL).then((data : Product | null) => {
    console.log(data);
});

// example 2
scraper.search({
    search: 'cleaning tools',
    category: 'tools',
    page: 1
}).filter({
    price: {
        min: 100,
        max: 200
    }
}).sort({
    sort: AMAZON_SORT_OPTIONS.PRICE_LOW_TO_HIGH
})
.scrapListings().then((data: Partial<Product>[] ) => {
    console.log(data);
});
```

## Flipkart Scraper
```
import { FlipkartScraper, HeaderOptions, Product, FLIPKART_SORT_OPTIONS } from "web-scrapify";

const headers: HeaderOptions = {
    enableAgentRotations: true, // Enable agent rotations
    enableLogging: true, // Enable logging
    timeout: 30000, // Set timeout to 30 seconds
    baseUrl: 'https://www.flipkart.com', // Set base URL to Flipkart
    headers: { // Set headers
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
        'Referer': 'https://www.flipkart.com/',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
    }
}

const scraper = new FlipkartScraper(headers);

const productURL = "emotorad-x1-red-27-5-inches-single-speed-lithium-ion-li-ion-electric-cycle/p/itm830863420d539?pid=ECYH28HFFWQTZWYW&lid=LSTECYH28HFFWQTZWYWXEFGWN&marketplace=FLIPKART&store=abc%2Fulv%2Ftwp&srno=b_1_1&otracker=browse&fm=organic&iid=en_ba7G51hZyaKh1mbny_aCQiMdq62YizF5evHJOdOFh1LQDMNdtP9N36fqiox692HbthuIoCjih2bGcP9BMLYb-PUFjCTyOHoHZs-Z5_PS_w0%3D&ppt=browse&ppn=browse&ssid=kqmfdqknk00000001735280804034";

// example 1
scraper.scrape(productURL).then((data: Product | null) => {
    console.log(data);
});


// example 2
scraper.search({
    search: 'cleaning tools',
    page: 2
}).filter({
    price: {
        min: 100,
        max: 200
    }
}).sort({
    sort: FLIPKART_SORT_OPTIONS.PRICE_ASC
})
.scrapListings().then((data: Partial<Product>[] ) => {
    console.log(data);
});
```

## Header Options 

Here’s a table describing each parameter of the HeaderOptions interface, including its type, description, example, and whether it is required or not:
| Parameter | Type | Description | Example | Required |
|--------------------------|-------------------------------|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|----------|
| enableAgentRotations | boolean | Indicates if agent rotations should be enabled for requests. | true | No |
| enableLogging | boolean | Indicates if logging should be enabled for requests. | true | No |
| headers | RawAxiosRequestHeaders | Custom headers to be sent with the request. | { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' } | No |
| baseUrl | string | The base URL for the scraper. | 'https://www.amazon.com' for Amazon Scraper and 'https://www.flipkart.com' for Flipkart Scraper | No |
| timeout | number | The timeout duration for requests in milliseconds. | 30000 (30 seconds) | No |


This table provides a clear overview of the HeaderOptions interface parameters, making it easier to understand their purpose and usage.

## Product Interface

| Property      | Type                                      | Description                                      |
|---------------|-------------------------------------------|--------------------------------------------------|
| id            | `string \| null`                          | The id of the product.                           |
| title         | `string \| null`                          | The title of the product.                        |
| price         | `string \| null`                          | The price of the product.                        |
| imageUrl      | `string \| null`                          | The URL of the product image.                    |
| rating        | `string \| null`                          | The rating of the product.                       |
| ratingCount   | `string \| null`                          | The number of ratings the product has received.  |
| details       | `Record<string, string \| null> \| null` | Additional details about the product.            |
| description   | `string \| null`                          | A description of the product.                    |
| features      | `string[]`                                | An array of features of the product.             |
| reviews       | `Review[]`                                | An array of reviews for the product.             |

## Review Interface

| Property      | Type                                      | Description                                      |
|---------------|-------------------------------------------|--------------------------------------------------|
| rating        | `string \| null`                          | The rating given in the review.                  |
| title         | `string \| null`                          | The title of the review.                         |
| author        | `string \| null`                          | The author of the review.                        |
| description   | `string \| null`                          | The content of the review.                       |
| date          | `string \| null`                          | The date the review was written.                 |


## Future Features

- [ ] Add retries

- [ ] Add more scrapers.
- [ ] Add AI capable scraper.
- [ ] Add Web Search Capability (google, duckduckgo, bing etc..)
- [ ] Add more documentation
- [ ] Add more error handling


## Contributing & Feature Requests

- If you have any feature requests or suggestions, please feel free to open an issue or submit a PR.
- Contributions are welcome! Please feel free to submit a PR.
