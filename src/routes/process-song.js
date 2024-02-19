const getLyrics = require("../services/fetch-lyrics");
const fetchSongs = require("../services/fetch-song");
const censorProfaneLyrics = require("../services/censor-lyrics");

const findSong = async (req, res) => {
  // Get the song from the user.
  // console.log(req.body);
  const { songInput } = req.body;
  const tracks = await fetchSongs(songInput);
  // console.log("Finding songs: ", tracks);
  res.status(200).json({ results: tracks });
};

const processSong = async (req, res) => {
  try {
    console.log("Processing the song");
   // const user = await req.user
  //  console.log(req);
   const {title } = req.body
  //  Here, i need to access the selected son and artist from the frontend
    // const { accessToken } = req.user;

    const { originalLyrics } = await getLyrics(title, accessToken);

    const censoredLyrics = await censorProfaneLyrics(originalLyrics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error" });
  }

  // Look for the song
};

module.exports = { processSong, findSong };
