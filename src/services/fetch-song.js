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

module.exports = fetchSong;