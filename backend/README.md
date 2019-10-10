# Backend of the project

- Include **API**, **db**, and helper functions

- Tree structure

- ```
  .
  ├── README.md
  ├── api
  │   └── auth_handling.py
  ├── app
  │   └── __init__.py
  ├── requirements.txt
  ├── run.py
  ├── templates
  │   └── activate.html
  └── util
      ├── auth.py
      ├── data.sqlite
      ├── db_handling.py
      ├── init_database.sql
      ├── mail_handling.py
      └── request_handling.py
  ```

# How to deploy backend

- `pip3 install -r requirements.txt`
- `python3 run.py`

# How to test API
在测试不同的request的请求的时候，只需要把`DELETE`换成相对应的request方式就行。
添加args的方式：`-d "arg1=xxx&arg2=xxx"`。在测试需要用不同的URL。例如：
```bash
curl -X DELETE "http://127.0.0.1:8000/auth/close" -H "accept: application/json" -d "username=shunyangli0@gmail.com&password=li19980812"
```
```bash
curl -X GET "http://127.0.0.1:8000/auth/send" -H "accept: application/json" -d "username=shunyangli0@gmail.com"
```
当然也可以直接在浏览器中打开测试。

# Flask CROS
因为前端JQuery或者AJAX请求API数据时会存在一些跨域请求的问题有两种解决方法：
第一种是在app request之后自定义header：
```python
# Configuring cross requests
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,session_id')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD')
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

```
第二种是调用package`flask_cors`来解决：
```python
from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

```