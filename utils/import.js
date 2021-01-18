import * as fs from "fs";
import parse from "csv-parse";
import { goatCalc, gotyCalc } from "../lib/formulas.js";
import {
  db,
  createTables,
  createViews,
  writeGameMetadata,
} from "../lib/db/db.js";

const dataFolderGoat = "./data/in/goat";
const dataFolderGoty = "./data/in/goty";
const re = /[0-9]{4}/;
let listDate = "";
let rank = 0;
let name = "";
let publication = "";
let notes = "";
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

            name = !rank ? csvrow[0] : csvrow[1];
            if (name && name !== "LIST_YEAR") {
              if (csvrow[1] === "GAME") notes = csvrow[2];
              else notes = csvrow[1];

              listDate = re.exec(`${file}`);
              params = [
                file,
                listDate[0],
                rank,
                name,
                goatCalc(listDate[0], rank, !!rank),
                rank ? 1 : 0,
                notes,
              ];
              db.serialize(() => {
                writeGameMetadata([name]);
                db.run(
                  `INSERT INTO goat(filename, listyear, rank, name, weightedpoints, isranked, notes) VALUES(?, ?, ?, ?, ?, ?, ?)`,
                  params,
                  (err) => {
                    if (err) {
                      // console.log(err.message);
                    }
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
            notes = csvrow[2];
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
                notes,
              ];
              db.serialize(() => {
                writeGameMetadata([name]);
                db.run(
                  `INSERT INTO goat(filename, listyear, publication, name, rank, weightedpoints, isranked, notes) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
                  params,
                  (err) => {
                    if (err) {
                      // console.log(err.message);
                    }
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
  createViews();
  await importCsvGoatData();
  await importCsvGotyData();
})();
