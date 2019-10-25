import json
import requests
from app import api
from flask import make_response, jsonify, request
from util.request_handling import get_request_args,get_header
from flask_restplus import abort, Resource
from util.db_handling import query_db
from util.mail_handling import send_mail
from util.auth import generate_activate_token, check_token, get_token

chat = api.namespace('chat', description="Authentication Services")


@chat.route('/', strict_slashes=False)
class Chat(Resource):

    @chat.response(200, 'Success')
    @chat.response(400, 'Error')
    @chat.param('message', 'The response of chat box')
    @chat.doc(description="This is for chat box handling")
    def post(self):
        message = [get_request_args('message', str)]
        # msg_data = {
        #     "queryInput": {
        #         "text": {
        #             "text": message,
        #             "languageCode": "en"
        #         }
        #     }
        # }

        # chat_url = 'https://dialogflow.googleapis.com/v2beta1/{session=projects/test-gtqown/agent/sessions/1}:detectIntent?access_token='+'762b56c338914273b074963f4b153145'

        # response = requests.post(
        #     url=chat_url,
        #     data=json.dumps(msg_data),

        # )

        # response.raise_for_status()

        print(message)
        response = detect_intent_texts("test-gtqown", 1, message, "en")

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
    return response.query_result.fulfillment_text