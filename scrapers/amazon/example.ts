import { AmazonScraper } from "./AmazonScraper";

const scraper = new AmazonScraper();

scraper.scrape("Solimo-Extra-Durable-Cleaning-Eraser/dp/B08M77515R/ref=sr_1_1_ffob_sspa?_encoding=UTF8&content-id=amzn1.sym.83009b1f-702c-4be7-814b-0240b8f687d2&dib=eyJ2IjoiMSJ9.WjeStSyS-UtpCOFcUJU0C0ckHCNJY1aZA9PWNVc3qmbRJZErSZQm63vX7XbtORshGpfXkgTFSZ1k-azY0kdxLjH8aFiQWBBaFVvAi2h7YsiHOkaHFG2ubcrLhzT48y-CysqYiDvBwnVmuFziFi5IPfl0FWW9N4Pgee3ihxQ1ZrY6YeVNmVH_RG4JEBfL_oRMMs7U2OBMmx1yugmR-jfBChLADGRUtVP6tksfjCSjtXK88En7M0lgIdav1SxM6d_DYk6545ltZwcBsUu13RamO5mcAAS3AjKPdaM69OJypEc.DhGRSGmv-vBrqxQkseb5ZO0RIAu2qS1tF7NEoZsMq3s&dib_tag=se&keywords=cleaning+tools&pd_rd_r=6e139182-a89d-4e25-997f-2955f4c11ad6&pd_rd_w=wFuiM&pd_rd_wg=zVfLd&pf_rd_p=83009b1f-702c-4be7-814b-0240b8f687d2&pf_rd_r=144BC1H67M2M2X0Y99VB&qid=1735278131&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1").then((data) => {
    console.log(data);
});