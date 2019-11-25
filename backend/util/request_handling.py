"""
handle args from post and get
should also have put, delete and so on
"""
from flask import request
from flask_restful import reqparse
from flask_restplus import abort
from werkzeug.datastructures import FileStorage


def get_request_args(arg_name, arg_type, required=True):
    """
    It will get the argument value according to the name.
    And it will check whether required
    :param arg_name: the argument name
    :param arg_type: the argument type
    :param required: whether necessary
    :return: the argument value
    """
    parser = reqparse.RequestParser()
    parser.add_argument(arg_name, type=arg_type)
    args = parser.parse_args()

    res = args.get(arg_name)

    if res is None and required:
        abort(400, "Missing args: %s" % arg_name)

    return res


def get_request_file(arg_name):
    """
    Get files in the requests according to file name
    :param arg_name: the files name
    :return: list of files or None
    """
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


def format_str(info):
    """
    replace ' into '' for database format
    :param info: the string
    :return: new string convert ' into ''
    """
    return info.replace('\'', '\'\'')
