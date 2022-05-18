import os
import requests

headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer {}'.format(os.getenv('IGDB_AUTH')),
    'Client-ID': os.getenv('IGDB_CLIENT_ID')
}


def get_games():
    url: str = 'https://api.igdb.com/v4/games'
    data: str = 'fields name, genres, first_release_date, platforms; limit {}; offset {};'
    limit: int = 2
    offset: int = 0
    all_games: list[dict] = []
    r = requests.post(url, data=data.format(limit, offset), headers=headers)
    all_games = all_games + [*r.json()]
    return all_games
    # print(all_games)


def format_platforms(game, platforms):
    game['platforms'] = ','.join([str(platform['name']) for platform in platforms])
    return game


def get_platforms(games):
    url: str = 'https://api.igdb.com/v4/platforms'
    data: str = 'fields name; where id = ({});'
    games_arr = []
    for game in games:
        platform_string: list[str] = [str(n) for n in game['platforms']]
        joined_string = ','.join(platform_string)
        r = requests.post(url, data=data.format(joined_string), headers=headers)
        platforms = r.json()
        games_arr.append(format_platforms(game, platforms))
    print(games_arr)


def get_formatted_games():
    get_platforms(get_games())


get_formatted_games()
