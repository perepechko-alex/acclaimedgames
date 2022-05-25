from datetime import datetime


def format_platforms(game, platforms):
    game['platforms'] = ','.join([str(platform['name']) for platform in platforms])
    return game


def format_genres(game, genres):
    game['genres'] = ','.join([str(genre['name']) for genre in genres])
    return game


def format_year(games):
    games_arr = []
    for game in games:
        if game.get('first_release_date') is not None:
            game['first_release_date'] = datetime.fromtimestamp(game['first_release_date']).strftime('%Y')
        games_arr.append(game)
    return games_arr


def format_devs(game, devs):
    game['involved_companies'] = ','.join([str(dev['name']) for dev in devs])
    return game


def format_companies(companies):
    companies_arr = []
    # print(companies)
    for company in companies:
        companies_arr.append(str(company.setdefault('company', 'nocomp')))
    devs_joined_string = ','.join(companies_arr)
    return devs_joined_string

