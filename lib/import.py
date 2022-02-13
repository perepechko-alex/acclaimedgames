import csv
import re
import glob

GOAT_FILES: str = "./data/in/goat/**/*.csv"
GOTY_FILES: str = "./data/in/goty/**/*.csv"
YEAR_RE = re.compile('[0-9]{4}')
PUB_RE = re.compile('.*-(.*).csv')
GOAT_RE = re.compile('GOAT')
GOTY_RE = re.compile('GOTY')
list_rank: int = 0
publication: str = ""
name: str = ""
publication: str = ""
listType: str = ""
notes: str = ""
params = []
OVERRIDE: bool = False


def import_csv_goat():
    goat_files = glob.glob(GOAT_FILES, recursive=True)
    # print(goat_files)
    for files in goat_files:
        with open(files, 'r') as file:
            # filedata = file.read()
            reader = csv.DictReader(file)
            for rows in reader:
                game_data = {k: v for k, v in rows.items() if v}
                list_date = YEAR_RE.search(files)


import_csv_goat()
