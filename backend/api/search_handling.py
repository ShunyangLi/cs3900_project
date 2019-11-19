import json
import os
import datetime
from app import api
from flask import make_response, jsonify
from util.request_handling import get_request_args
from flask_restplus import abort, Resource
from util.db_handling import query_db

search = api.namespace('search', description="search Services")


@search.route('/hotel', strict_slashes=False)
@search.response(200, 'success')
@search.response(404, 'Missing args')
@search.response(403, 'Errors')
class SearchHotel(Resource):

    @search.param('location', 'The room type user required')
    @search.doc(description='For the search function we do not require token, just use the API. \n ')
    def get(self):
        location = get_request_args('location', str)
        location_math = '%'+location.upper()+'%'

        res = query_db(" SELECT * FROM Hotels h WHERE upper(h.hotel_address) like '%s' " % location_math)
        for r in res:
            price = query_db("SELECT min(price) as price FROM Rooms WHERE hotel_id='%s'" % r['hotel_id'])
            r['img_url'] = query_db("SELECT url FROM Hotels_img WHERE hotel_id = '%s'" % r['hotel_id'])
            r['min_price'] = price[0]['price']

        return make_response(jsonify({'res': res}), 200)


@search.route('/room', strict_slashes=False)
@search.response(200, 'success')
@search.response(404, 'Missing args')
@search.response(403, 'Errors')
class SearchRoom(Resource):

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


def extract_date(date):
    """
    convert the string into date type
    :param date: the string type date
    :return: date type
    """
    d = datetime.datetime.strptime(date, '%Y-%m-%d')
    d = d.date()
    return d


# check whether can booking with the checkin date
def check_date(start_date, end_date, bookings):
    """
    Check whether available for this rooms.
    Compare all the room's booking
    :param start_date: start date of booking
    :param end_date: end date of booking
    :param bookings: all the bookings about this room
    :return:
    """
    start = extract_date(start_date)
    end = extract_date(end_date)
    vacant = False

    for b in bookings:
        bStart = extract_date(b['checkin_date'])
        bEnd = extract_date(b['checkout_date'])
        if end < bStart:
            vacant = True
        elif start > bEnd:
            vacant = True
        else:
            return False

    if vacant is True:
        return True

    return False


check_availability = api.namespace('check/availability', description="Check availability Services")


@check_availability.route('/', strict_slashes=False)
class CheckAvailability(Resource):

    @check_availability.doc(description='Check the availability')
    @check_availability.param('hotel_id', 'The hotel id which need to search')
    @check_availability.param('check_in', 'Check in date')
    @check_availability.param('check_out', 'Check out date')
    @check_availability.param('adult', 'Adults number')
    @check_availability.param('children', 'Children number')
    def post(self):
        hotel_id = get_request_args('hotel_id', str)
        check_in = get_request_args('check_in', str)
        check_out = get_request_args('check_out', str)
        adult = get_request_args('adult', str)
        children = get_request_args('children', str)
        res = []
        rooms = query_db("SELECT * FROM Rooms WHERE hotel_id='%s'" % hotel_id)

        for room in rooms:
            bookings = query_db("SELECT * FROM Booking WHERE room_id='%s'" % rooms['room_id'])

            if int(adult) > int(room['adults']) or int(children) > int(room['children']):
                continue

            if len(bookings) == 0:
                res.append(room)
            else:
                if check_date(check_in, check_out, bookings):
                    res.append(room)

        return make_response(jsonify(res=res), 200)


