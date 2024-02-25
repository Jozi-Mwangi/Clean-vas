const dotenv = require("dotenv");
const getLyrics = require("../services/fetch-lyrics");
const fetchSongs = require("../services/fetch-song");
const censorProfaneLyrics = require("../services/censor-lyrics");
const { constants } = require("../utils/paths");

const findSong = async (req, res) => {
  // Get the song from the user.
  const { songInput } = req.body;
  const tracks = await fetchSongs(songInput);
  res.status(200).json({ results: tracks });
};

const processSong = async (req, res) => {
  try {
    console.log("Processing the song");
    const { title } = req.body;
    console.log("Process route: ", constants.ACCESS_TOKEN);
    const { originalLyrics } = await getLyrics(
      req,
      res,
      title,
      constants.ACCESS_TOKEN
    );
    res.status(200).render("lyrics.ejs", {lyrics: originalLyrics})

    const censoredLyrics = await censorProfaneLyrics(originalLyrics);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }

  // Look for the song
};

module.exports = { processSong, findSong };
