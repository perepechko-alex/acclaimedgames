import {db} from "./db/db";

export async function getGameRoutes() {
  const gameArr = [];
  return new Promise((resolve, reject) => {
    db.each(
      `SELECT name FROM results_with_metadata_1000`,
      [],
      (err, row) => {
        gameArr.push(`/game/${row.name}`);
      },
      (err) => {
        resolve(gameArr);
      }
    );
  });
}
