import { FlipkartScraper } from "./FlipkartScraper";

const scraper = new FlipkartScraper({
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
});

const productURL = "emotorad-x1-red-27-5-inches-single-speed-lithium-ion-li-ion-electric-cycle/p/itm830863420d539?pid=ECYH28HFFWQTZWYW&lid=LSTECYH28HFFWQTZWYWXEFGWN&marketplace=FLIPKART&store=abc%2Fulv%2Ftwp&srno=b_1_1&otracker=browse&fm=organic&iid=en_ba7G51hZyaKh1mbny_aCQiMdq62YizF5evHJOdOFh1LQDMNdtP9N36fqiox692HbthuIoCjih2bGcP9BMLYb-PUFjCTyOHoHZs-Z5_PS_w0%3D&ppt=browse&ppn=browse&ssid=kqmfdqknk00000001735280804034"

scraper.scrape(productURL).then((data) => {
    console.log(data);
});

