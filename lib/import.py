import csv, db, re

GOAT_DIR: str = "./data/in/goat"
GOTY_DIR: str = "./data/in/goty"
YEAR_RE = re.compile('/[0-9]{4}/')
PUB_RE = re.compile('/.*-(.*).csv/')
GOAT_RE = re.compile('/GOAT/')
GOTY_RE = re.compile('/GOTY/')
list_rank: int = 0
publication: str = ""
name: str = ""
publication: str = ""
listType: str = ""
notes: str = ""
params = []
OVERRIDE: bool = False

def importCsvGoatData():
  with open(GOAT_DIR) as csv_file:
    csv_read=csv.reader(csv_file, delimiter=',')
