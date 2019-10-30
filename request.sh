curl -X POST \
       -H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
       -H "Content-Type: application/json; charset=utf-8" \
       -d @request.json \
       https://dialogflow.googleapis.com/v2/projects/test-gtqown/agent/sessions/454454:detectIntent
