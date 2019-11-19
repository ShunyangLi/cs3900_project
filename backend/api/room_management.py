import os
import shutil
from app import api
from flask import make_response, jsonify, request
from util.request_handling import get_request_args,get_header, get_request_file, format_str
from flask_restplus import abort, Resource
from util.db_handling import query_db

path = os.getcwd()
hotel = api.namespace('hotel', description="New hotel management services")

"""
This API is for hotel management and room management
This one is for new hotel management
对于每个文件夹用new和old来区分
"""

allows = {'png', 'jpg', 'jpeg'}


# check whether allow type
def check_allow(file_name):
    return '.' in file_name and \
            file_name.rsplit('.', 1)[1].lower() in allows


def check_folder(hotel_id, username):
    """
    check whether the hotel folder was created
    :param hotel_id: which need to be uploaded
    :param username: username
    :return:
    """
    # check static directory
    if not os.path.isdir('static'):
        os.mkdir('static')

    target = "static/%s/" % username
    if not os.path.isdir(target):
        os.mkdir(target)

    target = "static/%s/new%s" % (username, hotel_id)
    if not os.path.isdir(target):
        os.mkdir(target)

    return target


def store_hotel_images(files, hotel_id, username):
    """
    upload hotel images and store it into folder
    :param files: upload files
    :param hotel_id: upload hotel's id
    :param username: the username of who uploaded the file
    :return:
    """
    target = check_folder(hotel_id, username)

    for file in files:
        if file and check_allow(file.filename):
            filepath = "/".join([target, file.filename])
            file.save(filepath)
            query_db("""
                    INSERT INTO Hotels_img(hotel_id, url)
                    VALUES ('%s', '%s')
                    """ % (
                hotel_id, filepath
            ))


def store_room_image(files, hotel_id, room_id, username):
    """
    store the rooms image and store it into folder
    :param files: rooms images
    :param hotel_id: the rooms belongs
    :param username: username
    :return:
    """

    target = check_folder(hotel_id, username)

    target += "/%s" % room_id
    if not os.path.isdir(target):
        os.mkdir(target)

    # the target path should be like static/username/hotel_id/room_id/xxx.png

    for file in files:
        if file and check_allow(file.filename):
            filepath = "/".join([target, file.filename])
            file.save(filepath)
            query_db("""
                    INSERT INTO Rooms_img(room_id, url)
                    VALUES ('%s', '%s')
                    """ % (room_id, filepath)
                     )


def check_login(token):
    """
    according to the token, check whether correct
    :param token: the param token
    :return:
    """
    user = query_db("SELECT * FROM User WHERE token = '%s'" % token)
    if len(user) == 0:
        abort(400, 'Incorrect token, please login')
    return user[0]


@hotel.route('/management/', strict_slashes=False)
@hotel.response(200, 'Success')
@hotel.response(400, 'Missing args')
@hotel.response(403, 'User do not have this hotel')
@hotel.expect(hotel.parser().add_argument('Authorization', "Your Authorization Token in the form 'Token <AUTH_TOKEN>'",
                                        location='headers'))
