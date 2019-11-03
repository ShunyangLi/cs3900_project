from app import api
from flask import make_response, jsonify, request
from util.request_handling import get_request_args,get_header
from flask_restplus import abort, Resource
from util.db_handling import query_db

manage = api.namespace('hotel-management', description="Hotel management services")

"""
This API is for manage the hotel of the host
User need to pass the token
GET method is for getting all the hotel info
POST method is add a new hotel
PUT method is update hotel
DELETE method is delete the hotel
"""


@manage.route('/')
@manage.response(200, 'Success')
@manage.response(400, 'Missing args')
@manage.expect(manage.parser().add_argument('Authorization', "Your Authorization Token in the form 'Token <AUTH_TOKEN>'",
                                        location='headers'))
class Manage(Resource):

    @manage.doc(description="You can get all your hotel info through this API")
    def get(self):
        # get the user's token firstly
        token = get_header(request)
        user = query_db("SELECT * FROM User WHERE token = '%s'" % token)
        if len(user) == 0:
            abort(400, 'Incorrect token, please login')

        hotels = query_db("SELECT * FROM Hotel WHERE host = '%s'" % user[0]['username'])
        res = {
            'code': 0,
            'msg': '',
            'count': len(hotels),
            'data': hotels
        }

        return make_response(jsonify(res), 200)

    @manage.doc(description="You can add new hotel through this API")
    def post(self):
        # check the token
        token = get_header(request)
        user = query_db("SELECT * FROM User WHERE token = '%s'" % token)
        if len(user) == 0:
            abort(400, 'Incorrect token, please login')

        # then we need get other params

        pass

    def put(self):
        pass

    def delete(self):
        pass
