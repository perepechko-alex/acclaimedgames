import sqlite3 from "sqlite3";
export const db = new sqlite3.Database("./data/out/ggoat.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to SQlite database");
});
