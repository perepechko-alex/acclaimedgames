import { getGoat } from "./lib/goat.js";
import stringify from "csv-stringify";
import { otherGames } from "./lib/gameNameMappings.js";
import fs from "fs";
const outDir = "./data/out";
let gameArr = [];
(async () => {
  // import module for side effects
  await import("./lib/db.js");
  gameArr = await getGoat();

  gameArr = gameArr.filter((game) => !otherGames.includes(game.name));

  gameArr = await gameArr.sort((a, b) =>
    a.totalScore > b.totalScore ? -1 : 1
  );
  for (let i = 0; i < gameArr.length; i++) {
    gameArr[i].finalRank = i + 1;
  }
  stringify(
    gameArr,
    { header: true, columns: ["finalRank", "name", "totalScore"] },
    function (err, output) {
      fs.writeFileSync(`${outDir}/finalList.csv`, output);
      console.log("File is written!");
    }
  );

  setTimeout(function () {
    return process.exit(0);
  }, 15000);
})();
