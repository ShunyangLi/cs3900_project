import secrets
from app import app
from util.db_handling import *
from flask_restplus import abort
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer


# generate confirm email token according to email id
# and expires time is 3600 seconds
def generate_activate_token(email, expires_in=3600):
    s = Serializer(app.config['SECRET_KEY'], expires_in=expires_in)
    return s.dumps({'email': email})


# check confirm email token
def check_token(token):
    s = Serializer(app.config['SECRET_KEY'])

    try:
        data = s.loads(token)
        email = data.get('email')
        # if can not find the user
        res = query_db("SELECT confirm FROM User WHERE username = '%s'" % email)
        if len(res) == 0:
            abort(403, 'Already register')
        else:
            if res[0]['confirm'] == 'False':
                query_db("UPDATE User SET confirm = 'True' WHERE username = '%s'" % email)
            else:
                abort(403, 'Your email already activate!')
    except:
        abort(400, 'Token expired.')


# after login get the token
def get_token():
    return secrets.token_hex(32)