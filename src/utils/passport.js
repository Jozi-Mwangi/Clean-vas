const passport = require("passport");
const oAuth2Strategy = require("passport-oauth2");
const { constants } = require("./paths");

const geniusStrategy = new oAuth2Strategy(
  {
    authorizationURL: constants.AUTHORIZATIONURL,
    tokenURL: constants.TOKENURL,
    // clientID: constants.CLIENT_ID,
    clientID: "RXKXaLo3gLz0nYXvqYYpcn451iwWDry0Ky_je3_S5bi0FBtqxlGT_xec7Jp3_L4B",
    clientSecret: constants.CLIENT_SECRET,
    callbackURL: constants.CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    const user = Object.assign(accessToken)
    
    return done(null, profile, user)
    // return done(null, Object.assign(profile, {accessToken}))
  }
);

passport.use("genius", geniusStrategy);