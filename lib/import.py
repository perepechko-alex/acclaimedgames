import csv
import re
import glob
import os
from db import conn
from formulas import goat_calc
from typing import Union
from decimal import Decimal

GOAT_FILES: str = "./data/in/goat/**/*.csv"
GOTY_FILES: str = "./data/in/goty/**/*.csv"
YEAR_RE = re.compile('[0-9]{4}')
PUB_RE = re.compile('.*-(.*).csv')


def import_csv_goat():
    goat_files: list[str] = glob.glob(GOAT_FILES, recursive=True)
    list_type: str = 'GOAT'
    query = '''INSERT INTO goat(filename, listyear, publication, listtype, rank, name, weightedpoints, isranked, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);'''
    batch = []
    for files in goat_files:
        filename: str = os.path.basename(files)
        with open(files, 'r') as file:
            reader = csv.DictReader(file)
            for rows in reader:
                game_data: dict = {k: v for k, v in rows.items() if v}

                rank: Union[int, None] = int(game_data.get('RANK')) if type(
                    game_data.get('RANK')) is int else game_data.get('RANK')
                name: str = game_data.get('GAME')
                notes: str = game_data.get('NOTES')
                list_date: int = int(YEAR_RE.search(filename).group())
                publication: str = PUB_RE.search(filename).group(1)
                is_list_ranked: int = 1 if rank is not None else 0
                points: Decimal = goat_calc(list_date, rank, is_list_ranked, 2.0)

                goat_tuple = (
                    filename, list_date, publication, list_type, rank, name, str(points), is_list_ranked, notes)
                batch.append(goat_tuple)
                if len(batch) >= 100:
                    cursor = conn.cursor()
                    cursor.executemany(query, batch)
                    batch = []
                    conn.commit()
                    cursor.close()

    if len(batch) > 0:
        cursor = conn.cursor()
        cursor.executemany(query, batch)
        conn.commit()
        cursor.close()


import_csv_goat()
