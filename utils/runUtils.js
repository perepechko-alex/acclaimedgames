import {
  getGoat,
  getConsolidatedGames,
  getOtherGameVersions,
} from "../lib/goat.js";
<<<<<<< HEAD
import { createFinalResultsTable } from "../lib/db/db.js";
import { writeFinalResults } from "../lib/writeResults.js";
import { writeGameMetadata } from "./writeMetadata.js";

(async () => {
=======
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
>>>>>>> master
  writeGameMetadata();
  createFinalResultsTable();
  const otherGamesArr = await getOtherGameVersions();
  const gamesArr = await getGoat();
  const consolidatedGamesArr = getConsolidatedGames(otherGamesArr, gamesArr);
  await writeFinalResults(consolidatedGamesArr);
<<<<<<< HEAD
=======
  writeToCsv();
>>>>>>> master
})();
