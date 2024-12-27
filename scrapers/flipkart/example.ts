import { FlipkartScraper } from "./FlipkartScraper";

const scraper = new FlipkartScraper({
    enableAgentRotations: true, // Enable agent rotations
    // enableLogging: true, // Enable logging
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

const productURL1 = "motovolt-kivo-easy-electric-bicycle-extended-back-carrier-26-inches-single-speed-lithium-ion-li-ion-cycle/p/itm4396dea73b7b5?pid=ECYH425VS4PRJR85&lid=LSTECYH425VS4PRJR85VO01TD&marketplace=FLIPKART&fm=productRecommendation%2Fsimilar&iid=en_H3snG4x849D9nLRXSY6SiJmq63mxsw50GmDULmVWhe3Y2evqTuYSEBBDqHzKgJI3oA25b8mwEjVkp2US4CGleg%3D%3D&ppt=pp&ppn=pp&ssid=kqmfdqknk00000001735280804034&otracker=pp_reco_Similar%2BProducts_2_35.productCard.PMU_HORIZONTAL_Motovolt%2BKIVO%2BEasy%2BElectric%2BBicycle%2Bwith%2BExtended%2BBack%2BCarrier%2B26%2Binches%2BSingle%2BSpeed%2BLithium-ion%2B%2528Li-ion%2529%2BElectric%2BCycle_308351791_productRecommendation%2Fsimilar_1&otracker1=pp_reco_PINNED_productRecommendation%2Fsimilar_Similar%2BProducts_GRID_productCard_cc_2_NA_view-all&cid=308351791"

scraper.scrape(productURL1).then((data) => {
    console.log(data);
});

const productURL2 = "cradiac-atlus-electric-blue-27-5-inches-7-gear-lithium-ion-li-ion-cycle/p/itm3a3238ecefc90?pid=ECYH4Y975JNYHZE3&lid=LSTECYH4Y975JNYHZE3LTHX0X&marketplace=FLIPKART&fm=productRecommendation%2Fsimilar&iid=R%3As%3Bp%3AECYH28HFFWQTZWYW%3Bl%3ALSTECYH28HFFWQTZWYWXEFGWN%3Bpt%3App%3Buid%3A9dcd2832-c45f-11ef-aa71-799bbd1b097e%3B.ECYH4Y975JNYHZE3&ppt=pp&ppn=pp&ssid=kqmfdqknk00000001735280804034&otracker=pp_reco_Similar%2BProducts_3_35.productCard.PMU_HORIZONTAL_CRADIAC%2BATLUS%2BELECTRIC%2BBLUE%2B27.5%2Binches%2B7%2BGear%2BLithium-ion%2B%2528Li-ion%2529%2BElectric%2BCycle_ECYH4Y975JNYHZE3_productRecommendation%2Fsimilar_2&otracker1=pp_reco_PINNED_productRecommendation%2Fsimilar_Similar%2BProducts_GRID_productCard_cc_3_NA_view-all&cid=ECYH4Y975JNYHZE3"

scraper.scrape(productURL2).then((data) => {
    console.log(data);
});
