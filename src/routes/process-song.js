const dotenv = require("dotenv");
const getLyrics = require("../services/fetch-lyrics");
const fetchSongs = require("../services/fetch-song");
const censorProfaneLyrics = require("../services/censor-lyrics");
const { constants } = require("../utils/paths");
const songLyricsPathFetch = require("../services/song_lyrics_fetch");

const findSong = async (req, res, next) => {
  try {
    // Get the song from the user.
    const { songInput } = req.body;
    const cleanResults = await songLyricsPathFetch(
      constants.ACCESS_TOKEN,
      songInput
    );
    req.cleanResults = cleanResults;
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
    const { cleanResults } = req;
    // const cleanResults = await findSong(req, res)
    console.log("From process song: ", cleanResults);
    console.log("Processing the song");
    const { title } = req.body;
    console.log("Process route: ", title);
    const { originalLyrics } = await getLyrics(req, res, cleanResults);
    res.status(200).render("lyrics.ejs", { lyrics: originalLyrics });

    const censoredLyrics = await censorProfaneLyrics(originalLyrics);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }

  // Look for the song
};

module.exports = { processSong, findSong };
