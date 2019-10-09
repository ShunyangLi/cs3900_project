"""
handle database query
"""
import sqlite3
import os

DATABASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data.sqlite")


def connect_db():
    return sqlite3.connect(DATABASE)


"""
use query_db function to execute database language
it will return list and dictionary

e.g:
res = query_db("SELECT * FROM user")
res will return like: [{},{},{}....]
"""


def query_db(query, args=(), one=False):
    conn = connect_db()
    c = conn.cursor()
    cur = c.execute(query, args)
    rv = [dict((cur.description[idx][0], value)
               for idx, value in enumerate(row)) for row in cur.fetchall()]
    conn.commit()
    conn.close()
    return (rv[0] if rv else None) if one else rv
