const axios = require("axios");


async function fetchSongs(song) {
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
    // console.log("trying");
    console.log(song);
    const response = await axios.request(options);
    // console.log("Backend: ", response.data.tracks.hits);

    const dataToRender = response?.data.tracks.hits.map((hit)=> ({
      title: hit.track.title,
      artist: hit.track.subtitle
    }))
    // return response?.data.tracks.hits;
    return dataToRender;
  } catch (error) {
    console.error(error);
  }
}

// fetchSongs("3500")

module.exports = fetchSongs;