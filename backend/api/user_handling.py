from app import api
from flask import make_response, jsonify
from util.request_handling import *
from flask_restplus import abort, Resource
from util.db_handling import query_db

login = api.namespace('login', description="User Information Services")


@login.route("/",strict_slashes=False)
class Login(Resource):

    @login.response(200, 'Success')
    @login.response(400, 'Missing Username/Password')
    @login.response(403, 'Invalid Username/Password')
    @login.response(500, 'Invalid request')
    @login.param('password', 'Password of user')
    @login.param('username', 'Username of user')
    @login.doc(description="Please enter username and password before request")
    def post(self):
        username = get_post_args("username", str)
        password = get_post_args("password", str)

        res = query_db("SELECT token FROM User WHERE username = ? AND password = ?", (username, password))

        if len(res) != 0:
            return make_response(jsonify({"message": "success"}), 200)
        else:
            abort(403, 'Invalid username/password')

    @login.response(200, 'Success')
    @login.response(400, 'Missing Username/Password')
    @login.response(403, 'Invalid Username/Password')
    @login.response(500, 'Invalid request')
    @login.param('username', 'Username of user')
    @login.doc(description="Please enter username and password before request")
    def get(self):
        return make_response(jsonify({"message": "success"}))
