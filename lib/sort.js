export function compareGames(a, b) {
  if (a.totalScore > b.totalScore) return -1;
  else if (a.totalScore < b.totalScore) return 1;
  else if (a.totalScore === b.totalScore && a.numberOfLists > b.numberOfLists)
    return -1;
  else if (a.totalScore === b.totalScore && a.numberOfLists < b.numberOfLists)
    return 1;
  else if (
    a.totalScore === b.totalScore &&
    a.numberOfLists === b.numberOfLists &&
    a.avgListYear > b.avgListYear
  )
    return -1;
  else if (
    a.totalScore === b.totalScore &&
    a.numberOfLists === b.numberOfLists &&
    a.avgListYear < b.avgListYear
  )
    return 1;
}
