from app import api
from flask import make_response, jsonify, request
from util.request_handling import get_request_args,get_header
from flask_restplus import abort, Resource
from util.db_handling import query_db

booking = api.namespace('booking', description="Booking Services")


# for check the token
def check_user(token):
    """
    according to token, get the user's details
    :param token: the token arg
    :return: the user's information from database
    """
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
@booking.expect(booking.parser().add_argument('Authorization', "Your Authorization Token in the form 'Token <AUTH_TOKEN>'",
                                        location='headers'))
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

