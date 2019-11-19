import time
import datetime
from app import api
from util.mail_handling import send_mail
from flask import make_response, jsonify, request
from util.request_handling import get_request_args,get_header, format_str
from flask_restplus import abort, Resource
from util.db_handling import query_db


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


booking = api.namespace('booking', description="Booking Services")


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
    @booking.param('room_id', 'hotel id for user booking')
    @booking.param('name', 'The user\'s booking name')
    @booking.param('email', 'The user\'s passport')
    @booking.param('check_in', 'The check in date')
    @booking.param('check_out', 'The days of user booking')
    @booking.param('price', 'The total price of booking')
    @booking.param('comment', 'The user comment')
    def post(self):
        # get all the args
        room_id = get_request_args('room_id', str)
        name = get_request_args('name', str)
        email = get_request_args('email', str)
        check_in = get_request_args('check_in', str)
        check_out = get_request_args('check_out', str)
        price = get_request_args('price', str)
        comment = format_str(get_request_args('comment', str))

        # get the booking id according to timestamp
        booking_id = int(time.time())

        # get the current date of booking
        current_date = datetime.datetime.now().strftime("%Y-%m-%d")

        query_db("""INSERT INTO Booking (booking_id, username, name, hotel_id, room_id, email, 
        booking_date, check_in_date, check_out_date, price, comment)
        VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s',' %s', '%s');"""
                 % (booking_id, '', name, '', room_id, email, current_date, check_in, check_out, price, comment))

        booking_info = query_db("SELECT * FROM Booking WHERE booking_id='%s'" % booking_id)

        # send the email with booking information
        send_mail(email, 'Your booking information', 'booking', info=booking_info[0])
        return make_response(jsonify(res='success'), 200)

    @booking.doc(description='Cancel booking')
    @booking.param('booking_id', 'Cancel the selected id')
    def delete(self):
        booking_id = get_request_args('booking_id', str)
        query_db("DELETE FROM Booking WHERE booking_id = '%s'" % booking_id)

        return make_response(jsonify({"res": "success"}), 200)


chatbox_booking = api.namespace('chatbox-booking', description="Booking for chat box services")


@chatbox_booking.route('/', strict_slashes=False)
class ChatboxBooking(Resource):
    @chatbox_booking.doc(description='Booking for chat box')
    @chatbox_booking.param('hotel_id', 'hotel id for user booking')
    @chatbox_booking.param('name', 'The user\'s booking name')
    @chatbox_booking.param('email', 'The user\'s passport')
    @chatbox_booking.param('check_in', 'The check in date')
    @chatbox_booking.param('check_out', 'The days of user booking')
    @chatbox_booking.param('price', 'The total price of booking')
    @chatbox_booking.param('comment', 'The user comment')
    def post(self):
        # get all the args
        hotel_id = get_request_args('hotel_id', str)
        name = get_request_args('name', str)
        email = get_request_args('email', str)
        check_in = get_request_args('check_in', str)
        check_out = get_request_args('check_out', str)
        price = get_request_args('price', str)
        comment = format_str(get_request_args('comment', str))

        # get the booking id according to timestamp
        booking_id = int(time.time())

        # get the current date of booking
        current_date = datetime.datetime.now().strftime("%Y-%m-%d")

        query_db("""INSERT INTO Booking (booking_id, username, name, hotel_id, room_id, email, 
        booking_date, check_in_date, check_out_date, price, comment)
        VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s',' %s', '%s');"""
                 % (booking_id, '', name, hotel_id, '', email, current_date, check_in, check_out, price, comment))

        booking_info = query_db("SELECT * FROM Booking WHERE booking_id='%s'" % booking_id)

        # send the email with booking information
        send_mail(email, 'Your booking information', 'booking', info=booking_info[0])
        return make_response(jsonify(res='success'), 200)

    @chatbox_booking.doc(description='Cancel booking')
    @chatbox_booking.param('booking_id', 'Cancel the selected id')
    def delete(self):
        booking_id = get_request_args('booking_id', str)
        query_db("DELETE FROM Booking WHERE booking_id = '%s'" % booking_id)

        return make_response(jsonify({"res": "success"}), 200)

