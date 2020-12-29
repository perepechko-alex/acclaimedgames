export function goatCalc(listDate, listRank, isRanked) {
  const currentDate = new Date().getFullYear();
  const dateDiff = currentDate - listDate;
  const dateCutoff = 10;
  const baseValue = 1;
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
  if (listRank != 1) pointCalc = baseValue + 1 / (listRank * 10);
  else pointCalc = 1;
  return pointCalc;
}
