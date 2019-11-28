![passing](https://img.shields.io/badge/build-passing-green) ![License](https://img.shields.io/badge/License-Python3.7-blue.svg)

# How to deploy the backend

We require python3.6 or higher version and sqlite3. Please install python3, pip3 and sqlite3 before set up the backend. 

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

# Dialogflow Authentication

We use dialogflow in the chatbot functions, so before you run the backend you need to `export` the authentication files. Firstly, you need to get the current path, execute this command then you can get the current directory.

```bash
pwd
```

And then execute the `export` commad. The `current_path` is the `pwd` command result.

```shell
export GOOGLE_APPLICATION_CREDENTIALS="current_path/auth.json"
```

# Install Python3 and SQLite

If you do not install python3 or SQlite, you can follow those command to install them.

## Install SQlite

- To install on Linux system (Ubuntu or Debian) please execute below commands:

  ```shell
  sudo apt-get update
  sudo apt-get install sqlite3
  ```

- To install on Mac system please execute below commands:

  ```shell
  brew install sqlite3
  ```

  - If you donot install `brew` you can execute this command:

    ```shell
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```

## Install python3

- On Mac system execute below command:

  ```
  brew install python3
  ```

- On Linux system execute below command:

  ```shell
  sudo apt-get update
  sudo apt-get install python3.6
  ```

## Install pip3

To install `pip3` in your system, you can execute the following command:

```shell
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
```

And then:

```shell
python3 get-pip.py
```

# Backend of the project
<<<<<<< HEAD

- Include **API**, **database**, and helper functions
=======
- hello
- Include **API**, **db**, and helper functions
>>>>>>> 96627684cf56dfc624a0c00ea99f7cb281379742

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
