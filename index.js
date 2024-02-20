const express = require("express");
const bodyparser = require("body-parser");
const asyncHandler = require("express-async-handler")
// require("dotenv").config();

const app = express();
const path = require("path");
const {processSong, findSong} = require("./src/routes/process-song");

require("dotenv").config({ path: path.resolve(__dirname, '..', '.env.local') });
const passport = require("passport");
const session = require("express-session");
const { constants } = require("./src/utils/paths");
const { attachTokens }  = require("./src/middleware");

app.set("view engine", "ejs");
require("./src/utils/passport");

const PORT = 3000;

app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(attachTokens)

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/find-song", findSong);
app.post("/process-song", processSong);
// passport.authenticate("genius", {session: true}) , --> this part was in the "/process-song" route

// app.get("/auth/genius", (req, res) => {
//   passport.authenticate("genius");
// });

// app.get(
//   "/auth/genius/callback",
//   passport.authenticate("genius", {
//     successRedirect: "/",
//   }),
// );

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
