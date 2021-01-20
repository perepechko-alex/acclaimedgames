import { db } from "./db/db.js";
import { otherGames } from "./gameNameMappings.js";

export async function getGoat() {
  const gameArr = [];
  let gameObj = {};
  return new Promise((resolve, reject) => {
    db.each(
      `SELECT name, SUM(weightedpoints) weightedpoints
            FROM goat
            GROUP BY name`,
      [],
      (err, row) => {
        gameObj = {
          name: row.name,
          totalScore: row.weightedpoints,
        };
        gameArr.push(gameObj);
      },
      (err) => {
        resolve(gameArr);
      }
    );
  });
}

export function populateFinalResults(gameArr) {
  let sql = `INSERT OR REPLACE INTO finalResults(rank, name, totalscore) VALUES (?, ?, ?)`;
  for (let game of gameArr) {
    db.run(sql, [game.finalRank, game.name, game.totalScore], (err) => {
      if (err) return console.log(err);
    });
  }
}

export async function getOtherGameVersions() {
  let queryVars = otherGames.map(() => "(?) ").join("OR name = ");
  let sql = `SELECT name, SUM(weightedpoints) total FROM goat WHERE name = ${queryVars} GROUP BY name`;
  return new Promise((resolve, reject) => {
    db.all(sql, otherGames, (err, rows) => {
      resolve(rows);
    });
  });
}

export function getConsolidatedGames(otherGames, gamesArr) {
  for (let game of gamesArr) {
    for (let other of otherGames) {
      if (
        (other.name === "Street Fighter II: Championship Edition" ||
          other.name === "Super Street Fighter II: Turbo" ||
          other.name === "Street Fighter II: Turbo" ||
          other.name === "Super Street Fighter II Turbo HD Remix") &&
        game.name === "Street Fighter II"
      )
        game.totalScore += other.total;
      if (
        (other.name === "Persona 4 Golden" ||
          other.name === "Shin Megami Tensei: Persona 4") &&
        game.name === "Persona 4"
      )
        game.totalScore += other.total;
      if (
        other.name === "Shin Megami Tensei: Persona 3" &&
        game.name === "Persona 3"
      )
        game.totalScore += other.total;

      if (
        (other.name === "Ultra Street Fighter IV" ||
          other.name === "Super Street Fighter IV") &&
        game.name === "Street Fighter IV"
      )
        game.totalScore += other.total;
      if (
        other.name === "FTL: Advanced Edition" &&
        game.name === "FTL: Faster Than light"
      )
        game.totalScore += other.total;

      if (
        (other.name === "Rez Infinite" || other.name === "Rez HD") &&
        game.name === "Rez"
      )
        game.totalScore += other.total;

      if (
        other.name === "Pac-Man: Championship Edition DX" &&
        game.name === "Pac-Man: Championship Edition"
      )
        game.totalScore += other.total;
      if (other.name === "Mario Kart 8 Deluxe" && game.name === "Mario Kart 8")
        game.totalScore += other.total;

      if (
        other.name === "NBA Jam: Tournament Edition" &&
        game.name === "NBA Jam"
      )
        game.totalScore += other.total;
      if (
        other.name === "Halo: Combat Evolved Anniversary" &&
        game.name === "Halo: Combat Evolved"
      )
        game.totalScore += other.total;
      if (
        other.name === "Ninja Gaiden Black" &&
        game.name === "Ninja Gaiden (2005)"
      )
        game.totalScore += other.total;
      if (other.name === "NFL 2K5" && game.name === "ESPN NFL 2K5")
        game.totalScore += other.total;
      if (
        other.name === "Planescape Torment Enhanced Edition" &&
        game.name === "Planescape Torment"
      )
        game.totalScore += other.total;
      if (other.name === "Persona 5 Royal" && game.name === "Persona 5")
        game.totalScore += other.total;
      if (
        other.name === "Shadow of the Colossus (Remaster)" &&
        game.name === "Shadow of the Colossus"
      )
        game.totalScore += other.total;
      if (
        other.name === "Dark Souls (Remastered)" &&
        game.name === "Dark Souls"
      )
        game.totalScore += other.total;
      if (
        other.name === "The Legend of Zelda: Twilight Princess HD" &&
        game.name === "The Legend of Zelda: Twilight Princess"
      )
        game.totalScore += other.total;
      if (
        other.name === "Day of the Tentacle (Remastered)" &&
        game.name === "Day of the Tentacle"
      )
        game.totalScore += other.total;
      if (
        other.name === "The Elder Scrolls V: Skyrim - Special Edition" &&
        game.name === "The Elder Scrolls V: Skyrim"
      )
        game.totalScore += other.total;
      if (
        other.name === "Monster Hunter 4 Ultimate" &&
        game.name === "Monster Hunter 4"
      )
        game.totalScore += other.total;

      if (
        other.name === "Tony Hawk's Pro Skater 1 + 2" &&
        (game.name === "Tony Hawk's Pro Skater" ||
          game.name === "Tony Hawk's Pro Skater 2")
      )
        game.totalScore += other.total;
      if (
        other.name === "Demon's Souls (2020)" &&
        game.name === "Demon's Souls"
      )
        game.totalScore += other.total;

      if (
        other.name === "Virtua Fighter 5: Final Showdown" &&
        game.name === "Virtua Fighter 5"
      )
        game.totalScore += other.total;

      if (
        other.name === "Outrun 2" &&
        game.name === "Outrun 2006: Coast to Coast"
      )
        game.totalScore += other.total;

      if (
        other.name === "Street Fighter III: Third Strike" &&
        game.name === "Street Fighter III"
      )
        game.totalScore += other.total;

      if (
        other.name === "Super Mario Advance 4: Super Mario Bros. 3" &&
        game.name === "Super Mario Bros. 3"
      )
        game.totalScore += other.total;
    }
  }
  return gamesArr;
}
