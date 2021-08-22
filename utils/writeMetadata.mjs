import { db } from "../lib/db/db.mjs";

export function writeGameMetadata() {
  db.serialize(() => {
    db.all(`SELECT DISTINCT name from goat`, [], (err, rows) => {
      rows.forEach((row) => {
        let query = `INSERT INTO game_metadata(name) VALUES (?)`;
        db.run(query, row.name, (err) => {
          if (err) {
          }
        });
      });
    });
  });
}