class Management(Resource):

    @hotel.doc(description='Get hotel and rooms according to username')
    def get(self):
        user = check_login(get_header(request))
        hotels = query_db("SELECT * FROM Hotels WHERE host='%s'" % user['username'])

        for h in hotels:
            rooms = query_db("SELECT * FROM Rooms WHERE hotel_id='%s'" % h['hotel_id'])
            for r in rooms:
                img = query_db("SELECT * FROM Rooms_img WHERE room_id='%s'" % r['room_id'])
                r['img_url'] = img
            hotel_img = query_db("SELECT * FROM Hotels_img WHERE hotel_id='%s'" % h['hotel_id'])
            h['img_url'] = hotel_img
            h['rooms'] = rooms

        return make_response(jsonify(res=hotels), 200)

    @hotel.doc(description='Post method is for upload new hotels')
    @hotel.param('file', 'Hotel images')
    @hotel.param('email', 'Hotel emails')
    @hotel.param('phone', 'Hotel phone')
    @hotel.param('description', 'Hotel description')
    @hotel.param('hotel_address', 'Hotel address')
    @hotel.param('hotel_name', 'Hotel name')
    def post(self):
        # check whether the user login
        user = check_login(get_header(request))

        # get the hotel id
        hotels = query_db("SELECT * FROM Hotels")
        if len(hotels) == 0:
            hotel_id = 0
        else:
            hotel_id = hotels[len(hotels) - 1]['hotel_id'] + 1

        hotel_name = get_request_args('hotel_name', str)
        hotel_address = get_request_args('hotel_address', str)
        description = get_request_args('description', str)
        phone = get_request_args('phone', str)
        email = get_request_args('email', str)
        files = get_request_file('file')

        query_db("""
        INSERT INTO Hotels(hotel_id, hotel_name, hotel_address, description, phone, email, host) 
        VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s')
        """ % (hotel_id, format_str(hotel_name), format_str(hotel_address),
               format_str(description), phone, email, user['username']))

        if files is not None:
            # store the images
            store_hotel_images(files, hotel_id, user['username'])

        return make_response(jsonify({'res': 'success'}), 200)

    @hotel.doc(description='Delete all the information about this hotel')
    @hotel.param('hotel_id', 'The hotel id which need to be removed')
    def delete(self):
        # check user
        user = check_login(get_header(request))
        hotel_id = get_request_args('hotel_id', str)
        
        hotels = query_db("SELECT * FROM Hotels WHERE hotel_id = '%s' AND host='%s'" % (hotel_id, user['username']))
        if len(hotels) == 0:
            abort(403, 'This user do not have this hotel')

        # after check the hotel owner, then remove all the content
        file_path = path + "/static/%s/new%s" % (user['username'], hotel_id)
        if os.path.isdir(file_path):
            shutil.rmtree(file_path)

        query_db("DELETE FROM Hotels WHERE hotel_id='%s' AND host='%s'" % (hotel_id, user['username']))
        query_db("DELETE FROM Hotels_img WHERE hotel_id='%s'" % hotel_id)
        # get all the rooms which belong to this hotel
        rooms = query_db("SELECT * FROM Rooms WHERE hotel_id = '%s'" % hotel_id)
        query_db("DELETE FROM Rooms WHERE hotel_id='%s'" % hotel_id)

        for r in rooms:
            query_db("DELETE FROM Rooms_img WHERE room_id='%s'" % r['room_id'])

        return make_response(jsonify(message='success'), 200)

    @hotel.doc(description='Update the hotel information')
    @hotel.param('file', 'Hotel images')
    @hotel.param('email', 'Hotel emails')
    @hotel.param('phone', 'Hotel phone')
    @hotel.param('description', 'Hotel description')
    @hotel.param('hotel_address', 'Hotel address')
    @hotel.param('hotel_name', 'Hotel name')
    @hotel.param('hotel_id', 'Hotel id which need to be updated')
    def put(self):
        print(request.form)
        user = check_login(get_header(request))
        hotel_id = get_request_args('hotel_id', str)

        # check whether the hotel belongs to this user
        hotels = query_db("SELECT * FROM Hotels WHERE hotel_id = '%s' AND host='%s'" % (hotel_id, user['username']))
        if len(hotels) == 0:
            abort(403, 'This user do not have this hotel')

        hotel_name = get_request_args('hotel_name', str)
        hotel_address = get_request_args('hotel_address', str)
        description = get_request_args('description', str)
        phone = get_request_args('phone', str)
        email = get_request_args('email', str)
        files = get_request_file('file')

        # need to update the hotel's information
        query_db("""
        UPDATE Hotels SET hotel_name = '%s', hotel_address = '%s', description='%s', phone='%s', email='%s'
        WHERE hotel_id = '%s'
        """ % (format_str(hotel_name), format_str(hotel_address), format_str(description), phone, email, hotel_id))

        # if they do not upload files, then we do not remove url
        if files is not None:
            # delete all the image url and then store the new image
            imgs = query_db("SELECT * FROM Hotels_img WHERE hotel_id = '%s'" % hotel_id)
            # delete all the hotel imags
            for img in imgs:
                os.remove(img['url'])

            query_db("DELETE FROM Hotels_img WHERE hotel_id='%s'" % hotel_id)

            store_hotel_images(files, hotel_id, user['username'])

        return make_response(jsonify(message='success'), 200)


# make a rooms management api
room = api.namespace('room', description='Room management services')


@room.route('/management', strict_slashes=False)
@room.response(200, 'Success')
@room.response(400, 'Missing args')
@room.response(403, 'User do not have this hotel')
@room.expect(room.parser().add_argument('Authorization', "Your Authorization Token in the form 'Token <AUTH_TOKEN>'",
                                        location='headers'))
