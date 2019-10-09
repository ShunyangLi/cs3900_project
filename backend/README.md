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