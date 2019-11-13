from app import api
from flask import make_response, jsonify, request
from util.request_handling import get_request_args,get_header
from flask_restplus import abort, Resource
from util.db_handling import query_db

search = api.namespace('search', description="search Services")


@search.route('/hotel', strict_slashes=False)
@search.response(200, 'success')
@search.response(404, 'Missing args')
@search.response(403, 'Errors')
class Search(Resource):

    @search.param('location', 'The room type user required')
    @search.doc(description='For the search function we do not require token, just use the API. \n ')
    def get(self):
        location = get_request_args('location', str)
        location_math = '%'+location.upper()+'%'

        res = query_db(" SELECT * FROM Hotels h WHERE upper(h.hotel_address) like '%s' " % location_math)
        for r in res:
            r['img_url'] = query_db("SELECT url FROM Hotels_img WHERE hotel_id = '%s'" % r['hotel_id'])

        return make_response(jsonify({'res': res}), 200)


@search.route('/room', strict_slashes=False)
@search.response(200, 'success')
@search.response(404, 'Missing args')
@search.response(403, 'Errors')
class Room(Resource):

    @search.param('hotel_id', 'The room type user required')
    @search.doc(description='Get the hotels details and rooms info\n ')
    def get(self):
        hotel_id = get_request_args('hotel_id', str, required=True)
        hotel = query_db("SELECT * FROM Hotels WHERE hotel_id = '%s'" % hotel_id)
        img_url = query_db("SELECT url FROM Hotels_img WHERE hotel_id = '%s'" % hotel_id)
        hotel[0]['img_url'] = img_url

        rooms = query_db("SELECT * FROM Rooms WHERE hotel_id = '%s'" % hotel_id)
        for room in rooms:
            room['img_url'] = query_db("SELECT * FROM Rooms_img WHERE room_id = '%s'" % room['room_id'])

        hotel[0]['rooms'] = rooms

        return make_response(jsonify({"res": hotel[0]}), 200)


booking = api.namespace('booking', description="Booking Services")


# for check the token
def check_user(token):
    user = query_db("SELECT * FROM User WHERE token = '%s'" % token)
    if len(user) == 0:
        abort(400, 'Incorrect token, please login')

    return user


# check whether can booking with the checkin date
def check_date(start_date, end_date, bookings):
    pass


@booking.route('/', strict_slashes=False)
@booking.response(200, 'success')
@booking.response(404, 'Missing args')
@booking.response(403, 'Errors')
class Booking(Resource):

    @booking.doc(description='Get the booking history according to booking id')
    @booking.param('booking_id', 'Get the booking details according to booking id')
    def get(self):
        booking_id = get_request_args('booking_id', str)

        history = query_db("SELECT * FROM Booking WHERE booking_id = '%s' " % booking_id)

        return make_response(jsonify({"history": history}), 200)

    @booking.doc(description='Make a booking')
    @booking.param('hotel_id', 'hotel id for user booking')
    @booking.param('token', 'The user\'s token')
    @booking.param('name', 'The user\'s booking name')
    @booking.param('passport', 'The user\'s passport')
    @booking.param('booking_date', 'The booking date')
    @booking.param('check_in_date', 'The check in date')
    @booking.param('days', 'The days of user booking')
    @booking.param('price', 'The total price of booking')
    @booking.param('comment', 'The user comment')
    def post(self):
        # get all the args first
        username = ''
        hotel_id = get_request_args('hotel_id', str)
        token = get_request_args('token', str, required=False)
        name = get_request_args('name', str)
        passport = get_request_args('passport', str)
        booking_date = get_request_args('booking_date', str)
        check_in_date = get_request_args('check_in_date', str)
        days = get_request_args('days', str)
        price = get_request_args('price', str)
        comment = get_request_args('comment', str)

        # if the token is not none, we can get the user name
        if token is not None:
            user = query_db("SELECT username FROM User WHERE token='%s'" % token)
            username = user[0]['username']

        # next step is check whether the date is valid
        print(username)
        pass

    @booking.doc(description='Update booking')
    def put(self):
        pass

    @booking.doc(description='Cancel booking')
    @booking.param('booking_id', 'Cancel the selected id')
    def delete(self):
        booking_id = get_request_args('booking_id', str)
        query_db("DELETE FROM Booking WHERE booking_id = '%s'" % booking_id)

        return make_response(jsonify({"res": "success"}), 200)

