const { default: axios } = require("axios");
const express = require("express");
const ensureAuthenticated = require("../middleware");
const dataCleaner = require("../utils/dataCleaner");
const fs = require("fs");
const { constants } = require("../utils/paths");
const getLyrics = require("./crawler");

const app = express();
async function getSongAndLyrics(songTitle) {
  app.get(`/search/${songTitle}`, ensureAuthenticated, async (res, req) => {
    const { accessToken } = req.user;
    // const { songTitle } = req.params;

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

      const {lyricsPath} = cleanResults;
      const lyrics = getLyrics(lyricsPath)


      fs.writeFileSync("song-results.json", JSON.stringify(lyrics));
      //  const { paths } = cleanResults;
      res.send({ cleanResults });
    } catch (error) {
      console.error(error);
    }
  });
}

module.exports = getSongAndLyrics;
