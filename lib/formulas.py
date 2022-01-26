from datetime import datetime
from decimal import *
from typing import Union

def goatCalc(listDate: int, listRank: Union[int, str], isRanked: bool, baseValue: float):
  CURRENT_DATE: int = datetime.now().year
  DATE_DIFF: int = CURRENT_DATE - listDate
  DATE_CUTOFF: int = 10

  ONE_DEC: Decimal = Decimal(1)
  BASE_VALUE_DEC: Decimal = Decimal(baseValue)

  DATE_POINTS: Decimal = Decimal(DATE_DIFF) / Decimal(DATE_CUTOFF)
  RANK_POINTS: Decimal = ONE_DEC / Decimal(listRank)

  pointCalc: Union[int, Decimal] = 0

  if (isRanked):
    if (DATE_DIFF > 0 and DATE_DIFF <= DATE_CUTOFF):
      if (listRank != 1):
        pointCalc = BASE_VALUE_DEC + (ONE_DEC - DATE_POINTS) + RANK_POINTS
      else:
        pointCalc = BASE_VALUE_DEC + (Decimal(2) - DATE_POINTS)

    if (DATE_DIFF == 0):
      if (listRank != 1):
        pointCalc = BASE_VALUE_DEC + ONE_DEC + RANK_POINTS
      else:
        pointCalc = BASE_VALUE_DEC + Decimal(2)
    
    if (DATE_DIFF > DATE_CUTOFF):
      if (listRank != 1):
        pointCalc = BASE_VALUE_DEC + (RANK_POINTS) * (ONE_DEC / Decimal(DATE_DIFF))
      else:
        pointCalc = BASE_VALUE_DEC + (ONE_DEC / Decimal(DATE_DIFF))

  else:
    if (DATE_DIFF > 0 and DATE_DIFF <= DATE_CUTOFF):
      pointCalc = BASE_VALUE_DEC + (ONE_DEC - DATE_POINTS)
    if (DATE_DIFF == 0):
      pointCalc = BASE_VALUE_DEC + ONE_DEC
    if (DATE_DIFF > DATE_CUTOFF):
      pointCalc = BASE_VALUE_DEC + (ONE_DEC / Decimal(DATE_DIFF))

  return pointCalc

def gotyCalc(listRank):
  BASE_VALUE: Decimal = Decimal(0.9)
  pointCalc: Decimal = BASE_VALUE

  if (listRank != 1 and listRank != 'Unranked'):
    points: Decimal = Decimal(1) / (Decimal(listRank) * Decimal(10))
    pointCalc = BASE_VALUE + points
  elif (listRank == 'Unranked'):
    return pointCalc
  else:
    pointCalc = 1
  
  return pointCalc
