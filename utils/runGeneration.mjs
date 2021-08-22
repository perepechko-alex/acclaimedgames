import {
  getConsolidatedGames,
  getGoat,
  getOtherGameVersions,
} from "../lib/goat.mjs";
import { writeFinalResults } from "../lib/writeResults.mjs";
import { writeGameMetadata } from "./writeMetadata.mjs";

(async () => {
  const otherGamesArr = await getOtherGameVersions();
  const gamesArr = await getGoat();
  const consolidatedGamesArr = getConsolidatedGames(otherGamesArr, gamesArr);
  await writeFinalResults(consolidatedGamesArr);
  writeGameMetadata();
})();