class RoomManagement(Resource):

    @room.doc(description='Get all rooms according to hotel id')
    @room.param('hotel_id', 'The hotel id')
    def get(self):
        user = check_login(get_header(request))
        hotel_id = request.args.get('hotel_id')

        # check whether the user own this hotel
        hotels = query_db("SELECT * FROM Hotels WHERE hotel_id = '%s' AND host='%s'" % (hotel_id, user['username']))
        if len(hotels) == 0:
            abort(403, 'This user do not have this hotel')

        # get all the room's image
        rooms = query_db("SELECT * FROM Rooms WHERE hotel_id = '%s'" % hotel_id)
        for r in rooms:
            room_img = query_db("SELECT * FROM Rooms_img WHERE room_id = '%s'" % r['room_id'])
            r['img_url'] = room_img

        return make_response(jsonify(res=rooms), 200)

    @room.doc(description='Add a new hotel')
    @room.param('file', 'The images of this room')
    @room.param('price', 'Room price')
    @room.param('children', 'Max number of children')
    @room.param('adults', 'Max number of adults')
    @room.param('bathroom', 'Number of bathroom')
    @room.param('bedroom', 'Number of bedroom')
    @room.param('name', 'Room name')
    @room.param('hotel_id', 'The hotel id of this room belong to.')
    def post(self):
        user = check_login(get_header(request))
        hotel_id = get_request_args('hotel_id', str)

        # check whether the user own this hotel
        hotels = query_db("SELECT * FROM Hotels WHERE hotel_id = '%s' AND host='%s'" % (hotel_id, user['username']))
        if len(hotels) == 0:
            abort(403, 'This user do not have this hotel')

        # get all the args
        name = get_request_args('name', str)
        bedroom = get_request_args('bedroom', str)
        bathroom = get_request_args('bathroom', str)
        adults = get_request_args('adults', str)
        children = get_request_args('children', str)
        price = get_request_args('price', str)
        files = get_request_file('file')

        # get the room id
        rooms = query_db("SELECT * FROM Rooms")
        if len(rooms) == 0:
            room_id = 0
        else:
            room_id = rooms[len(rooms) - 1]['room_id'] + 1

        # insert the room into db
        query_db("""
        INSERT INTO Rooms(room_id, hotel_id, name, bedroom, bathroom, adults, children, price)
        VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')
        """ % (room_id, hotel_id, format_str(name), bedroom, bathroom, adults, children, price))

        if files is not None:
            # and then insert the room images
            store_room_image(files, hotel_id, room_id, user['username'])

        return make_response(jsonify(message='success'), 200)

    @room.doc(description='Update room')
    @room.param('file', 'The images of this room')
    @room.param('price', 'Room price')
    @room.param('children', 'Max number of children')
    @room.param('adults', 'Max number of adults')
    @room.param('bathroom', 'Number of bathroom')
    @room.param('bedroom', 'Number of bedroom')
    @room.param('name', 'Room name')
    @room.param('room_id', 'The rooms id')
    @room.param('hotel_id', 'The hotel id of this room belong to.')
    def put(self):
        user = check_login(get_header(request))
        hotel_id = get_request_args('hotel_id', str)
        room_id = get_request_args('room_id', str)
        # check whether the user own this hotel
        hotels = query_db("SELECT * FROM Hotels WHERE hotel_id = '%s' AND host='%s'" % (hotel_id, user['username']))
        if len(hotels) == 0:
            abort(403, 'This user do not have this hotel')

        rooms = query_db("SELECT * FROM Rooms WHERE room_id='%s'" % room_id)

        if len(rooms) == 0:
            abort(403, 'No such room')

        # get all the args
        name = get_request_args('name', str)
        bedroom = get_request_args('bedroom', str)
        bathroom = get_request_args('bathroom', str)
        adults = get_request_args('adults', str)
        children = get_request_args('children', str)
        price = get_request_args('price', str)
        files = get_request_file('file')

        # if the user want to change the hotel images
        if files is not None:
            imgs = query_db("SELECT * FROM Rooms_img WHERE room_id='%s'" % room_id)

            for img in imgs:
                os.remove(img['url'])

            query_db("DELETE FROM Rooms_img WHERE room_id='%s'" % room_id)

            store_room_image(files,hotel_id, room_id, user['username'])

        query_db("""
        UPDATE Rooms SET name = '%s', bedroom = '%s', bathroom = '%s', adults = '%s', children = '%s', price = '%s'
        WHERE room_id = '%s'
        """ % (format_str(name), bedroom, bathroom, adults, children, price, room_id))

        return make_response(jsonify(message='success'), 200)

    @room.doc(description='Delete room')
    @room.param('room_id', 'The room id which need to be deleted')
    @room.param('hotel_id', 'Which hotel of this room belong to')
    def delete(self):
        # check the user firstly
        user = check_login(get_header(request))
        room_id = get_request_args('room_id', str)
        hotel_id = get_request_args('hotel_id', str)

        # check whether the user own this hotel
        hotels = query_db("SELECT * FROM Hotels WHERE hotel_id = '%s' AND host='%s'" % (hotel_id, user['username']))
        if len(hotels) == 0:
            abort(403, 'This user do not have this hotel')

        # check rooms
        rooms = query_db("SELECT * FROM Rooms WHERE room_id='%s' AND hotel_id='%s'" % (room_id, hotel_id))
        if len(rooms) == 0:
            abort(403, 'This rooms do not belong to this hotel')

        # remove all the images of this room
        file_path = path + "/static/%s/new%s/%s" % (user['username'], hotel_id, room_id)
        if os.path.isdir(file_path):
            shutil.rmtree(file_path)

        query_db("DELETE FROM Rooms WHERE room_id='%s'" % room_id)
        query_db("DELETE FROM Rooms_img WHERE room_id='%s'" % room_id)

        return make_response(jsonify(message='success'), 200)



