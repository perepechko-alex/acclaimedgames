import {
  getGoat,
  getConsolidatedGames,
  getOtherGameVersions,
} from "../lib/goat.js";

import {
  createFinalResultsTable,
  createTables,
  createViews,
} from "../lib/db/db.js";
import { writeFinalResults, writeToCsv } from "../lib/writeResults.js";
import { writeGameMetadata } from "./writeMetadata.js";
import { importCsvGoatData, importCsvGotyData } from "./import.js";

(async () => {
  createTables();
  createViews();
  await importCsvGoatData();
  await importCsvGotyData();
  writeGameMetadata();
  createFinalResultsTable();
  const otherGamesArr = await getOtherGameVersions();
  const gamesArr = await getGoat();
  const consolidatedGamesArr = getConsolidatedGames(otherGamesArr, gamesArr);
  await writeFinalResults(consolidatedGamesArr);
  writeToCsv();
})();
