const { Builder, Browser, By, until } = require("selenium-webdriver");

async function crawlLyrics(lyricsPath) {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  
  try {
    await driver.manage().setTimeouts({implicit: 30000});
    console.log("Navigating");
    await driver.get(`https://genius.com/${lyricsPath}`);

    console.log("Song Title");
    const songTitleEl = By.xpath("// */div[contains(@class, 'SongHeader')]/h1");
    await driver.wait(until.elementLocated(songTitleEl));
    
    
    console.log("Getting Lyrics");
    const lyricsContainerSelector = By.xpath('//*[@id="lyrics-root"]');
    const lyricsContainer = await driver.wait(until.elementLocated(lyricsContainerSelector));
    
    console.log("Found Them!")
    const lyrics = await lyricsContainer.getText();
    console.log("Lyrics: ", lyrics);
    return lyrics;
  } catch (error) {
    console.error(error);
  } finally {
    await driver.quit();
  }
}

// getLyrics("Travis-scott-3500-lyrics");
module.exports = crawlLyrics;