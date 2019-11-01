import json
import os
from app import api
from flask import make_response, jsonify, request
from util.request_handling import get_request_args,get_header, get_request_file
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


@info.route('/save-file', strict_slashes=False)
class Save(Resource):

    @info.response(200, 'success')
    @info.response(403, 'Missing files')
    def post(self):
        target = 'static/files'
        if not os.path.isdir(target):
            if not os.path.isdir('static'):
                os.mkdir('static')
            os.mkdir('static/files')

        files = get_request_file('file')

        for file in files:
            filepath = "/".join([target, 'frontend.json'])
            file.save(filepath)

        return make_response(jsonify({'res': 'success'}), 200)

    @info.response(200, 'success')
    @info.response(403, 'No files')
    def get(self):

        with open('static/files/frontend.json', 'r') as f:
            data = json.load(f)

        return make_response(jsonify({'res': data}), 200)
