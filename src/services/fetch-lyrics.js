const { default: axios } = require("axios");
const express = require("express");
const ensureAuthenticated = require("../middleware");
const dataCleaner = require("../utils/dataCleaner");
const fs = require("fs");
const { constants } = require("../utils/paths");
const crawlLyrics = require("./crawler");

const app = express();
async function getLyrics(req, res, songTitle, accessToken) {
  try {
    console.log("My access token: ", accessToken);
    const response = await axios.get(`${constants.GENIUS_API_URL}/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: songTitle,
      },
    });

    const searchResults = response.data.response;
    console.log("Search Results", searchResults);
    const cleanResults = dataCleaner(searchResults);
    let lyrics = "";
    if (cleanResults == null) {
      console.log("No data!");
      res.status(500).send("<script>alert('No data')</script>");
    } else {
      
      const { lyricsPath } = cleanResults;
      console.log("Lyrics path: ", lyricsPath);
      lyrics = await crawlLyrics(lyricsPath);
    }

    const responseData = {
      songTitle: cleanResults.songTitle,
      cleanResults: cleanResults,
      originalLyrics: lyrics,
    };

    return responseData;
    // fs.writeFileSync("song-results.json", JSON.stringify(responseData));
    //  const { paths } = cleanResults;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = getLyrics;
