# Web Scrapify

A simple web scraper that can scrape product details from various e-commerce platforms. 

## Features

- [x] Scrape product details from Amazon.
- [x] Scrape product details from Flipkart.

## Amazon Scraper
import { AmazonScraper } from "./AmazonScraper";

const scraper = new AmazonScraper();

// Define the product URL
const productUrl = "Solimo-Extra-Durable-Cleaning-Eraser/dp/B08M77515R/ref=sr_1_1_ffob_sspa?_encoding=UTF8&content-id=amzn1.sym.83009b1f-702c-4be7-814b-0240b8f687d2&dib=eyJ2IjoiMSJ9.WjeStSyS-UtpCOFcUJU0C0ckHCNJY1aZA9PWNVc3qmbRJZErSZQm63vX7XbtORshGpfXkgTFSZ1k-azY0kdxLjH8aFiQWBBaFVvAi2h7YsiHOkaHFG2ubcrLhzT48y-CysqYiDvBwnVmuFziFi5IPfl0FWW9N4Pgee3ihxQ1ZrY6YeVNmVH_RG4JEBfL_oRMMs7U2OBMmx1yugmR-jfBChLADGRUtVP6tksfjCSjtXK88En7M0lgIdav1SxM6d_DYk6545ltZwcBsUu13RamO5mcAAS3AjKPdaM69OJypEc.DhGRSGmv-vBrqxQkseb5ZO0RIAu2qS1tF7NEoZsMq3s&dib_tag=se&keywords=cleaning+tools&pd_rd_r=6e139182-a89d-4e25-997f-2955f4c11ad6&pd_rd_w=wFuiM&pd_rd_wg=zVfLd&pf_rd_p=83009b1f-702c-4be7-814b-0240b8f687d2&pf_rd_r=144BC1H67M2M2X0Y99VB&qid=1735278131&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1";

// Scrape the product details
scraper.scrape(productUrl).then((data) => {
    console.log(data);
});

## Flipkart Scraper

import { FlipkartScraper } from "./FlipkartScraper";

// Example usage of FlipkartScraper
const flipkartScraper = new FlipkartScraper();

flipkartScraper.scrape("emotorad-x1-red-27-5-inches-single-speed-lithium-ion-li-ion-electric-cycle/p/itm830863420d539?pid=ECYH28HFFWQTZWYW&lid=LSTECYH28HFFWQTZWYWXEFGWN&marketplace=FLIPKART&store=abc%2Fulv%2Ftwp&srno=b_1_1&otracker=browse&fm=organic&iid=en_ba7G51hZyaKh1mbny_aCQiMdq62YizF5evHJOdOFh1LQDMNdtP9N36fqiox692HbthuIoCjih2bGcP9BMLYb-PUFjCTyOHoHZs-Z5_PS_w0%3D&ppt=browse&ppn=browse&ssid=kqmfdqknk00000001735280804034").then((data) => {
    console.log(data);
});

//Future Features

- [ ] Add more agent rotations and retries
- [ ] Add more capabilities like search, filter, sort, etc.. and make it scrape with it.
- [ ] Add more scrapers.
- [ ] Add AI capable scraper.
- [ ] Add Web Search Capability (google, duckduckgo, bing etc..)
- [ ] Add more documentation
- [ ] Add more error handling
