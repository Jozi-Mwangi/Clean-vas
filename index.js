const express = require("express");
const bodyparser = require("body-parser");

const app = express();
const path = require("path");
const processSong = require("./src/routes/process-song");

app.set("view engine", "ejs")

const PORT = 3000

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