const dotenv =  require("dotenv");
const getLyrics = require("../services/fetch-lyrics");
const fetchSongs = require("../services/fetch-song");
const censorProfaneLyrics = require("../services/censor-lyrics");
const { constants } = require("../utils/paths")


const findSong = async (req, res) => {
  // Get the song from the user.
  const { songInput } = req.body;
  const tracks = await fetchSongs(songInput);
  res.status(200).json({ results: tracks });
};



if (dotenv.error) {
  throw dotenv.error
} else {
  
  console.log(process.env.ACCESS_TOKEN);
}

console.log(dotenv.parse)

const processSong = async (req, res) => {
  try {
    console.log("Processing the song");
   const {title } = req.body
    console.log("Process route: ", constants.ACCESS_TOKEN);
    const { originalLyrics } = await getLyrics(title, constants.ACCESS_TOKEN);

    const censoredLyrics = await censorProfaneLyrics(originalLyrics);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }

  // Look for the song
};

module.exports = { processSong, findSong };
