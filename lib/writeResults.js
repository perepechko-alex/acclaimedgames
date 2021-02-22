import { otherGames } from "./gameNameMappings.js";
import { populateFinalResults } from "./goat.js";
import { db } from "./db/db.js";
import stringify from "csv-stringify";
import * as fs from "fs";

export async function writeFinalResults(gameArr) {
  let rankCount = 1;
  gameArr = gameArr.sort((a, b) => (a.totalScore > b.totalScore ? -1 : 1));

  for (let game of gameArr) {
    if (!otherGames.includes(game.name)) {
      game.finalRank = rankCount;
      rankCount++;
    } else {
      game.finalRank = 900000;
    }
  }
  populateFinalResults(gameArr);
}

export function writeToCsv() {
  const outDir = "./data/out";
  const outputFile = `${outDir}/finalList.csv`;
  const sql = "SELECT * FROM results_with_metadata";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    stringify(
      rows,
      {
        header: true,
        columns: [
          "rank",
          "name",
          "totalscore",
          "releasedate",
          "platforms",
          "developers",
        ],
      },
      function (err, output) {
        fs.writeFile(outputFile, output, (err) => {
          if (err) throw err;
          console.log("File is written!");
        });
      }
    );
  });
}
