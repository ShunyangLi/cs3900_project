![passing](https://img.shields.io/badge/build-passing-green)![License](https://img.shields.io/badge/License-Python3.7-blue.svg)

# How to deploy the backend

We require python3.6 or higher version. Please install python3 and pip3 before set up the backend.

1. If you want to use the virtual environment (venv) you run those command:

   ```shell
   sudo apt install python3-venv
   ```

2. Create a new venv in the current directory:

   ```shell
   python3 -m venv venv
   ```

3. Active venv:

   ```shell
   source venv/bin/activate
   ```

4. Install python3 package:

   ```bash
   pip3 install -r requirements.txt
   ```

5. Deactivate the venv:

   ```shell
   deactivate
   ```

# Backend of the project

- Include **API**, **database**, and helper functions

- Tree structure

- ```
  .
  ├── README.md
  ├── api
  │   ├── auth_handling.py
  │   ├── booking_com_forward.py
  │   ├── booking_handling.py
  │   ├── chat_handling.py
  │   ├── hotel_info_for_map.py
  │   ├── hotel_management.py
  │   ├── review_handling.py
  │   ├── room_management.py
  │   └── search_handling.py
  ├── app
  │   └── __init__.py
  ├── requirements.txt
  ├── run.py
  ├── templates
  │   ├── activate.html
  │   └── booking.html
  └── util
      ├── auth.py
      ├── data.sqlite
      ├── db_handling.py
      ├── generate_rating.py
      ├── init_database.sql
      ├── mail_handling.py
      └── request_handling.py
  ```

# Flask CORS
This is about how to solve the flask cors issue.

The fisrt method is config the app after request.

```python
# Configuring cors requests
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,session_id')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD')
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

```
The sencond methos is using the package`flask_cors` (this is what we use)：
```python
from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

```

# How to init database
In the `backend` directory execute:
```bash
rm util/data.sqlite
sqlite3 util/data.sqlite < util/init_database.sql
```

# How to init database in API

Call the API:

```bash
/cleanDB
```

# Make the hotels rating become random
```bash
python3 util/generate_rating.py
```