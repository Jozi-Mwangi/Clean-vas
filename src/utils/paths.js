const dotenv = require("dotenv").config();

// const result = dotenv.config()

if (dotenv.error) {
  throw dotenv.error
}

console.log(dotenv.parsed)

const constants = {};

constants.GENIUS_API_URL = "https://api.genius.com";
constants.AUTHORIZATIONURL = "https://api.genius.com/oauth/authorize";
constants.TOKENURL = "https://api.genius.com/oauth/token";
constants.CALLBACK_URL = "http://localhost:3000/auth/genius/callback";
constants.CLIENT_ID = process.env.CLIENT_ID;
constants.CLIENT_SECRET = process.env.CLIENT_SECRET;
constants.ACCESS_TOKEN = process.env.ACCESS_TOKEN;

module.exports = {constants};