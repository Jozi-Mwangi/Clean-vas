// import { AuthorizationCode } from "simple-oauth2";
// import { constants } from "./paths";
// import asyncHandler from "express-async-handler";

const {AuthorizationCode} = require("simple-oauth2")
const { constants } = require("./paths");
const {asyncHandler} = require("express-async-handler")

const express = require("express");
const app = express();

const client = new AuthorizationCode({
  client: {
    id: "RXKXaLo3gLz0nYXvqYYpcn451iwWDry0Ky_je3_S5bi0FBtqxlGT_xec7Jp3_L4B",
    secret: constants.CLIENT_SECRET,
  },
  auth: {
    tokenHost: constants.GENIUS_API_URL,
    tokenPath: constants.TOKENURL,
    authorizePath: constants.AUTHORIZATIONURL,
  },
});

const authorizationURL = client.authorizeURL({
  redirect_uri: constants.CALLBACK_URL,
});

app.get("/auth", (req, res) => {
  console.log(authorizationURL);
  res.redirect(authorizationURL);
});

app.get(
  "/auth/callback",
  asyncHandler(async (req, res) => {
    const { code } = req.query;

    const options = {
        code: code,
        redirect_uri:constants.CALLBACK_URL   
    }

    const token = await client.getToken(options);
    console.log("From authentiator: ", token);
    res.redirect(`/process-song?access_token=${token.token.access_token}`)
  })
);

// app.use(attachTokens)
