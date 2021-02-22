import sqlite3 from "sqlite3";
export const db = new sqlite3.Database("./lib/db/acclaimedgames.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to SQlite database");
});

export function createFinalResultsTable() {
  db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS "finalResults"`);
    db.run(`CREATE TABLE IF NOT EXISTS "finalResults" (
      "rank"	INTEGER,
      "name"	TEXT NOT NULL,
      "totalscore"	NUMERIC NOT NULL,
      PRIMARY KEY("rank","name"),
      FOREIGN KEY("name") REFERENCES "game_metadata"("name")
    )`);
  });
}

export function createViews() {
  db.serialize(() => {
    db.run(`CREATE VIEW IF NOT EXISTS results_with_metadata AS
      SELECT finalResults.rank, finalResults.name, finalResults.totalScore, game_metadata.releasedate, game_metadata.platforms, game_metadata.developers FROM finalResults
      INNER JOIN game_metadata ON finalResults.name = game_metadata.name
      ORDER BY CASE WHEN finalResults.rank IS NULL THEN 1 ELSE 0 END, finalResults.rank`);
  });
}

export function createTables() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS "game_metadata" (
      "name"	TEXT NOT NULL,
      "releasedate"	TEXT,
      "platforms"	TEXT,
      "developers" TEXT,
      "genre" TEXT,
      PRIMARY KEY("name"))`);
    db.run(`CREATE TABLE IF NOT EXISTS "goat" (
        "filename"	TEXT NOT NULL,
        "listyear"	TEXT NOT NULL,
        "publication"	TEXT,
        "rank"	INTEGER,
        "name"	TEXT NOT NULL,
        "weightedpoints"	NUMERIC NOT NULL,
        "isranked"	INTEGER NOT NULL,
        "notes" TEXT,
        PRIMARY KEY("filename","weightedpoints","name","publication"),
        FOREIGN KEY("name") REFERENCES "game_metadata"("name"))`);
  });
}

export function writeGameMetadata() {
  let batch = [];
  db.serialize(() => {
    db.all(`SELECT DISTINCT name from goat`, [], (err, rows) => {
      rows.forEach((row) => {
        batch.push(row.name);
        if (batch.length === 100) {
          const placeholders = batch.map((param) => "(?)").join(",");
          let query = `INSERT INTO game_metadata(name) VALUES ${placeholders}`;
          const flatBatch = batch.flat();
          db.run(query, ...flatBatch, (err) => {
            if (err) {
              // console.log(err.message);
            }
          });
          batch = [];
        }
      });
      if (batch.length > 0) {
        const placeholders = batch.map((param) => "(?)").join(",");
        let query = `INSERT INTO game_metadata(name) VALUES ${placeholders}`;
        console.log(query);
        const flatBatch = batch.flat();
        db.run(query, ...flatBatch, (err) => {
          if (err) {
            // console.log(err.message);
          }
        });
        batch = [];
      }
    });
  });
}
