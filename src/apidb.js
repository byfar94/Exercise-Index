export { getDbData, getDbDataBP };

async function getDbData() {
  try {
    let response = await fetch("/exercise");

    let dbData = await response.json();
    console.log(dbData);
    return dbData;
  } catch (err) {
    console.error(err);
  }
}

async function getDbDataBP(bp) {
  try {
    let response = await fetch(`/exercise/bodypart/${bp}`);
    let dbData = await response.json();
    console.log(dbData);
    return dbData;
  } catch (err) {
    console.error(err);
  }
}
