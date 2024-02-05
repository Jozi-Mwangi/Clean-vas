const getLyrics = require("../services/crawler");
const getSongAndLyrics = require("../services/fetch-lyrics");

const processSong = async (req, res) => {
  // Get the song from the user.
  // Song could be -> name, ->Song URL
  try {
    const { title, artist } = req.body;
    console.log(req.body);
    
    const tracks = await getSongAndLyrics(title);
    console.log(`Fetched tracks: ${tracks}`);

    res.status(200).json({results: tracks})    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error" });
  }

  // Look for the song
};

module.exports = processSong;
