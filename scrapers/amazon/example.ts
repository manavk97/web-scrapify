import { AmazonScraper } from "./AmazonScraper";

const scraper = new AmazonScraper({
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
});

const productURL1 = "Solimo-Extra-Durable-Cleaning-Eraser/dp/B08M77515R/ref=sr_1_1_ffob_sspa?_encoding=UTF8&content-id=amzn1.sym.83009b1f-702c-4be7-814b-0240b8f687d2&dib=eyJ2IjoiMSJ9.WjeStSyS-UtpCOFcUJU0C0ckHCNJY1aZA9PWNVc3qmbRJZErSZQm63vX7XbtORshGpfXkgTFSZ1k-azY0kdxLjH8aFiQWBBaFVvAi2h7YsiHOkaHFG2ubcrLhzT48y-CysqYiDvBwnVmuFziFi5IPfl0FWW9N4Pgee3ihxQ1ZrY6YeVNmVH_RG4JEBfL_oRMMs7U2OBMmx1yugmR-jfBChLADGRUtVP6tksfjCSjtXK88En7M0lgIdav1SxM6d_DYk6545ltZwcBsUu13RamO5mcAAS3AjKPdaM69OJypEc.DhGRSGmv-vBrqxQkseb5ZO0RIAu2qS1tF7NEoZsMq3s&dib_tag=se&keywords=cleaning+tools&pd_rd_r=6e139182-a89d-4e25-997f-2955f4c11ad6&pd_rd_w=wFuiM&pd_rd_wg=zVfLd&pf_rd_p=83009b1f-702c-4be7-814b-0240b8f687d2&pf_rd_r=144BC1H67M2M2X0Y99VB&qid=1735278131&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1"

scraper.scrape(productURL1).then((data) => {
    console.log(data);
});

const productURL2 = "Amazon-Brand-Solimo-Heavy-Sponges/dp/B08RFCCBR1/ref=pd_bxgy_thbs_d_sccl_1/136-5125776-7388606?pd_rd_w=TOz4j&content-id=amzn1.sym.53b72ea0-a439-4b9d-9319-7c2ee5c88973&pf_rd_p=53b72ea0-a439-4b9d-9319-7c2ee5c88973&pf_rd_r=GQFH921Z1AC7BZX3V1P6&pd_rd_wg=K3wG5&pd_rd_r=e70877de-f42e-420f-8f95-8fb654c160c2&pd_rd_i=B08RFCCBR1&psc=1"

scraper.scrape(productURL2).then((data) => {
    console.log(data);
});

const productURL3 = "Amazon-Brand-Solimo-Disinfecting-Wipes/dp/B07F246YG1/ref=pd_bxgy_thbs_d_sccl_2/136-5125776-7388606?pd_rd_w=TOz4j&content-id=amzn1.sym.53b72ea0-a439-4b9d-9319-7c2ee5c88973&pf_rd_p=53b72ea0-a439-4b9d-9319-7c2ee5c88973&pf_rd_r=GQFH921Z1AC7BZX3V1P6&pd_rd_wg=K3wG5&pd_rd_r=e70877de-f42e-420f-8f95-8fb654c160c2&pd_rd_i=B07F246YG1&psc=1"

scraper.scrape(productURL3).then((data) => {
    console.log(data);
});