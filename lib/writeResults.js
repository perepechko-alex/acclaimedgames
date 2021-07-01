import { otherGames } from "./gameNameMappings.js";
import { populateFinalResults } from "./goat.js";
import { db } from "./db/db.js";
import { compareGames } from "./sort.js";
import stringify from "csv-stringify";
import * as fs from "fs";

function setGameRankings(gameArr) {
  let rankCount = 1;
  let tmpGame = {};

  for (let game of gameArr) {
    if (!otherGames.includes(game.name)) {
      if (
        tmpGame.totalScore === game.totalScore &&
        tmpGame.numberOfLists === game.numberOfLists &&
        tmpGame.avgListYear === game.avgListYear
      ) {
        game.finalRank = rankCount - 1;
        tmpGame = {
          totalScore: game.totalScore,
          numberOfLists: game.numberOfLists,
          avgListYear: game.avgListYear,
        };
      } else {
        game.finalRank = rankCount;
        tmpGame = {
          totalScore: game.totalScore,
          numberOfLists: game.numberOfLists,
          avgListYear: game.avgListYear,
        };
        rankCount++;
      }
    } else {
      game.finalRank = 900000;
    }
  }
}

export async function writeFinalResults(gameArr) {
  gameArr = gameArr.sort(compareGames);
  setGameRankings(gameArr);
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
          "numoflists",
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
