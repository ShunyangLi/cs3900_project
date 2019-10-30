from app import api
from flask import make_response, jsonify, request
from util.request_handling import get_request_args,get_header
from flask_restplus import abort, Resource
from util.db_handling import query_db

info = api.namespace('hotel-info', description="Hotel info for map services")


@info.route('/', strict_slashes=False)
class Info(Resource):

    @info.doc(description="Get all the hotel info for map services")
    def get(self):
        hotels = query_db("SELECT id, name, location, description FROM Hotel")

        for hotel in hotels:
            imgs = query_db("SELECT url FROM Hotel_img WHERE hotel_id = '%s'" % hotel['id'])
            hotel['img'] = imgs

        return make_response(jsonify({'res': hotels}), 200)
