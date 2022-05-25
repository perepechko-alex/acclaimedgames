import os
import requests
from db import create_connection
from operator import itemgetter
from time import sleep
from format_data import format_year, format_companies, format_genres, format_devs, format_platforms

headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer {}'.format(os.getenv('IGDB_AUTH')),
    'Client-ID': os.getenv('IGDB_CLIENT_ID')
}


def get_all_existing_game_names():
    conn = create_connection()
    query = 'SELECT name FROM finalResults'
    cursor = conn.cursor()
    cursor.execute(query)
    return cursor.fetchall()


def update_offset(limit, offset):
    return limit + offset


def get_request(r, req_info, limit, offset, all_games=None):
    if all_games is None:
        all_games = []
    url, data = itemgetter('url', 'data')(req_info)
    if len(r.json()) > 0:
        all_games = [*r.json()]
        print(offset)
        sleep(1 / 5)
        all_games.extend(get_request(requests.post(url, data=data.format(limit, offset), headers=headers),
                                     req_info, limit, update_offset(limit, offset), all_games))
    return all_games


def get_existing_games(all_games):
    existing_game_names = get_all_existing_game_names()
    ggoat = []
    for existing_game in existing_game_names:
        # list_of_all_games = list((object['name'] for object in all_games))
        newList = list(filter(lambda x: x['name'] in existing_game[0], all_games))
        ggoat.extend(newList)
    return ggoat


def get_games(limit: int = 500, offset: int = 0):
    url: str = 'https://api.igdb.com/v4/games'
    data: str = 'fields name, genres, first_release_date, involved_companies, platforms; limit {}; offset {};'
    r = requests.post(url, data=data.format(limit, offset), headers=headers)
    all_games = get_request(r, {'url': url, 'data': data}, limit, offset)
    all_existing_games = get_existing_games(all_games)

    all_existing_games_deduped = [i for n, i in enumerate(all_existing_games) if i not in all_existing_games[n + 1:]]
    print('completed get_games')
    print(len(all_existing_games_deduped))
    return all_existing_games_deduped


def get_platforms(games):
    url: str = 'https://api.igdb.com/v4/platforms'
    data: str = 'fields name; where id = ({});'
    games_arr = []
    for game in games:
        if game.get('platforms') is not None:
            platform_string: list[str] = [str(n) for n in game['platforms']]
            joined_string = ','.join(platform_string)
            r = requests.post(url, data=data.format(joined_string), headers=headers)
            platforms = r.json()
            games_arr.append(format_platforms(game, platforms))
        else:
            games_arr.append(game)
    print('completed get_platforms')
    return games_arr


def get_genres(games):
    url: str = 'https://api.igdb.com/v4/genres'
    data: str = 'fields name; where id = ({});'
    games_arr = []
    for game in games:
        if game.get('genres') is not None:
            genre_string: list[str] = [str(n) for n in game['genres']]
            joined_string = ','.join(genre_string)
            r = requests.post(url, data=data.format(joined_string), headers=headers)
            genres = r.json()
            games_arr.append(format_genres(game, genres))
        else:
            games_arr.append(game)
    print('completed get_genres')
    return games_arr


def get_devs(games):
    involved_companies_url: str = 'https://api.igdb.com/v4/involved_companies'
    devs_url: str = 'https://api.igdb.com/v4/companies'
    involved_companies_data: str = 'fields company; where id = ({});'
    devs_data: str = 'fields name; where id = ({});'
    games_arr = []
    for game in games:
        if game.get('involved_companies') is not None:
            companies: list[str] = [str(n) for n in game['involved_companies']]
            companies_joined_string = ','.join(companies)
            sleep(1 / 5)
            companies_req = requests.post(involved_companies_url,
                                          data=involved_companies_data.format(companies_joined_string), headers=headers)
            devs_joined_string = format_companies(companies_req.json())
            # print(devs_joined_string)
            sleep(1 / 5)
            devs_req = requests.post(devs_url, data=devs_data.format(devs_joined_string), headers=headers)
            devs = devs_req.json()
            print(devs_req)
            games_arr.append(format_devs(game, devs))
        else:
            games_arr.append(game)
    print('completed get_devs')
    return games_arr


def get_formatted_games(b, c, d, e):
    def a(x):
        return b(c(d(e(x))))

    return a


get_all_games = get_formatted_games(get_platforms, get_genres, format_year, get_devs)
all_games_data = get_all_games(get_games())
print(all_games_data)
