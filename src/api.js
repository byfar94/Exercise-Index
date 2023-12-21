export { getData };

async function getData() {
  try {
    let response = await fetch("info");

    let playlistData = await response.json();
    console.log(playlistData);
    return playlistData;
  } catch (err) {
    console.error(err);
  }
}
