import random
from db_handling import query_db


def generate_rating():
    """
    Get a random rating from 0 - 5
    :return:
    """
    return int(round(random.uniform(0, 5), 1))


hotels = query_db("SELECT * FROM Hotels")

for hotel in hotels:
    query_db("UPDATE Hotels SET rating = '%s' WHERE hotel_id='%s'" % (generate_rating(), hotel['hotel_id']))


