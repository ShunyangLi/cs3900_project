"""
init flask app and api
"""

from flask import Flask
from flask_restplus import Api
from flask_cors import CORS


app = Flask(__name__, template_folder='../templates', static_folder='../static')
app.config['SECRET_KEY'] = 'hard to guess what is the key'

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'nomoreprojectpls@gmail.com'
app.config['MAIL_PASSWORD'] = ''
app.config['MAIL_DEFAULT_SENDER'] = 'nomoreprojectpls@gmail.com'
api = Api(app)
CORS(app)
