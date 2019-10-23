[TOC]
# Authentication
所有的Responses，除了200以外都是报错的。400一般为missing args 也就是缺少参数。
403 可以包含多个报错信息，不同的API报错结果不一样。

## `/auth/signup`
**描述:**
- 这个API是用来注册的账号的，需要用户提供username（email）和password。
同时前端需要把user type确定并和username， password一起返回给后端。

**Method:**
- POST

**Parameter:**
- username
    - type: String, should be email

- password:
    - type: String

- type:
    - 是指用户的类型：individual or enterprise

**Responses:**
- 200 Success
- 400 Missing args (缺少参数)
- 403 Already register (已注册)
  
## `/auth/login`
**描述:**
- 用于登陆，username和password都正确的时候回返回一个`token`, 如果没有注册，或者没有激活的情况下会返回一个`403`

**Method:**
- POST

**Parameter:**
- username
    - type: String, should be email

- password:
    - type: String

**Responses:**
- 200 Success
- 400 Missing args (缺少参数)
- 403 包含多个报错信息:
    - Not register
    - Register but not activate
    - Username or password not correct!

## `/auth/close`
**描述:**
- 这个是用来永久注销账户的，database会删除所有有关这个user的信息。
需要用户输入username和password来彻底关闭账户。

**Method:**
- DELETE

**Parameter:**
- username
    - type: String, should be email

- password:
    - type: String

**Responses:**
- 200 Success
- 400 Missing args (缺少参数)
- 403 包含多个报错信息:
    - Not register
    - Username or password not correct!

## `/auth/activate`
**描述:**
- 用于激活用户账号。当用户收到验证邮件之后，点击button跳转网页。然后前端需要提取token，然后把token返回给后端来激活账号。

**Method:**
- POST

**Parameter:**
- token
    - type: String
    

**Responses:**
- 200 Success
- 400 Missing args (缺少参数)
- 403 包含多个报错信息:
    - Already register
    - Your email already activate!
    - Token expired.

## `/auth/send`
**描述:**
- 当验证邮箱的`token` 超时以后（expired），用户还未激活账号。
用户需要重新发送验证邮件。该API就是重新发送验证邮件。（已注册，但是未激活成功，需要重新激活）

**Method:**
- POST

**Parameter:**
- username
    - type: String should be email

**Responses:**
- 200 Success
- 400 Missing args (缺少参数)
- 403 包含多个报错信息:
    - Not signup
    - Your email already activate!


# Clean DB
使用API：`/cleanDB`
