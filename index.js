const express = require("express");
const bodyparser = require("body-parser");

const app = express();
const path = require("path");
const processSong = require("./src/routes/process-song");

const passport = require("passport");
const session = require("express-session");

app.set("view engine", "ejs")
require("./src/utils/passport")

const PORT = 3000

app.use(session({secret:"secret", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.render("index.ejs")
});

app.post("/process-song", processSong)

app.listen(PORT, ()=>{
    console.log(`Listening on port: ${PORT}`);
})