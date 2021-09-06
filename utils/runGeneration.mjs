import { getGoat } from "../lib/goat.mjs";
import { writeFinalResults } from "../lib/writeResults.mjs";
import { writeGameMetadata } from "./writeMetadata.mjs";

(async () => {
  const gamesArr = await getGoat();
  await writeFinalResults(gamesArr);
  writeGameMetadata();
})();
