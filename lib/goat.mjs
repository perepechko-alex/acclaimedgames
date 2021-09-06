import { db } from "./db/db.mjs";

export async function getGoat() {
  const gameArr = [];
  let gameObj = {};
  return new Promise((resolve, reject) => {
    db.each(
      `SELECT name, SUM(weightedpoints) weightedpoints, COUNT(*) numoflists, ROUND(AVG(listyear) - 0.5) avglistyear
            FROM goat
            GROUP BY name`,
      [],
      (err, row) => {
        gameObj = {
          name: row.name,
          totalScore: row.weightedpoints,
          numberOfLists: row.numoflists,
          avgListYear: row.avglistyear,
        };
        gameArr.push(gameObj);
      },
      (err) => {
        resolve(gameArr);
      }
    );
  });
}

function writeToDb(batch) {
  const placeholders = batch.map((param) => "(?, ?, ?, ?, ?)").join(",");
  const sql = db.prepare(
    `INSERT OR REPLACE INTO finalResults(rank, name, totalscore, numoflists, avglistyear) VALUES ${placeholders}`
  );
  const flatBatch = batch.flat();
  sql.run(flatBatch);
}

export function populateFinalResults(gameArr) {
  let batch = [];
  for (let game of gameArr) {
    batch.push([
      game.finalRank,
      game.name,
      game.totalScore,
      game.numberOfLists,
      game.avgListYear,
    ]);
    if (batch.length === 100) {
      writeToDb(batch);
      batch = [];
    }
  }
  if (batch.length > 0) {
    writeToDb(batch);
  }
}
