const { default: axios } = require("axios");
const { constants } = require("../utils/paths");
const dataCleaner = require("../utils/dataCleaner")


// const accessToken = constants.ACCESS_TOKEN;

const songLyricsPathFetch = async (accessToken, songTitle) => {
  try {
    const response = await axios.get(`${constants.GENIUS_API_URL}/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: songTitle,
      },
    });
    const searchResults = response.data.response;
    console.log("Search Results", searchResults);
    const cleanResults = dataCleaner(searchResults);
    return cleanResults;

  } catch (error) {
    console.error(error.message);
  }
};

module.exports = songLyricsPathFetch;
