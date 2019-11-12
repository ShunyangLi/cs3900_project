import json
import requests
from app import api
from util.request_handling import get_request_args,get_header
from flask_restplus import abort, Resource
from util.db_handling import query_db
from util.mail_handling import send_mail
from util.auth import generate_activate_token, check_token, get_token

chat = api.namespace('chat', description="Authentication Services")
session_id = 1


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
        # hotel name and address
        hotel = response.query_result.parameters.fields['hotel'].string_value
        address = response.query_result.parameters.fields['address'].string_value
        print(hotel)
        print(address)
        # check if it's correct
        if hotel != "" and address != "":
            res = query_db("select * from hotel where name = '%s' and location = '%s'" % (hotel, address))
            if len(res) == 0:
                session_id += 1
                return "Sorry. Can't find this hotel"
        # return agent response
        # print(type(response.query_result.fulfillment_text)
        return response.query_result.fulfillment_text


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
        # #print('Fulfillment text: {}\n'.format(
        #     response.query_result.parameters.fields['hotel'].string_value))
    return response
