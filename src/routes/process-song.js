const getLyrics = require("../services/fetch-lyrics");
const fetchSongs = require("../services/fetch-song");
const censorProfaneLyrics = require("../services/censor-lyrics")

const processSong = async (req, res) => {
  // Get the song from the user.
  // Song could be -> name, ->Song URL

  try {
    const { title, artist } = req.body;
    console.log(req.body);
    const { accessToken } = req.user;

    const tracks = await fetchSongs(title)
    res.status(200).json({results: tracks})    
    
    const { originalLyrics } = await getLyrics(title, accessToken);
  
    const censoredLyrics = await censorProfaneLyrics(originalLyrics);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error" });
  }

  // Look for the song
};

module.exports = processSong;
