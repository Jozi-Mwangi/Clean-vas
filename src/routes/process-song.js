const axios = require("axios");


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
    console.log(response.data.tracks);
    return response?.data.tracks;
  } catch (error) {
    console.error(error);
  }
}

function cleanResults(data) {
  console.log(`Cleaned Results data received: ${data}`);
  if (data && data.hits){
    const response = data.hits.map((hit) => ({
      title: hit.track.title,
      artist: hit.track.subtitle
    })) 

    response.forEach(item=>{
      console.log(`title: ${item.title}, artist: ${item.artist}`);
    })
    return response;
  } else {
    console.log("No Data received");
    return [];
  }

}

const processSong = async (req, res) => {
  // Get the song from the user.
  // Song could be -> name, ->Song URL
  try {
    const { songInput } = req.body;
    console.log(req.body);
    const tracks = await fetchSong(songInput);

    console.log(`Fetched tracks: ${tracks}`);
    const cleanedResults = cleanResults(tracks);
    console.log(`Cleaned Results sent: ${cleanedResults}`);


    res.status(200).render("results", {results:cleanedResults})

    // res.status(200).json({ message: "Song processing initiated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error" });
  }

  // Look for the song
};


// fetchSong("kiss kiss")
module.exports = processSong;
