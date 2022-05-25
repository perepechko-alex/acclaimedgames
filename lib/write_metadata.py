from db import create_connection

conn = create_connection()


def write_game_metadata():
    cursor = conn.cursor()
    cursor.execute('SELECT DISTINCT name from goat')
    game_names = cursor.fetchall()
    cursor.executemany('INSERT OR IGNORE INTO game_metadata(name) VALUES (?)', game_names)
    conn.commit()
    cursor.close()

