from app import api
from flask import make_response, jsonify, request
from util.request_handling import get_request_args,get_header
from flask_restplus import abort, Resource
from util.db_handling import query_db

booking = api.namespace('booking', description="Booking Services")


@booking.route('/search', strict_slashes=False)
class Search(Resource):

    @booking.response(200, 'success')
    @booking.response(404, 'Missing args')
    @booking.response(403, 'Errors')
    @booking.param('location', 'The room type user required')
    @booking.param('room_type', 'The room type user required')
    @booking.doc(description='For the search function we do not require token, just use the API. \n '
                         'But booking require the token')
    def get(self):
        room_type = get_request_args('room_type', str).upper()
        location = get_request_args('location', str)
        location_math = '%'+location.upper()+'%'

        res = query_db("""
        SELECT h.id, h.name, h.phone, h.location, h.email, h.price, h.web, h.description, h.host,
        h.room_type, h.bathrooms, h.bedrooms FROM Hotel h WHERE upper(h.room_type) ='%s' AND upper(h.location) like '%s' """
                       % (room_type, location_math))

        for r in res:
            r['img_url'] = query_db("SELECT url FROM Hotel_img WHERE hotel_id = '%s'" % r['id'])

        # print(res)
        return make_response(jsonify({'res': res}), 200)
