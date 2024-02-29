const express = require("express");
const bodyparser = require("body-parser");
const asyncHandler = require("express-async-handler")
// require("dotenv").config();

const app = express();
const path = require("path");
const {processSong, findSong} = require("./src/routes/process-song");

require("dotenv").config({ path: path.resolve(__dirname, '..', '.env.local') });
const session = require("express-session");
const { constants } = require("./src/utils/paths");

app.set("view engine", "ejs");

const PORT = 3000;

app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(attachTokens)

app.get("/", (req, res) => {
  res.render("main.ejs");
});

app.post("/find-song", findSong);
app.post("/process-song", processSong);


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
