import sqlite3

conn = sqlite3.connect('./data/out/ggoat.db')


def create_final_results_table():
    conn.execute('DROP TABLE IF EXISTS "finalResults"')
    conn.execute('''CREATE TABLE IF NOT EXISTS "finalResults" (
      "rank"	INTEGER,
      "name"	TEXT NOT NULL,
      "totalscore"	NUMERIC NOT NULL,
      "numoflists" INTEGER NOT NULL,
      "avglistyear" INTEGER,
      PRIMARY KEY("rank","name"),
      FOREIGN KEY("name") REFERENCES "game_metadata"("name")
    )''')


def create_views():
    conn.execute('''CREATE VIEW IF NOT EXISTS results_with_metadata AS
      SELECT finalResults.rank, finalResults.name, finalResults.totalScore, finalResults.numOfLists, finalResults.avgListYear, game_metadata.releasedate, game_metadata.platforms, game_metadata.developers FROM finalResults
      INNER JOIN game_metadata ON finalResults.name = game_metadata.name
      ORDER BY CASE WHEN finalResults.rank IS NULL THEN 1 ELSE 0 END, finalResults.rank''')
    conn.execute('''CREATE VIEW IF NOT EXISTS results_with_metadata_1000 AS
      SELECT finalResults.rank, finalResults.name, finalResults.totalScore, finalResults.numOfLists, finalResults.avgListYear, game_metadata.releasedate, game_metadata.platforms, game_metadata.developers FROM finalResults
      INNER JOIN game_metadata ON finalResults.name = game_metadata.name  WHERE finalResults.rank <= 1000
      ORDER BY CASE WHEN finalResults.rank IS NULL THEN 1 ELSE 0 END''')


def create_tables():
    conn.execute('''CREATE TABLE IF NOT EXISTS "game_metadata" (
      "name"	TEXT NOT NULL,
      "releasedate"	TEXT,
      "platforms"	TEXT,
      "developers" TEXT,
      "genre" TEXT,
      PRIMARY KEY("name"))''')
    conn.execute('DROP TABLE IF EXISTS "goat"')
    conn.execute('''CREATE TABLE IF NOT EXISTS "goat" (
        "filename"	TEXT NOT NULL,
        "listyear"	TEXT NOT NULL,
        "publication"	TEXT NOT NULL,
        "listtype" TEXT NOT NULL,
        "rank"	INTEGER,
        "name"	TEXT NOT NULL,
        "weightedpoints"	TEXT NOT NULL,
        "isranked"	INTEGER NOT NULL,
        "notes" TEXT,
        PRIMARY KEY("filename","weightedpoints","name","publication", "listyear", "rank"),
        FOREIGN KEY("name") REFERENCES "game_metadata"("name"))''')


create_tables()
create_final_results_table()
create_views()
