import { FlipkartScraper } from "./FlipkartScraper";

const scraper = new FlipkartScraper();

scraper.scrape("emotorad-x1-red-27-5-inches-single-speed-lithium-ion-li-ion-electric-cycle/p/itm830863420d539?pid=ECYH28HFFWQTZWYW&lid=LSTECYH28HFFWQTZWYWXEFGWN&marketplace=FLIPKART&store=abc%2Fulv%2Ftwp&srno=b_1_1&otracker=browse&fm=organic&iid=en_ba7G51hZyaKh1mbny_aCQiMdq62YizF5evHJOdOFh1LQDMNdtP9N36fqiox692HbthuIoCjih2bGcP9BMLYb-PUFjCTyOHoHZs-Z5_PS_w0%3D&ppt=browse&ppn=browse&ssid=kqmfdqknk00000001735280804034").then((data) => {
    console.log(data);
});