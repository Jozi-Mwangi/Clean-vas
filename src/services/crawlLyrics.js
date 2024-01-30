const fs = require("fs");
const puppeteer = require("puppeteer");

async function crawlLyrics(lyricsPath) {
  // const cleanResults = JSON.parse(fs.readFileSync("song-results.json"));
  // const {lyricsPath} = cleanResults;

  console.log("Starting");
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.goto(`https://genius.com/${lyricsPath}`);
  await page.setViewport({ width: 1080, height: 1024 });

//   console.log("Fetching xpath");
  const geniusXPath = '//*[@id="lyrics-root"]';
  const lyricsContainerSelector = '//*[@id="lyrics-root"]';

  try {
    console.log("Waiting for the Lyrics container to be present");
    await page.waitForXPath(lyricsContainerSelector);

    const elements = await page.$x(geniusXPath);
    // if ((await elements).length === 0) {
    //   console.error("Error finding the Lyrics");
    //   page.close();
    //   browser.close();
    // }
    console.log("Resolved");

    console.log("Now getting lyrics");
    const songLyrics = await page.evaluate((el) => {
      return el.textContent.trim();
    }, elements[0]);

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
