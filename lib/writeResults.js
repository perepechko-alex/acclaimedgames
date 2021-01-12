import { otherGames } from "./gameNameMappings.js";
import { populateFinalResults } from "./goat.js";

export async function writeFinalResults(gameArr) {
  let rankCount = 1;

  gameArr = gameArr.sort((a, b) => (a.totalScore > b.totalScore ? -1 : 1));

  for (let game of gameArr) {
    if (!otherGames.includes(game.name)) {
      game.finalRank = rankCount;
      rankCount++;
    } else {
      game.finalRank = 900000;
    }
  }
  populateFinalResults(gameArr);
}
