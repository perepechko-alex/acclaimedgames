export function goatCalc(listDate, listRank, isRanked, baseValue) {
  const currentDate = new Date().getFullYear();
  const dateDiff = currentDate - listDate;
  const dateCutoff = 10;
  let pointCalc = 0;
  if (isRanked) {
    if (dateDiff > 0 && dateDiff <= dateCutoff) {
      if (listRank != 1) {
        pointCalc = baseValue + (1 - dateDiff / dateCutoff) + 1 / listRank;
      } else {
        pointCalc = baseValue + (1 - dateDiff / dateCutoff) + 1;
      }
    }
    if (dateDiff === 0) {
      if (listRank != 1) {
        pointCalc = baseValue + 1 + 1 / listRank;
      } else {
        pointCalc = baseValue + 1 + 1;
      }
    }
    if (dateDiff > dateCutoff) {
      if (listRank != 1) {
        pointCalc = baseValue + (1 / listRank) * (1 / dateDiff);
      } else {
        pointCalc = baseValue + 1 / dateDiff;
      }
    }
  } else {
    if (dateDiff > 0 && dateDiff <= dateCutoff) {
      pointCalc = baseValue + (1 - dateDiff / dateCutoff);
    }
    if (dateDiff === 0) {
      pointCalc = baseValue + 1;
    }
    if (dateDiff > dateCutoff) {
      pointCalc = baseValue + 1 / dateDiff;
    }
  }
  return pointCalc;
}

export function gotyCalc(listRank) {
  const baseValue = 0.9;
  let pointCalc;
  if (listRank != 1 && listRank != "Unranked")
    pointCalc = baseValue + 1 / (listRank * 10);
  else if (listRank === "Unranked") pointCalc = baseValue;
  else pointCalc = 1;
  return pointCalc;
}

export function gotdCalc(listRank) {
  const baseValue = 1;
  let pointCalc;
  if (listRank != 1 && listRank != "Unranked")
    pointCalc = baseValue + 1 / (listRank * 2);
  else if (listRank === "Unranked") pointCalc = baseValue;
  else pointCalc = baseValue;
  return pointCalc;
}

// export function bestOfGenre(listRank) {
//   const baseValue = 1.5;
//   let pointCalc;
//   if (listRank != 1 && listRank != "Unranked")
//     pointCalc = baseValue + 1 / (listRank * 4);
//   else if (listRank === "Unranked") pointCalc = baseValue;
//   else pointCalc = baseValue;
//   return pointCalc;
// }
