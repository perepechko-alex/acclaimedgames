import * as fs from "fs";
import parse from "csv-parse";
import { goatCalc, gotyCalc } from "../lib/formulas.mjs";
import { db, createTables, createViews } from "../lib/db/db.mjs";

const dataFolderGoat = "./data/in/goat";
const dataFolderGoty = "./data/in/goty";
const re = /[0-9]{4}/;
const pubre = /.*-(.*).csv/;
const goatre = /GOAT/;
const gotyre = /GOTY/;
let listDate = "";
let rank = 0;
let name = "";
let publication = "";
let listType = "";
let notes = "";
let params = [];
const override = process.env.OVERRIDE === "true" ? true : false;

export async function importCsvGoatData() {
  let batch = [];
  fs.readdir(dataFolderGoat, async (err, files) => {
    await Promise.all(
      files.map((file) => {
        fs.createReadStream(`${dataFolderGoat}/${file}`)
          .pipe(parse({ delimiter: ",", from_line: 2 }))
          .on("data", function (csvrow) {
            rank = isNaN(csvrow[0]) ? null : parseInt(csvrow[0]);
            name = !rank ? csvrow[0] : csvrow[1];

            if (
              name &&
              name !== "LIST_YEAR" &&
              name !== "ET: The Extra-Terrestrial" &&
              override !== true
            ) {
              if (rank) notes = csvrow[2];
              else notes = csvrow[1];

              listDate = re.exec(`${file}`);
              publication = pubre.exec(`${file}`);
              listType = goatre.exec(`${file}`);
              params = [
                file,
                listDate[0],
                publication[1],
                listType,
                rank,
                name,
                goatCalc(listDate[0], rank, !!rank, 2),
                rank ? 1 : 0,
                notes,
              ];
              batch.push(params);
              if (batch.length === 100) {
                const placeholders = batch
                  .map((param) => "(?, ?, ?, ?, ?, ?, ?, ?, ?)")
                  .join(",");
                const query = db.prepare(
                  `INSERT INTO goat(filename, listyear, publication, listtype, rank, name, weightedpoints, isranked, notes) VALUES ${placeholders}`
                );
                const flatBatch = batch.flat();
                db.serialize(() => {
                  query.run(...flatBatch);
                });
                batch = [];
                query.finalize();
              }
            }
          })
          .on("end", function () {
            console.log(`Successfully imported ${file}!`);
          })
          .on("finish", function () {
            if (batch.length > 0) {
              const placeholders = batch
                .map((param) => "(?, ?, ?, ?, ?, ?, ?, ?, ?)")
                .join(",");
              const query = db.prepare(
                `INSERT INTO goat(filename, listyear, publication, listtype, rank, name, weightedpoints, isranked, notes) VALUES ${placeholders}`
              );
              const flatBatch = batch.flat();
              db.serialize(() => {
                query.run(...flatBatch);
              });
              batch = [];
              query.finalize();
            }
          });
      })
    );
  });
}

export async function importCsvGotyData() {
  let batch = [];
  fs.readdir(dataFolderGoty, async (err, files) => {
    await Promise.all(
      files.map((file) => {
        fs.createReadStream(`${dataFolderGoty}/${file}`)
          .pipe(parse({ delimiter: ",", from_line: 2 }))
          .on("data", function (csvrow) {
            rank = Number.isInteger(parseInt(csvrow[0]))
              ? parseInt(csvrow[0])
              : null;
            if (csvrow[0].toLowerCase() === "unranked" && rank === null)
              rank = "Unranked";
            if (rank === null) {
              publication = csvrow[0];
            } else {
              const pubRegex = pubre.exec(`${file}`);
              publication = pubRegex[1];
            }
            name = csvrow[1];
            notes = csvrow[2];
            if (name) {
              listDate = re.exec(`${file}`);
              listType = gotyre.exec(`${file}`);
              params = [
                file,
                listDate,
                publication,
                listType,
                name,
                rank,
                rank ? gotyCalc(rank) : 1,
                rank && rank !== "Unranked" ? 1 : 0,
                notes,
              ];
              batch.push(params);
              if (batch.length === 100) {
                const placeholders = batch
                  .map((param) => "(?, ?, ?, ?, ?, ?, ?, ?, ?)")
                  .join(",");
                const query = db.prepare(
                  `INSERT INTO goat(filename, listyear, publication, listtype, name, rank, weightedpoints, isranked, notes) VALUES ${placeholders}`
                );
                const flatBatch = batch.flat();
                db.serialize(() => {
                  query.run(...flatBatch);
                });
                batch = [];
                query.finalize();
              }
            }
          })
          .on("end", function () {
            console.log(`Successfully imported ${file}!`);
          })
          .on("finish", function () {
            if (batch.length > 0) {
              const placeholders = batch
                .map((param) => "(?, ?, ?, ?, ?, ?, ?, ?, ?)")
                .join(",");
              const query = db.prepare(
                `INSERT INTO goat(filename, listyear, publication, listtype, name, rank, weightedpoints, isranked, notes) VALUES ${placeholders}`
              );
              const flatBatch = batch.flat();
              db.serialize(() => {
                query.run(...flatBatch);
              });
              batch = [];
              query.finalize();
            }
          });
      })
    );
  });
}