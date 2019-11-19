import json
from app import api
from flask import make_response, jsonify
from util.request_handling import get_request_args, format_str
from flask_restplus import abort, Resource
from util.db_handling import query_db

review = api.namespace('hotel-review', description="Hotel review Services")


@review.route('/', strict_slashes=False)
@review.param('hotel_id')
@review.response(200, 'success')
@review.response(404, 'Missing args')
@review.response(403, 'Errors')
class Review(Resource):

    @review.doc(description='Get all the hotel review')
    def get(self):
        hotel_id = get_request_args('hotel_id', str)
        r = query_db("SELECT * FROM Hotels_review WHERE hotel_id='%s'" % hotel_id)

        return make_response(jsonify(res=r), 200)

    @review.doc(description='Add review into hotel review')
    @review.param('review_info', 'The review info')
    def post(self):
        hotel_id = get_request_args('hotel_id', str)
        review_info = get_request_args('review_info', str)
        review_info = format_str(review_info)

        query_db("INSERT INTO Hotels_review VALUES (hotel_id, review) VALUES ('%s', '%s')" % (hotel_id, review_info))

        return make_response(jsonify(res='success'), 200)
