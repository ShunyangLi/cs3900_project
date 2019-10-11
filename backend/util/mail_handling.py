from app import app
from flask import render_template
from flask_mail import Mail, Message
from threading import Thread

mail = Mail(app)


def start_send(app, message):
    with app.app_context():
        mail.send(message)


def send_mail(recipient, title, template, **kwargs):
    message = Message(title, sender='1479201404@qq.com', recipients=[recipient])
    message.html = render_template(template + '.html', **kwargs)
    thr = Thread(target=start_send, args=[app, message])
    thr.start()
