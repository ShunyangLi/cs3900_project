"""
handle database query
"""
import sqlite3
import os

sqlite_database = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data.sqlite")


def connect():
    return sqlite3.connect(sqlite_database)


"""
use query_db function to execute database language
it will return list and dictionary

e.g:
res = query_db("SELECT * FROM user")
res will return like: [{},{},{}....]
"""


def query_db(query, args=(), one=False):
    conn = connect()
    c = conn.cursor()
    curs = c.execute(query, args)
    res = [dict((curs.description[idx][0], value)
               for idx, value in enumerate(row)) for row in curs.fetchall()]

    conn.commit()
    conn.close()
    return (res[0] if res else None) if one else res
