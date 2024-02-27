function dataCleaner(data) {
  console.log(`Cleaned Results data received: ${data}`);
  if (data && data.hits) {
    const songDetails = data.hits.map((hit) => ({
      title: hit.result.full_title,
      //   title: hit.track.title
      //   artist: hit.track.subtitle,
      artist: hit.result.artist_names,
      id: hit.result.id,
      lyricsPath: hit.result.path,
    }));

    songDetails.forEach((item) => {
      console.log(`title: ${item.title}, artist: ${item.artist}, lyricsPath: ${item.lyricsPath}`);
    });
    return songDetails;
  } else {
    console.log("No Data received");
    return null;
  }
}

module.exports = dataCleaner;
