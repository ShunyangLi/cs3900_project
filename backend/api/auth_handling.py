from app import api
from flask import make_response, jsonify, request
from util.request_handling import get_request_args,get_header
from flask_restplus import abort, Resource
from util.db_handling import query_db
from util.mail_handling import send_mail
from util.auth import generate_activate_token, check_token, get_token

auth = api.namespace('auth', description="Authentication Services")


@auth.route("/login", strict_slashes=False)
class Login(Resource):

    @auth.response(200, 'Success')
    @auth.response(400, 'Missing args')
    @auth.response(403, 'Not register')
    @auth.param('password', 'Password of user')
    @auth.param('username', 'Username of user')
    @auth.doc(description="Please enter username and password. "
                          "If the username and password correct, a token will be returned")
    def post(self):
        username = get_request_args("username", str)
        password = get_request_args("password", str)

        # if can not find the user's information
        res = query_db("SELECT confirm FROM User WHERE username = '%s'" % username)
        if len(res) == 0:
            abort(403, 'Not register')
        else:
            # if the user already register, bu not activate
            if res[0]["confirm"] == 'False':
                abort(403, 'Register but not activate')

            # if username or password not correct
            res = query_db("SELECT * FROM User WHERE username = '%s' AND password = '%s'" % (username, password))
            if len(res) == 0:
                abort(403, 'Username or password not correct!')

            # username and password was correct, and then generate the token for user, and return the token
            token = get_token()
            query_db("UPDATE User SET token = '%s' WHERE username = '%s'" % (token, username))
            return make_response(jsonify({"message": "success", "token": token}), 200)


@auth.route("/close", strict_slashes=False)
class Delete(Resource):
    @auth.response(200, 'Success')
    @auth.response(400, 'Missing Username/Password')
    @auth.response(403, 'Error')
    @auth.param('password', 'Password of user')
    @auth.param('username', 'Username of user')
    @auth.doc(description="Close your account.")
    def delete(self):
        username = get_request_args("username", str)
        password = get_request_args("password", str)

        res = query_db("SELECT confirm FROM User WHERE username = '%s'" % username)
        if len(res) == 0:
            abort(403, 'Not register')

        res = query_db("SELECT * FROM User WHERE username = '%s' AND password = '%s'" % (username, password))
        if len(res) == 0:
            abort(403, 'Username or password not correct!')

        query_db("DELETE FROM User WHERE username = '%s'" % username)
        return make_response(jsonify({"message": "success"}), 200)


@auth.route('/signup', strict_slashes=False)
class Register(Resource):

    @auth.response(200, 'Success')
    @auth.response(400, 'Missing args')
    @auth.response(403, 'Already register')
    @auth.param('type', 'Type of user. Individual or Enterprise')
    @auth.param('birthday', 'The birthday of user')
    @auth.param('last_name', 'The last name of user')
    @auth.param('first_name', 'The first name of user')
    @auth.param('password', 'Password of user')
    @auth.param('username', 'Username of user. The username should be email.')
    @auth.doc(description="Please enter username, password and type for signup,")
    def post(self):
        email = get_request_args("username", str)
        password = get_request_args("password", str)
        first_name = get_request_args("first_name", str)
        last_name = get_request_args("last_name", str)
        birthday = get_request_args("birthday", str)
        user_type = get_request_args("type", str)

        # if can find the user, that means already register
        res = query_db("SELECT * FROM User WHERE username = '%s'" % email)
        if len(res) != 0:
            abort(403, 'Already register')

        # otherwise insert into database and send activate email
        query_db("INSERT INTO User(username, password, first_name, last_name, birthday, user_type, confirm, token)"
                 "VALUES (?,?,?,?,?,?,?,?)",
                 (email, password, first_name, last_name, birthday,user_type, 'False', ''))

        token = generate_activate_token(email, expires_in=3600)
        # TODO when you testing, just do not send mail, just print the token, run in api page
        url = 'http://127.0.0.1:4200/activate/' + token.decode("utf-8")
        send_mail(email, 'Activate your account', 'activate', action_url=url)
        return make_response(jsonify({"message": "success"}), 200)

