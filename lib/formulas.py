from datetime import datetime
from decimal import *
from typing import Union


def goat_calc(list_date: int, list_rank: Union[int, None], is_ranked: int, base_value: float):
    current_date: int = datetime.now().year
    date_diff: int = current_date - list_date
    date_cutoff: int = 10

    one_dec: Decimal = Decimal(1)
    base_value_dec: Decimal = Decimal(base_value)

    date_points: Decimal = Decimal(date_diff) / Decimal(date_cutoff)
    point_calc: Union[int, Decimal] = 0

    if is_ranked == 1:
        rank_points: Decimal = one_dec / Decimal(list_rank)
        if 0 < date_diff <= date_cutoff:
            if list_rank != 1:
                point_calc = base_value_dec + (one_dec - date_points) + rank_points
            else:
                point_calc = base_value_dec + (Decimal(2) - date_points)

        if date_diff == 0:
            if list_rank != 1:
                point_calc = base_value_dec + one_dec + rank_points
            else:
                point_calc = base_value_dec + Decimal(2)

        if date_diff > date_cutoff:
            if list_rank != 1:
                point_calc = base_value_dec + rank_points * (one_dec / Decimal(date_diff))
            else:
                point_calc = base_value_dec + (one_dec / Decimal(date_diff))

    else:
        if 0 < date_diff <= date_cutoff:
            point_calc = base_value_dec + (one_dec - date_points)
        if date_diff == 0:
            point_calc = base_value_dec + one_dec
        if date_diff > date_cutoff:
            point_calc = base_value_dec + (one_dec / Decimal(date_diff))

    return point_calc


def goty_calc(list_rank):
    base_value: Decimal = Decimal(0.9)

    if list_rank != 1 and list_rank != 'Unranked' and list_rank is not None:
        points: Decimal = Decimal(1) / (Decimal(list_rank) * Decimal(10))
        return base_value + points
    elif list_rank == 'Unranked':
        return base_value
    else:
        return Decimal(1)
