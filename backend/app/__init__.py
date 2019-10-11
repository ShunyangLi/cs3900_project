"""
init flask app and api
"""

from flask import Flask
from flask_restplus import Api
from flask_cors import CORS


app = Flask(__name__, template_folder='../templates')
app.config['SECRET_KEY'] = 'hard to guess what is the key'

app.config['MAIL_SERVER'] = 'smtp.qq.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = '1479201404'
app.config['MAIL_PASSWORD'] = 'jsgejgmzucsuieed'
app.config['MAIL_DEFAULT_SENDER'] = '1479201404@qq.com'
api = Api(app)
CORS(app)
