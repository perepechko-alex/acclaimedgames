import * as fs from "fs";
import parse from "csv-parse";
import { client, GOATGame, GOTYGame } from "../lib/db.js";
import { goatCalc, gotyCalc } from "../lib/formulas.js";

const dataFolderGoatRanked = "./data/in/goat/ranked";
const dataFolderGoatUnranked = "./data/in/goat/unranked";
const dataFolderGotyUnranked = "./data/in/goty/unranked";
const dataFolderGotyRanked = "./data/in/goty/ranked";
const re = /[0-9]{4}/;
let listDate = "";
let rank = 0;
let name = "";
let publication = "";
// TODO: Add async invocation to run this as it's own mini-program
export async function importCsvGoatData() {
  fs.readdir(dataFolderGoatRanked, async (err, files) => {
    await Promise.all(
      files.map((file, index) => {
        fs.createReadStream(`${dataFolderGoatRanked}/${file}`)
          .pipe(parse({ delimiter: ",", from_line: 2 }))
          .on("data", async function (csvrow) {
            rank = parseInt(csvrow[0]);
            name = csvrow[1];
            if (rank && name) {
              listDate = re.exec(`${file}`);
              const doc = new GOATGame({
                fileName: file,
                listYear: listDate[0],
                rank: rank,
                name: name,
                weightedPoints: goatCalc(listDate[0], rank, true),
              });

              await doc.save();
            }
          })
          .on("end", function () {
            console.log(`Successfully imported ${file}!`);
          });
      })
    );
  });

  fs.readdir(dataFolderGoatUnranked, async (err, files) => {
    await Promise.all(
      files.map((file, index) => {
        fs.createReadStream(`${dataFolderGoatUnranked}/${file}`)
          .pipe(parse({ delimiter: ",", from_line: 2 }))
          .on("data", async function (csvrow) {
            name = csvrow[0];
            if (name) {
              listDate = re.exec(`${file}`);
              const doc = new GOATGame({
                fileName: file,
                listYear: listDate[0],
                name: name,
                weightedPoints: goatCalc(listDate[0], rank, false),
              });

              await doc.save();
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
  fs.readdir(dataFolderGotyRanked, async (err, files) => {
    await Promise.all(
      files.map((file) => {
        fs.createReadStream(`${dataFolderGotyRanked}/${file}`)
          .pipe(parse({ delimiter: ",", from_line: 2 }))
          .on("data", async function (csvrow) {
            rank = parseInt(csvrow[0]);
            name = csvrow[1];
            if (rank && name) {
              listDate = re.exec(`${file}`);
              const doc = new GOTYGame({
                fileName: file,
                name: name,
                points: gotyCalc(rank),
              });

              await doc.save();
            }
          })
          .on("end", function () {
            console.log(`Successfully imported ${file}!`);
          });
      })
    );
  });

  fs.readdir(dataFolderGotyUnranked, async (err, files) => {
    await Promise.all(
      files.map((file) => {
        fs.createReadStream(`${dataFolderGotyUnranked}/${file}`)
          .pipe(parse({ delimiter: ",", from_line: 2 }))
          .on("data", async function (csvrow) {
            publication = csvrow[0];
            name = csvrow[1];
            if (publication && name) {
              listDate = re.exec(`${file}`);
              const doc = new GOTYGame({
                fileName: file,
                publication: publication,
                name: name,
                points: 1,
              });

              await doc.save();
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
  await client;
  await importCsvGoatData();
  await importCsvGotyData();
  setTimeout(function () {
    return process.exit(0);
  }, 5500);
})();
