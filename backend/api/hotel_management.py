import os
from app import api
from flask import make_response, jsonify, request
from util.request_handling import get_request_args,get_header, get_request_file
from flask_restplus import abort, Resource
from util.db_handling import query_db
from werkzeug.datastructures import FileStorage


manage = api.namespace('hotel-management', description="Hotel management services")

"""
This API is for manage the hotel of the host
User need to pass the token
GET method is for getting all the hotel info
POST method is add a new hotel
PUT method is update hotel
DELETE method is delete the hotel
"""

allows = {'png', 'jpg', 'jpeg'}


# check whether allow type
def check_allow(file_name):
    return '.' in file_name and \
            file_name.rsplit('.', 1)[1].lower() in allows


def store_files(files, hotel_id, username):
    """
    it will create the directory for each user according to the username.
    because the username is unique.
    and then create the hotel id directory
    the path will like static/username/hotel_id/
    :param files: the image files
    :param hotel_id: hotel id
    :param username: the username
    :return:
    """
    # check static directory
    if not os.path.isdir('static'):
        os.mkdir('static')

    # create user's directory
    target = "static/%s/" % username
    if not os.path.isdir(target):
        os.mkdir(target)

    # create hotel directory
    target = "static/%s/old%s" % (username, hotel_id)
    if not os.path.isdir(target):
        os.mkdir(target)

    # store files
    for file in files:
        if file and check_allow(file.filename):
            filepath = "/".join([target, file.filename])
            file.save(filepath)
            query_db("""
                    INSERT INTO Hotel_img(hotel_id, url)
                    VALUES ('%s', '%s')
                    """ % (
                hotel_id, filepath
            ))


@manage.route('/')
@manage.response(200, 'Success')
@manage.response(400, 'Missing args')
@manage.expect(manage.parser().add_argument('Authorization', "Your Authorization Token in the form 'Token <AUTH_TOKEN>'",
                                        location='headers'))
