const fs = require("fs");
const puppeteer = require("puppeteer");

async function crawlLyrics(lyricsPath) {
  // const cleanResults = JSON.parse(fs.readFileSync("song-results.json"));
  // const {lyricsPath} = cleanResults;

  console.log("Starting");
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 20000,
    slowMo: 300,
    devtools: true,
  });

  const page = await browser.newPage();
  
  try {
    console.log("Navigating to the page");
    await page.goto(`https://genius.com/${lyricsPath}`, { waitUntil: "networkidle0", timeout: 50000 }, );
    await page.setViewport({ width: 1080, height: 1024 });
  
    const lyricsContainerSelector = '//*[@id="lyrics-root"]';
    console.log("Waiting for the Lyrics container to be present");
    await page.waitForXPath(lyricsContainerSelector);

    console.log("Now getting lyrics");
    const songLyrics = await page.evaluate((el) => {
      return el.textContent.trim();
    }, (await page.$x(lyricsContainerSelector))[0]);

    console.log("Found them");
    console.log(songLyrics);
   
    return songLyrics;
  } catch (error) {
    console.error("Error: ", error.message);
     } finally {
    await page.close();
    await browser.close();
  }

  // const lyricElement = page.waitForXPath('//*[@id="lyrics-root"]')
}

crawlLyrics("Travis-scott-3500-lyrics");
// module.exports = crawlLyrics;
