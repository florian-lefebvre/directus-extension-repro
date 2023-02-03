import fsp from "node:fs/promises";
import { resolve } from "node:path";

async function copy(source, dest) {
  await fsp.mkdir(resolve(dest), { recursive: true });
  await fsp.copyFile(resolve(source), resolve(dest) + "/index.js");
}

async function main() {
  await copy(
    "dist/osm-autocomplete.js",
    "../backend/extensions/interfaces/osm-autocomplete"
  );
}

main();
