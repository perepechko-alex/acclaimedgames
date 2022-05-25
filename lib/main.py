from db import create_all_tables, create_connection
from import_csv import import_csv_goat, import_csv_goty
from goat import get_goat, write_final_results, write_to_csv
from write_metadata import write_game_metadata

create_all_tables(create_connection())
import_csv_goat()
import_csv_goty()
write_final_results(get_goat())
write_game_metadata()
write_to_csv()
