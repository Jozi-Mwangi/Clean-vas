const passport = require("passport");
const oAuth2Strategy = require("passport-oauth2");
const { constants } = require("./paths");

const geniusStrategy = new oAuth2Strategy(
  {
    authorizationURL: constants.AUTHORIZATIONURL,
    tokenURL: constants.TOKENURL,
    clientID: constants.CLIENT_ID,
    clientSecret: constants.CLIENT_SECRET,
    callbackURL: constants.CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
);

passport.use("genius", geniusStrategy);