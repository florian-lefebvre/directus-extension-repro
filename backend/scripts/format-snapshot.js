const fsp = require("node:fs/promises");
const path = require("node:path");

async function main() {
  const PATH = path.join(__dirname, "..", "snapshot.json");

  try {
    await fsp.stat(PATH);

    const content = await fsp.readFile(PATH, { encoding: "utf-8" });
    await fsp.writeFile(PATH, JSON.stringify(JSON.parse(content), null, 2), {
      encoding: "utf-8",
    });

    console.log("Snapshot has been formated.");
  } catch (e) {
    console.log(`!! ${PATH} does not exist !!`);
  }
}

main();
