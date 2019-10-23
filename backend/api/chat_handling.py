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
        message = get_request_args('message', str)
        msg_data = {
            "queryInput": {
                "text": {
                    "text": message,
                    "languageCode": "en"
                }
            }
        }

        chat_url = 'https://dialogflow.googleapis.com/v2beta1/{session=projects/test-gtqown/agent/sessions/1}:detectIntent?access_token='+'762b56c338914273b074963f4b153145'

        response = requests.post(
            url=chat_url,
            data=json.dumps(msg_data),

        )

        response.raise_for_status()

        print(response)
