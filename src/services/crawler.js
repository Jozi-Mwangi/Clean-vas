const { Builder, Browser, By, until } = require("selenium-webdriver");

async function getLyrics(lyricsPath) {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    console.log("Navigating");
    await driver.get(`https://genius.com/${lyricsPath}`);

    const lyricsContainerSelector = '//*[@id="lyrics-root"]';

    await driver.wait(until.elementLocated(lyricsContainerSelector));

    console.log("Getting Lyrics");
    const lyricsContainer = await driver.findElement(By.xpath(lyricsContainerSelector));
    const lyrics = lyricsContainer.getText();

    console.log("Lyrics: ", lyrics);

  } catch (error) {
    console.error(error);
  } finally {
    await driver.quit();
  }
}

getLyrics("Travis-scott-3500-lyrics");
