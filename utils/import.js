import * as fs from "fs";
import parse from "csv-parse";
import { goatCalc, gotyCalc } from "../lib/formulas.js";
import { db, createTables } from "../lib/db/db.js";

const dataFolderGoat = "./data/in/goat";
const dataFolderGoty = "./data/in/goty";
const re = /[0-9]{4}/;
let listDate = "";
let rank = 0;
let name = "";
let publication = "";
let params = [];
export async function importCsvGoatData() {
  fs.readdir(dataFolderGoat, async (err, files) => {
    await Promise.all(
      files.map((file, index) => {
        fs.createReadStream(`${dataFolderGoat}/${file}`)
          .pipe(parse({ delimiter: ",", from_line: 2 }))
          .on("data", function (csvrow) {
            rank = Number.isInteger(parseInt(csvrow[0]))
              ? parseInt(csvrow[0])
              : null;
            name = csvrow[1] ?? csvrow[0];
            if (name) {
              listDate = re.exec(`${file}`);
              params = [
                file,
                listDate[0],
                rank,
                name,
                goatCalc(listDate[0], rank, !!rank),
                rank ? 1 : 0,
              ];
              db.serialize(() => {
                db.run(
                  `INSERT INTO game_metadata(name) VALUES(?)`,
                  [name],
                  (err) => {
                    if (err) {
                      // console.log(err.message);
                    }
                  }
                );
                db.run(
                  `INSERT INTO goat(filename, listyear, rank, name, weightedpoints, isranked) VALUES(?, ?, ?, ?, ?, ?)`,
                  params,
                  (err) => {
                    if (err) {
                      // console.log(err.message);
                    }
                    // console.log(name);
                  }
                );
              });
            }
          })
          .on("end", function () {
            console.log(`Successfully imported ${file}!`);
          });
      })
    );
  });
}

export async function importCsvGotyData() {
  fs.readdir(dataFolderGoty, async (err, files) => {
    await Promise.all(
      files.map((file) => {
        fs.createReadStream(`${dataFolderGoty}/${file}`)
          .pipe(parse({ delimiter: ",", from_line: 2 }))
          .on("data", function (csvrow) {
            rank = Number.isInteger(parseInt(csvrow[0]))
              ? parseInt(csvrow[0])
              : null;
            publication = rank === null ? csvrow[0] : null;
            name = csvrow[1];
            if (name) {
              listDate = re.exec(`${file}`);
              params = [
                file,
                listDate,
                publication,
                name,
                rank,
                rank ? gotyCalc(rank) : 1,
                rank ? 1 : 0,
              ];
              db.serialize(() => {
                db.run(
                  `INSERT INTO game_metadata(name) VALUES(?)`,
                  [name],
                  (err) => {
                    if (err) {
                      // console.log(err.message);
                    }
                  }
                );
                db.run(
                  `INSERT INTO goat(filename, listyear, publication, name, rank, weightedpoints, isranked) VALUES(?, ?, ?, ?, ?, ?, ?)`,
                  params,
                  (err) => {
                    if (err) {
                      // console.log(err.message);
                    }
                    // console.log(name);
                  }
                );
              });
            }
          })
          .on("end", function () {
            console.log(`Successfully imported ${file}!`);
          });
      })
    );
  });
}

(async () => {
  createTables();
  await importCsvGoatData();
  await importCsvGotyData();
})();
