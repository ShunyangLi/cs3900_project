"""
handle args from post and get
should also have put, delete and so on
"""
from flask import request
from flask_restful import reqparse
from flask_restplus import abort


# handle post method
def get_post_args(arg_name, arg_type):
    parser = reqparse.RequestParser()
    parser.add_argument(arg_name, type=arg_type)
    args = parser.parse_args()

    res = args.get(arg_name)

    if res is None:
        abort(400, "Missing args")

    return res


# handle get method
def get_get_args(arg_name):
    res = request.args.get(arg_name)

    if res is None:
        abort(400, "Missing args")

    return res
