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
let rankCount = 1;

async function writeToFile(gameArr) {
  // gameArr = gameArr.filter((game) => !otherGames.includes(game.name));

  gameArr = await gameArr.sort((a, b) =>
    a.totalScore > b.totalScore ? -1 : 1
  );

  for (let game of gameArr) {
    if (!otherGames.includes(game.name)) {
      game.finalRank = rankCount;
      rankCount++;
    }
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
