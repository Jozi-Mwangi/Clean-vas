const { default: axios } = require("axios");
const express = require("express");
const ensureAuthenticated = require("../middleware");
const dataCleaner = require("../utils/dataCleaner");
const fs = require("fs");
const { constants } = require("../utils/paths");
const crawlLyrics = require("./crawler");

const app = express();
async function getLyrics(songTitle, accessToken) {
  try {
    
    const response = await axios.get(`${constants.GENIUS_API_URL}/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: songTitle,
      },
    });

    const searchResults = response.data;
    const cleanResults = dataCleaner(searchResults);

    const { lyricsPath } = cleanResults;
    const lyrics = crawlLyrics(lyricsPath);

    const responseData = {
      songTitle: cleanResults.songTitle,
      cleanResults: cleanResults,
      originalLyrics: lyrics
    }

    return responseData;
    // fs.writeFileSync("song-results.json", JSON.stringify(responseData));
    //  const { paths } = cleanResults;
  
  } catch (error) {
    console.error(error);
  }
}

module.exports = getLyrics;
