const getSongAndLyrics = require("../services/fetch-lyrics");

const processSong = async (req, res) => {
  // Get the song from the user.
  // Song could be -> name, ->Song URL
  try {
    const { title, artist } = req.body;
    console.log(req.body);
    
    const tracks = await getSongAndLyrics();
    console.log(`Fetched tracks: ${tracks}`);

    // Crawl to fetch the lyrics
    const lyrics = await fetchLyrics(title)
    
    res.status(200).json({results: tracks})
    

    // res.status(200).json({ message: "Song processing initiated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error" });
  }

  // Look for the song
};

module.exports = processSong;
