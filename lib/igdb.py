import os
import requests
from format_data import format_year, format_companies, format_genres, format_devs, format_platforms


headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer {}'.format(os.getenv('IGDB_AUTH')),
    'Client-ID': os.getenv('IGDB_CLIENT_ID')
}


def get_games():
    url: str = 'https://api.igdb.com/v4/games'
    data: str = 'fields name, genres, first_release_date, involved_companies, platforms; limit {}; offset {};'
    limit: int = 5
    offset: int = 0
    all_games: list[dict] = []
    r = requests.post(url, data=data.format(limit, offset), headers=headers)
    all_games = all_games + [*r.json()]
    return all_games


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
            companies_req = requests.post(involved_companies_url,
                                          data=involved_companies_data.format(companies_joined_string), headers=headers)

            devs_joined_string = format_companies(companies_req.json())
            devs_req = requests.post(devs_url, data=devs_data.format(devs_joined_string), headers=headers)
            devs = devs_req.json()
            games_arr.append(format_devs(game, devs))
        else:
            games_arr.append(game)
    return games_arr


def get_formatted_games(b, c, d, e):
    def a(x):
        return b(c(d(e(x))))

    return a


get_all_games = get_formatted_games(get_platforms, get_genres, format_year, get_devs)

print(get_all_games(get_games()))
