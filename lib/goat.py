from decimal import Decimal
from db import create_connection
from operator import itemgetter
from pprint import pprint


def get_goat():
    game_list: list[dict] = []
    conn = create_connection()
    query = '''SELECT name, SUM(weightedpoints) weightedpoints, COUNT(*) numoflists, ROUND(AVG(listyear) - 0.5) avglistyear
            FROM goat
            GROUP BY name'''
    cursor = conn.cursor()
    cursor.execute(query)
    rows = cursor.fetchall()
    for row in rows:
        game_list.append({
            'name': row[0],
            'total_score': row[1],
            'num_of_lists': row[2],
            'avg_list_year': row[3]
        })
    return game_list


def set_game_rankings(game_list):
    rank_count: int = 1
    tmp_game: dict = {}
    ranked_game_list: list[dict] = []

    for game in game_list:
        tmp_num_of_lists: str = tmp_game.get('num_of_lists')
        tmp_total_score: Decimal = tmp_game.get('total_score')
        tmp_avg_list_year: int = tmp_game.get('avg_list_year')
        name, total_score, num_of_lists, avg_list_year = itemgetter('name', 'total_score',
                                                                    'num_of_lists', 'avg_list_year')(game)

        if tmp_num_of_lists == game['num_of_lists'] and tmp_total_score == game['total_score'] \
                and tmp_avg_list_year == game['avg_list_year']:
            tmp_game = {
                'num_of_lists': num_of_lists,
                'total_score': total_score,
                'avg_list_year': avg_list_year
            }
            ranked_game_list.append({
                'final_rank': rank_count - 1,
                'name': name,
                'total_score': total_score,
                'num_of_lists': num_of_lists,
                'avg_list_year': avg_list_year
            })
        else:
            tmp_game = {
                'num_of_lists': num_of_lists,
                'total_score': total_score,
                'avg_list_year': avg_list_year
            }
            ranked_game_list.append({
                'final_rank': rank_count,
                'name': name,
                'total_score': total_score,
                'num_of_lists': num_of_lists,
                'avg_list_year': avg_list_year
            })
            rank_count += 1
    return ranked_game_list


def write_final_results(game_list):
    sorted_game_list: list[dict] = sorted(game_list,
                                          key=lambda i: (i['total_score'], i['num_of_lists'], i['avg_list_year']),
                                          reverse=True)
    ranked_game_list: list[dict] = set_game_rankings(sorted_game_list)
    INSERT_FINAL_RESULTS: str = '''INSERT OR REPLACE INTO finalResults(rank, name, totalscore, numoflists, avglistyear) VALUES (?, ?, ?, ?, ?)'''

    batch = []
    for game in ranked_game_list:
        final_rank, name, total_score, num_of_lists, avg_list_year = itemgetter('final_rank', 'name',
                                                                  'total_score', 'num_of_lists', 'avg_list_year')(game)
        batch.append((final_rank, name, total_score, num_of_lists, avg_list_year))

        if len(batch) >= 100:
            conn = create_connection()
            cursor = conn.cursor()
            cursor.executemany(INSERT_FINAL_RESULTS, batch)
            batch = []
            conn.commit()
            cursor.close()
    if len(batch) > 0:
        conn = create_connection()
        cursor = conn.cursor()
        cursor.executemany(INSERT_FINAL_RESULTS, batch)
        conn.commit()
        cursor.close()

write_final_results(get_goat())