# this is for activate your account
@auth.route('/activate', strict_slashes=False)
class Activate(Resource):

    @auth.response(200, 'Success')
    @auth.response(400, 'Missing args')
    @auth.response(403, 'Your email already activate!')
    @auth.param('token', 'The token which send to user')
    @auth.doc(description="This is for activate your account.")
    def post(self):
        token = get_request_args("token", str)
        check_token(token)
        return make_response(jsonify({"status": "success"}), 200)


# this is for already register, but not activate successfully
@auth.route('/send', strict_slashes=False)
class Send(Resource):

    @auth.response(200, 'Success')
    @auth.response(400, 'Missing args')
    @auth.response(403, 'Your email already activate!')
    @auth.param('username', 'Username of user. The username should be email.')
    @auth.doc(description="Please enter your email, and then a confirm email will be sent.")
    def post(self):
        email = get_request_args("username", str)

        # check whether activate
        res = query_db("SELECT confirm FROM User WHERE username = '%s'" % email)
        if len(res) == 0:
            abort(403, 'Not signup')
        else:
            if res[0]['confirm'] == 'False':
                token = generate_activate_token(email)
                # TODO when you testing, just do not send mail, just print the token, run in api page
                url = 'http://127.0.0.1:4200/activate/' + token.decode("utf-8")
                send_mail(email, 'Activate your account', 'activate', action_url=url)
            else:
                abort(403, 'Your email already activate!')

        return make_response(jsonify({"status": "success"}), 200)


# get the user profile and update profile
@auth.route('/profile', strict_slashes=False)
class Profile(Resource):

    @auth.response(200, 'Success')
    @auth.response(400, 'Missing args')
    @auth.response(403, 'Token incorrect')
    # @auth.param('token', 'The user\'s token!')
    @auth.expect(auth.parser().add_argument('Authorization', "Your Authorization Token in the form 'Token <AUTH_TOKEN>'", location='headers'))
    @auth.doc(description="Get the user profile information")
    def get(self):
        token = get_header(request)

        # check whether have the user and check token
        res = query_db("SELECT username, first_name, last_name, birthday, avatar, password FROM User WHERE token = '%s'"
                       % token)

        if len(res) == 0:
            abort(403, 'Token incorrect')

        # get the booking history
        history = query_db("SELECT * FROM Booking WHERE booking_id in "
                           "(SELECT booking_id FROM User_booking WHERE username = '%s')" %(res[0]['username']))

        res[0]['history'] = history

        return make_response(jsonify({"profile": res[0]}), 200)

    @auth.response(200, 'Success')
    @auth.response(400, 'Missing args')
    @auth.response(403, 'Token incorrect')
    @auth.expect(auth.parser().add_argument('Authorization', "Your Authorization Token in the form 'Token <AUTH_TOKEN>'", location='headers'))
    @auth.param('password', 'New password of user')
    @auth.param('first_name', 'First name')
    @auth.param('last_name', 'Last name')
    @auth.param('birthday', 'Birthday')
    @auth.param('img', 'User avatar')
    @auth.doc(description="Update user profile")
    def put(self):
        # we not allow the user to change type
        token = get_header(request)

        res = query_db("SELECT username, first_name, last_name, birthday FROM User WHERE token = '%s'"
                       % token)

        if len(res) == 0:
            abort(403, 'Token incorrect')

        first_name = get_request_args('first_name', str)
        last_name = get_request_args('last_name', str)
        birthday = get_request_args('birthday', str)
        img = get_request_args('img', str)
        password = get_request_args('password', str)

        # this is reset the user profile which include avatar
        query_db("UPDATE User SET first_name = '%s', last_name='%s', birthday='%s', avatar='%s', password='%s' WHERE token = '%s'"
                 %(first_name,last_name,birthday,img,password, token))

        # return the latest info
        res = query_db("SELECT username, first_name, last_name, birthday, avatar, password FROM User WHERE token = '%s'"
                       % token)

        return make_response(jsonify({"profile": res[0]}), 200)

