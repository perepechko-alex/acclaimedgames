import {
  getGoat,
  getConsolidatedGames,
  getOtherGameVersions,
  populateTemp,
  populateFinalResults,
} from "./lib/goat.js";
import stringify from "csv-stringify";
import { otherGames } from "./lib/gameNameMappings.js";
import fs from "fs";
import { createFinalResultsTable, createTempTable } from "./lib/db/db.js";

const outDir = "./data/out";

async function writeToFile(gameArr) {
  gameArr = gameArr.filter((game) => !otherGames.includes(game.name));

  gameArr = await gameArr.sort((a, b) =>
    a.totalScore > b.totalScore ? -1 : 1
  );
  for (let i = 0; i < gameArr.length; i++) {
    gameArr[i].finalRank = i + 1;
  }

  populateFinalResults(gameArr);

  stringify(
    gameArr,
    { header: true, columns: ["finalRank", "name", "totalScore"] },
    function (err, output) {
      fs.writeFileSync(`${outDir}/finalList.csv`, output);
      console.log("File is written!");
    }
  );
}

(async () => {
  createTempTable();
  populateTemp();
  createFinalResultsTable();
  const otherGamesArr = await getOtherGameVersions();
  const gamesArr = await getGoat();
  const consolidatedGamesArr = getConsolidatedGames(otherGamesArr, gamesArr);

  await writeToFile(consolidatedGamesArr);
})();