class Manage(Resource):

    @manage.doc(description="You can get all your hotel info through this API")
    def get(self):
        # get the user's token firstly
        token = get_header(request)
        user = query_db("SELECT * FROM User WHERE token = '%s'" % token)
        if len(user) == 0:
            abort(400, 'Incorrect token, please login')

        hotels = query_db("SELECT * FROM Hotel WHERE host = '%s'" % user[0]['username'])
        res = {
            'code': 0,
            'msg': '',
            'count': len(hotels),
            'data': hotels
        }

        return make_response(jsonify(res), 200)

    @manage.doc(description="You can add new hotel through this API")
    @manage.param('hotel_name', 'Hotel name')
    @manage.param('hotel_phone', 'Hotel phone')
    @manage.param('hotel_location', 'Hotel location')
    @manage.param('hotel_email', 'Hotel email')
    @manage.param('hotel_price', 'Hotel price')
    @manage.param('hotel_description', 'Hotel description')
    @manage.param('hotel_web', 'Hotel web')
    @manage.param('hotel_type', 'Hotel type')
    @manage.param('hotel_bathrooms', 'Hotel bathrooms')
    @manage.param('hotel_bedrooms', 'Hotel bedrooms')
    @manage.param('file', 'Hotel images')
    def post(self):
        # check the token
        token = get_header(request)
        user = query_db("SELECT * FROM User WHERE token = '%s'" % token)
        if len(user) == 0:
            abort(400, 'Incorrect token, please login')

        hotel_name = get_request_args('hotel_name', str)
        hotel_phone = get_request_args('hotel_phone', str)
        hotel_location = get_request_args('hotel_location', str)
        hotel_email = get_request_args('hotel_email', str)
        hotel_price = get_request_args('hotel_price', str)
        hotel_description = get_request_args('hotel_description', str)
        hotel_web = get_request_args('hotel_web', str)
        hotel_type = get_request_args('hotel_type', str)
        hotel_bathrooms = get_request_args('hotel_bathrooms', str)
        hotel_bedrooms = get_request_args('hotel_bedrooms', str)
        files = get_request_file('file')

        nums = query_db("SELECT * FROM Hotel")
        hotel_id = nums[len(nums)-1]['id'] + 1

        query_db("""
        INSERT INTO Hotel(id, name, phone, location, email, price, web, description, host, room_type, bathrooms, bedrooms)
        VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')""" % (
            hotel_id, hotel_name, hotel_phone, hotel_location, hotel_email, hotel_price, hotel_web, hotel_description,
            user[0]['username'], hotel_type, hotel_bathrooms, hotel_bedrooms))

        store_files(files, hotel_id, user[0]['username'])
        return make_response(jsonify({'res': 'success'}), 200)

    @manage.doc(description="Update hotel info")
    @manage.param('hotel_name', 'Hotel name')
    @manage.param('hotel_phone', 'Hotel phone')
    @manage.param('hotel_location', 'Hotel location')
    @manage.param('hotel_email', 'Hotel email')
    @manage.param('hotel_price', 'Hotel price')
    @manage.param('hotel_description', 'Hotel description')
    @manage.param('hotel_web', 'Hotel web')
    @manage.param('hotel_type', 'Hotel type')
    @manage.param('hotel_bathrooms', 'Hotel bathrooms')
    @manage.param('hotel_bedrooms', 'Hotel bedrooms')
    @manage.param('file', 'Hotel images')
    @manage.param('hotel_id', 'The hotel id which need to be updated')
    def put(self):
        # check the token
        token = get_header(request)
        hotel_id = get_request_args('hotel_id', str)
        user = query_db("SELECT * FROM User WHERE token = '%s'" % token)
        if len(user) == 0:
            abort(400, 'Incorrect token, please login')

        hotel = query_db("SELECT * FROM Hotel WHERE host = '%s' AND id = '%s'" % (user[0]['username'], hotel_id))
        if len(hotel) == 0:
            abort(400, 'You are not this hotel\'s host')

        hotel_name = get_request_args('hotel_name', str)
        hotel_phone = get_request_args('hotel_phone', str)
        hotel_location = get_request_args('hotel_location', str)
        hotel_email = get_request_args('hotel_email', str)
        hotel_price = get_request_args('hotel_price', str)
        hotel_description = get_request_args('hotel_description', str)
        hotel_web = get_request_args('hotel_web', str)
        hotel_type = get_request_args('hotel_type', str)
        hotel_bathrooms = get_request_args('hotel_bathrooms', str)
        hotel_bedrooms = get_request_args('hotel_bedrooms', str)
        files = get_request_file('file')

        # this part is for update the hotel info
        query_db("""
        UPDATE Hotel SET name = '%s', phone = '%s', location = '%s', email = '%s', price = '%s', web = '%s', 
        description = '%s', host = '%s', room_type = '%s', bathrooms = '%s', bedrooms = '%s' WHERE id = '%s'
        """ % (
            hotel_name.replace('\'', '\'\''), hotel_phone, hotel_location.replace('\'', '\'\''),
            hotel_email, hotel_price, hotel_web, hotel_description.replace('\'', '\'\''),
            user[0]['username'], hotel_type, hotel_bathrooms, hotel_bedrooms, hotel_id))

        # if they do not upload files, then we do not remove url
        if files is not None:
            # delete all the image url and then store the new image
            query_db("DELETE FROM Hotel_img WHERE hotel_id='%s'" % hotel_id)
            store_files(files, hotel_id, user[0]['username'])

        return make_response(jsonify({'res': 'success'}), 200)

    @manage.doc(description="Delete hotel")
    @manage.param('hotel_id', 'The hotel id which need to be deleted')
    def delete(self):
        # check the token
        token = get_header(request)
        user = query_db("SELECT * FROM User WHERE token = '%s'" % token)
        if len(user) == 0:
            abort(400, 'Incorrect token, please login')

        hotel_id = get_request_args('hotel_id', str)
        # check the host
        hotel = query_db("SELECT * FROM Hotel WHERE host = '%s' AND id = '%s'" % (user[0]['username'], hotel_id))
        if len(hotel) == 0:
            abort(400, 'You are not this hotel\'s host')

        # if check done, then delete
        query_db("DELETE FROM Hotel WHERE id = '%s'" % hotel_id)
        query_db("DELETE FROM Hotel_img WHERE hotel_id = '%s'" % hotel_id)

        return make_response(jsonify({'res': 'success'}), 200)
