import os
from app import app
import api.auth_handling
import api.chat_handling


@app.route('/cleanDB')
def clean():
    c = 'rm util/data.sqlite'
    os.system(c)
    init = 'sqlite3 util/data.sqlite < util/init_database.sql'
    os.system(init)
    return "success"


if __name__ == '__main__':
    app.run(port=8000, debug=True, host='127.0.0.1')
