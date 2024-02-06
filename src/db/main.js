const mongoose = require("mongoose");

async function main () {
    await mongoose.connect("mongodb://localhost:27017");

    const songSchema = new mongoose.Schema({
        title: string,
        artist: string,
        originalLyrics: string,
        censoredLyrics: string
    });

    const Song = mongoose.model("Song", songSchema);

    const saveSongToDB = async (title,artist, originalLyrics, censoredLyrics) => {
        try {
            const song = new Song({title,artist, originalLyrics, censoredLyrics})
            await song.save();
            console.log("Song Saved to db");
        } catch (error) {
            console.error(error);
        }
    }
};