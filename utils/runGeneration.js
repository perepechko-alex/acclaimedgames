import {getConsolidatedGames, getGoat, getOtherGameVersions} from "../lib/goat.js";
import {writeFinalResults, writeToCsv} from "../lib/writeResults.js";
import {writeGameMetadata} from "./writeMetadata.js";

(async() => {
  const otherGamesArr = await getOtherGameVersions();
  const gamesArr = await getGoat();
  const consolidatedGamesArr = getConsolidatedGames(otherGamesArr, gamesArr);
  await writeFinalResults(consolidatedGamesArr);
  writeGameMetadata();
  writeToCsv();
})();