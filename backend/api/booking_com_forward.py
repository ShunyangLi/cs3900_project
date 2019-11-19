import json
import requests
import datetime
import os
from app import api
from flask import make_response, jsonify, request
from util.request_handling import get_request_args,get_header, get_request_file
from flask_restplus import abort, Resource
from util.db_handling import query_db

info = api.namespace('bookingcomForward', description="Forward booking.com results")
tmr = datetime.date.today() + datetime.timedelta(days=1)
tmr_str = tmr.strftime("%Y-%m-%d")
dep = tmr + datetime.timedelta(days=1)
dep_str = dep.strftime("%Y-%m-%d")

@info.route('/', strict_slashes=False)
class Info(Resource):
    @info.doc(description="Forward booking.com results to the frontend")
    def get(self):
#         return make_response(jsonify({'res': hotels}), 200)
        url = "https://apidojo-booking-v1.p.rapidapi.com/properties/list"

        querystring = {"price_filter_currencycode":"AUD","travel_purpose":"leisure","categories_filter":"price::9-40,free_cancellation::1,class::1,class::0,class::2","search_id":"none","order_by":"popularity","languagecode":"en-us","search_type":"city","offset":"0","dest_ids":"-1603135","guest_qty":"1","arrival_date":tmr_str,"departure_date":dep_str,"room_qty":"1"}

        headers = {
            'x-rapidapi-host': "apidojo-booking-v1.p.rapidapi.com",
            'x-rapidapi-key': "0133cabf23mshf6259baae50b0aap128e2bjsn05576bd7d231"
         }

        response = requests.request("GET", url, headers=headers, params=querystring)

        print(response.text)
        return make_response(response.text, 200)
