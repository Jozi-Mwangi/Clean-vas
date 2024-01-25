const axios = require("axios");

const processSong = async (req, res) => {
  // Get the song from the user.
  // Song could be -> name, ->Song URL
    try {
        const { songInput } = req.params;
        const { apiResponse } = await  fetchSong(songInput);

        const cleanedResults = cleanResults(apiResponse)

        res.status(200).json({message:"Song processing initiated"})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal Server error"})
    }

  // Look for the song
};

async function fetchSong(song) {
  const options = {
    method: "GET",
    url: "https://shazam.p.rapidapi.com/search",
    params: {
      term: `${song}`,
    },
    headers: {
      "X-RapidAPI-Key": "d349022226mshe51878db5478fa0p1bd6adjsn922c3fc6f190",
      "X-RapidAPI-Host": "shazam.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response?.data
  } catch (error) {
    console.error(error)
  }

}

function cleanResults(data) {
    return data.tracks.hits.map((hit)=>{
        title: hit.track.title,
        artist: hit.track.subtitle
    })
}

// fetchSong("kiss kiss")
module.exports = processSong;