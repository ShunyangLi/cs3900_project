"""
handle args from post and get
should also have put, delete and so on
"""
from flask import request
from flask_restful import reqparse
from flask_restplus import abort
from werkzeug.datastructures import FileStorage


# get request args
# POST GET DELETE all can get args from this
def get_request_args(arg_name, arg_type, required=True):
    parser = reqparse.RequestParser()
    parser.add_argument(arg_name, type=arg_type)
    args = parser.parse_args()

    res = args.get(arg_name)

    if res is None and required:
        abort(400, "Missing args")

    return res


def get_request_file(arg_name):
    parser = reqparse.RequestParser()
    parser.add_argument(arg_name, location='files', type=FileStorage, action='append')
    args = parser.parse_args()
    files = args.get(arg_name)
    return files


# get the header token
def get_header(req, required=True):
    token = req.headers.get('Authorization', None)
    if not token and required:
        abort(403, "Not get the token")

    return token
