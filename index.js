import {
  getGoat,
  getConsolidatedGames,
  getOtherGameVersions,
} from "./lib/goat.js";
import { createFinalResultsTable } from "./lib/db/db.js";
import { writeFinalResults } from "./lib/writeResults.js";

(async () => {
  createFinalResultsTable();
  const otherGamesArr = await getOtherGameVersions();
  const gamesArr = await getGoat([]);
  const consolidatedGamesArr = getConsolidatedGames(otherGamesArr, gamesArr);

  await writeFinalResults(consolidatedGamesArr);
})();
