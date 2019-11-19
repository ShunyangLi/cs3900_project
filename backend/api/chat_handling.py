import json
import requests
from app import api
from util.request_handling import get_request_args,get_header
from flask_restplus import abort, Resource
from util.db_handling import query_db
from util.mail_handling import send_mail
from util.auth import generate_activate_token, check_token, get_token
import random
import time
import datetime

chat = api.namespace('chat', description="Authentication Services")
session_id = 10

# chat sample
# Book a room in jamison, 190 Smith Street on 12/1 and 12/2, 
# my name is Li Ding, we have 3 adults and 2 children


@chat.route('/', strict_slashes=False)
class Chat(Resource):

    @chat.response(200, 'Success')
    @chat.response(400, 'Error')
    @chat.param('message', 'The response of chat box')
    @chat.doc(description="This is for chat box handling")
    def post(self):
        global session_id
        message = [get_request_args('message', str)]
        
        response = detect_intent_texts("test-gtqown", session_id, message, "en")
        # search hotels
        if response.query_result.intent.display_name == "Search":
            return searchHotel(response)

        # hotel name and address
        hotel = response.query_result.parameters.fields['hotel'].string_value
        address = response.query_result.parameters.fields['address'].string_value
        # check if it's correct
        if hotel != "" and address != "":
            res = query_db("select * from hotel where name = '%s' and location = '%s'" % (hotel, address))
            if len(res) == 0:
                session_id += 1
                return "Sorry. Can't find this hotel"
        
        firstname, lastname, hotel, address, arrival_date, departure_date, email = checkInfo(response, response.query_result.parameters)
        # find hotel id by address
        hotel_id = -1
        if address != '':
            res = requests.get("http://127.0.0.1:9000/chatbox-search?location=%s" % address)
            res.raise_for_status()
            res = res.json()
            hotel_id = res['res'][0]['id']

        if email != '':
        # if response.query_result.intent.display_name == 'Booking room - yes':
            book_info = {}
            book_info['comment'] = ''
            book_info['price'] = random.randint(100,300)
            book_info['check_out'] = departure_date
            book_info['check_in'] = arrival_date
            book_info['email'] = email
            book_info['name'] = firstname + ' ' + lastname
            book_info['hotel_id'] = hotel_id
            # print(book_info)
            requests.post("http://127.0.0.1:9000/chatbox-booking", data=book_info)

        # return agent response
        return response.query_result.fulfillment_text

def checkInfo(response, parameters):
    firstname = lastname = hotel = address = email = arrival_date = departure_date = ""
    dates = []
    numAdult = numChild = -1
    if firstname == "":
        firstname = parameters.fields['firstName'].string_value
    if lastname == "":
        lastname = parameters.fields['lastName'].string_value
    if hotel == "":
        hotel = parameters.fields['hotel'].string_value
    if address == "":
        address = parameters.fields['address'].string_value
    if dates == []:
        dates = parameters.fields['date']
    if numAdult == -1:
        numAdult = parameters.fields['numAdult']
    if numChild == -1:
        numChild = parameters.fields['numChild']
    if email == '':
        email = parameters.fields['email'].string_value
    # print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    # print(type(dates.list_value))
    # print(dates.list_value)
    if email != '':
        arrival_date = dates.list_value[0][0:10]
        departure_date = dates.list_value[-1][0:10]
        departure_date = datetime.datetime.strptime(departure_date, "%Y-%m-%d")
        departure_date = departure_date+datetime.timedelta(days=1)
        departure_date = str(departure_date)[0:10]
        # print(departure_date)
        # print(arrival_date)

    return firstname, lastname, hotel, address, arrival_date, departure_date, email

def searchHotel(response):
    city = response.query_result.parameters.fields['city'].string_value
    res = requests.get("http://nomoreprojectpls.com/search/hotel?location=%s" % city)
    res.raise_for_status()
    res = res.json()
    ret_val = ''
    num = 1
    for hotel in res['res']:
        ret_val += '%i' % num + ':\n'
        ret_val += 'Hotel Name: ' + hotel['description'] + '\n'
        ret_val += 'Hotel Address: ' + hotel['hotel_address'] + '\n'
        num += 1
    return ret_val

def detect_intent_texts(project_id, session_id, texts, language_code):
    """Returns the result of detect intent with texts as inputs.

    Using the same `session_id` between requests allows continuation
    of the conversation."""
    import dialogflow_v2 as dialogflow
    session_client = dialogflow.SessionsClient()

    session = session_client.session_path(project_id, session_id)
    print('Session path: {}\n'.format(session))

    for text in texts:
        text_input = dialogflow.types.TextInput(
            text=text, language_code=language_code)

        query_input = dialogflow.types.QueryInput(text=text_input)

        response = session_client.detect_intent(
            session=session, query_input=query_input)

        print('=' * 20)
        print('Query text: {}'.format(response.query_result.query_text))
        print('Detected intent: {} (confidence: {})\n'.format(
            response.query_result.intent.display_name,
            response.query_result.intent_detection_confidence))
        print('Fulfillment text: {}\n'.format(
            response.query_result.fulfillment_text))
        #print(response.query_result.parameters)
        # print('Fulfillment text: {}\n'.format(
        #     response.query_result.parameters.fields['hotel'].string_value))
    return response
