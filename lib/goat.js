import { GOATGame, GOTYGame } from "./db.js";
let gameSet = new Set();
let gameWithScore;
let gotyGame;

export async function getGoat() {
  const doc = await GOATGame.find({}).select("name -_id").sort({ name: "asc" });
  const gotyDoc = await GOTYGame.find({})
    .select("name -_id")
    .sort({ name: "asc" });

  doc.forEach((game, index) => {
    gameSet.add(game.name);
  });
  gotyDoc.forEach((game, index) => {
    gameSet.add(game.name);
  });

  let sf2Score = 0;
  let persona4Score = 0;
  let persona5Score = 0;
  let sf4Score = 0;
  let ftlScore = 0;
  let rezScore = 0;
  let pacmanceScore = 0;
  let mk8Score = 0;
  let nbajamteScore = 0;
  let cssourceScore = 0;
  let haloAnniversary = 0;
  let ninjaGaidenNewScore = 0;
  let nfltwokfiveScore = 0;
  let planescapeScore = 0;
  let darksoulsScore = 0;
  let sotcScore = 0;
  let tpScore = 0;
  let dayoftentacleScore = 0;
  let skyrimScore = 0;
  let mhfourScore = 0;
  let thoneandtwoScore = 0;
  let dsremakeScore = 0;
  let vf5Score = 0;
  const gameArr = [];
  for (let game of gameSet) {
    let totalScore = 0;
    gameWithScore = await GOATGame.find({ name: `${game}` }).select(
      "name weightedPoints -_id"
    );
    gotyGame = await GOTYGame.find({ name: `${game}` }).select(
      "name points -_id"
    );
    for (let gameObj of gameWithScore) {
      totalScore += gameObj.weightedPoints;
    }
    for (let gotyGameObj of gotyGame) {
      totalScore += gotyGameObj.points;
    }

    const finalGameObj = {
      name: game,
      totalScore,
    };

    if (
      game === "Street Fighter II: Championship Edition" ||
      game === "Super Street Fighter II: Turbo" ||
      game === "Street Fighter II: Turbo"
    )
      sf2Score = totalScore;
    if (game === "Persona 4 Golden" || game === "Shin Megami Tensei: Persona 4")
      persona4Score += totalScore;
    if (
      game === "Ultra Street Fighter IV" ||
      game === "Super Street Fighter IV"
    )
      sf4Score += totalScore;
    if (game === "FTL: Advanced Edition") ftlScore += totalScore;
    if (game === "Rez Infinite" || game === "Rez HD") rezScore += totalScore;
    if (game === "Pac-Man: Championship Edition DX")
      pacmanceScore += totalScore;
    if (game === "Mario Kart 8 Deluxe") mk8Score += totalScore;
    if (game === "NBA Jam: Tournament Edition") nbajamteScore += totalScore;
    if (game === "Counter-Strike: Source") cssourceScore += totalScore;
    if (game === "Halo: Combat Evolved Anniversary")
      haloAnniversary += totalScore;
    if (game === "Ninja Gaiden Black") ninjaGaidenNewScore += totalScore;
    if (game === "NFL 2K5") nfltwokfiveScore += totalScore;
    if (game === "Planescape Torment Enhanced Edition")
      planescapeScore += totalScore;
    if (game === "Persona 5 Royal") persona5Score += totalScore;
    if (game === "Shadow of the Colossus (Remaster)") sotcScore += totalScore;
    if (game === "Dark Souls (Remastered)") darksoulsScore += totalScore;
    if (game === "The Legend of Zelda: Twilight Princess HD")
      tpScore += totalScore;
    if (game === "Day of the Tentacle (Remastered)")
      dayoftentacleScore += totalScore;
    if (game === "The Elder Scrolls V: Skyrim - Special Edition")
      skyrimScore += totalScore;
    if (game === "Monster Hunter 4 Ultimate") mhfourScore += totalScore;
    if (game === "Tony Hawk's Pro Skater 1 + 2") thoneandtwoScore += totalScore;
    if (game === "Demon's Souls (2020)") dsremakeScore += totalScore;
    if (game === "Virtua Fighter 5: Final Showdown") vf5Score += totalScore;
    gameArr.push(finalGameObj);
  }

  for (let game of gameArr) {
    if (game.name === "Street Fighter II") game.totalScore += sf2Score;
    if (game.name === "Persona 4") game.totalScore += persona4Score;
    if (game.name === "Street Fighter IV") game.totalScore += sf4Score;
    if (game.name === "FTL: Faster Than Light") game.totalScore += ftlScore;
    if (game.name === "Rez") game.totalScore += rezScore;
    if (game.name === "Pac-Man: Championship Edition")
      game.totalScore += pacmanceScore;
    if (game.name === "Mario Kart 8") game.totalScore += mk8Score;
    if (game.name === "NBA Jam") game.totalScore += nbajamteScore;
    if (game.name === "Counter-Strike") game.totalScore += cssourceScore;
    if (game.name === "Halo: Combat Evolved")
      game.totalScore += haloAnniversary;
    if (game.name === "Ninja Gaiden (2004)")
      game.totalScore += ninjaGaidenNewScore;
    if (game.name === "ESPN NFL 2K5") game.totalScore += nfltwokfiveScore;
    if (game.name === "Planescape Torment") game.totalScore += planescapeScore;
    if (game.name === "Persona 5") game.totalScore += persona5Score;
    if (game.name === "Dark Souls") game.totalScore += darksoulsScore;
    if (game.name === "Shadow of the Colossus") game.totalScore += sotcScore;
    if (game.name === "The Legend of Zelda: Twilight Princess HD")
      game.totalScore += tpScore;
    if (game.name === "Day of the Tentacle")
      game.totalScore += dayoftentacleScore;
    if (game.name === "The Elder Scrolls V: Skyrim")
      game.totalScore += skyrimScore;
    if (game.name === "Monster Hunter 4") game.totalScore += mhfourScore;
    if (
      game.name === "Tony Hawk's Pro Skater" ||
      game.name === "Tony Hawk's Pro Skater 2"
    )
      game.totalScore += thoneandtwoScore;
    if (game.name === "Demon's Souls") game.totalScore += dsremakeScore;
    if (game.name === "Virtua Fighter 5") game.totalScore += vf5Score;
  }

  return gameArr;
}
