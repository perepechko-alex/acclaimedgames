import {
  createFinalResultsTable,
  createTables,
  createViews,
} from "../lib/db/db.js";
import { importCsvGoatData, importCsvGotyData } from "./import.js";

(async () => {
  createTables();
  createViews();
  createFinalResultsTable();
  await Promise.allSettled([importCsvGoatData(), importCsvGotyData()])
})();



