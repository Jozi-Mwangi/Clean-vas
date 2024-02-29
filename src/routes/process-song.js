// const censorProfaneLyrics = require("../services/censor-lyrics");
const { constants } = require("../utils/paths");
const songLyricsPathFetch = require("../services/song_lyrics_fetch");
const crawlLyrics = require("../services/crawler");

const { setCleanResults, getCleanResults } = require("../utils/sharedData");

const findSong = async (req, res, next) => {
  try {
    // Get the song from the user.
    const { songInput } = req.body;
    const cleanResults = await songLyricsPathFetch(
      constants.ACCESS_TOKEN,
      songInput
    );
    // req.cleanResults = cleanResults;

    setCleanResults(cleanResults);
    res.status(200).json({ results: cleanResults });

    console.log("From findSong: ", cleanResults);
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }

  // return cleanResults;
};

const processSong = async (req, res) => {
  try {
    const { title } = req.body;
    const cleanResults = getCleanResults();
    console.log("Processing the song: ", title);

    let lyrics = "";
    let selectedSong;
    if (!cleanResults) {
      console.log("No Results found");
      return res.status(500).json({ message: "No results found" });
    } else {
      selectedSong = cleanResults.find((song) => song.title == title);
      if (!selectedSong) {
        console.log("Selected Song not found");
        return res.status(500).json({ message: "Selected song not found" });
      }
    }

    const { lyricsPath } = selectedSong;
    console.log("Lyrics path from /process-song: ", lyricsPath);
    const { originalLyrics } = await crawlLyrics(lyricsPath);
    console.log(originalLyrics);
    res.status(200).render("lyrics.ejs", { lyrics: originalLyrics });

    // const censoredLyrics = await censorProfaneLyrics(originalLyrics);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }

  // Look for the song
};

module.exports = { processSong, findSong };
