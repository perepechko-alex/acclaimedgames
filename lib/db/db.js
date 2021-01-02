// import mongoose from "mongoose";
// const { Schema } = mongoose;
//
// // TODO: Make connection string an environment variable
// const options = {
//   useNewUrlParser: true,
//   autoIndex: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// };
//
// const mongoURI = "mongodb://localhost/acclaimedGames";
// export const conn = mongoose.createConnection(mongoURI, options);
//
// // const db = mongoose.connection;
//
// const goatSchema = new Schema({
//   fileName: String,
//   listYear: Number,
//   rank: Number,
//   name: String,
//   weightedPoints: Number,
// });
//
// const gotySchema = new Schema({
//   fileName: String,
//   publication: String,
//   name: String,
//   points: Number,
// });
//
// goatSchema.index(
//   { fileName: 1, name: 1 },
//   { unique: true, name: "goatPrimaryKey" }
// );
// gotySchema.index(
//   { fileName: 1, name: 1, publication: 1, points: 1 },
//   { unique: true, name: "gotyPrimaryKey" }
// );
// export const GOATGame = mongoose.model("GOAT", goatSchema);
// export const GOTYGame = mongoose.model("GOTY", gotySchema);
//
// conn.on("error", console.error.bind(console, "connection error: "));
// conn
//   .once("connected", async function () {
//     conn.db.listCollections().toArray(async function (err, collectionNames) {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       // console.log(collectionNames);
//       // if (collectionNames) {
//       //   await GOATGame.collection.drop();
//       //   await GOTYGame.collection.drop();
//       // }
//     });
//     console.log("Database is open!");
//   })
//   .on("close", () => {
//     console.info("MongoDB Closed!");
//   });
//
// export const client = mongoose.connect(mongoURI, options);
import sqlite3 from "sqlite3";
export const db = new sqlite3.Database("./lib/db/acclaimedgames.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to SQlite database");
});

export function createTempTable() {
  db.run(`CREATE TEMP TABLE IF NOT EXISTS allTemp(
    name,
    weightedpoints)`);
}

export function createFinalResultsTable() {
  db.run(`CREATE TABLE IF NOT EXISTS "finalResults" (
	"rank"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"totalScore"	NUMERIC NOT NULL,
	PRIMARY KEY("rank","name"),
  FOREIGN KEY("name") REFERENCES "game_metadata"("name")
)`);
}

export function createTables() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS "game_metadata" (
      "name"	TEXT NOT NULL UNIQUE,
      "releasedate"	TEXT,
      "platforms"	TEXT,
      PRIMARY KEY("name"))`);
    db.run(`CREATE TABLE IF NOT EXISTS "goat" (
        "filename"	TEXT NOT NULL,
        "listyear"	TEXT NOT NULL,
        "rank"	INTEGER,
        "name"	TEXT NOT NULL,
        "weightedpoints"	NUMERIC NOT NULL,
        "isranked"	INTEGER NOT NULL,
        PRIMARY KEY("filename","weightedpoints","name"),
        FOREIGN KEY("name") REFERENCES "game_metadata"("name"))`);
    db.run(`CREATE TABLE IF NOT EXISTS "goty" (
          "filename"	TEXT NOT NULL,
          "publication"	TEXT,
          "rank"	INTEGER,
          "name"	TEXT NOT NULL,
          "weightedpoints"	NUMERIC NOT NULL,
          "isranked"	INTEGER NOT NULL,
          FOREIGN KEY("name") REFERENCES "game_metadata"("name"),
          PRIMARY KEY("filename","name","weightedpoints"))`);
  });
}
