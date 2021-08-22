import {
  createFinalResultsTable,
  createTables,
  createViews,
} from "../lib/db/db.mjs";
import { importCsvGoatData, importCsvGotyData } from "./import.mjs";

(async () => {
  createTables();
  createViews();
  createFinalResultsTable();
  await Promise.allSettled([importCsvGoatData(), importCsvGotyData()]);
})();
