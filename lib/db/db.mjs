import sqlite3 from "sqlite3";
export const db = new sqlite3.Database("./lib/db/ggoat.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to SQlite database");
});
