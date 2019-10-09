# Backend of the project

- Include **API**, **db**, and helper functions

- Tree structure

- ```
  .
  ├── README.md
  ├── api
  │   └── user_handling.py
  ├── app.py
  ├── run.py
  └── util
      ├── data.sqlite
      ├── db_handling.py
      ├── init_database.sql
      └── request_handling.py
  ```

# How to deploy backend

- `pip3 install -r requirements.txt`
- `python3 run.py`

# How to use token in login

```python
/confirm?token=xxxxxx

# 怎么在API里面可以直接用get的方法得到数据，可以直接调用
token = get_get_args('token')
```



