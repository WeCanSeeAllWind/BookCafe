from flask import Flask, jsonify, Blueprint, request, session
from db.db import DBController
from flask_bcrypt import generate_password_hash, check_password_hash
import string
import random

user = Blueprint('user', __name__, url_prefix='/api/user')

dbCon = DBController()

@user.route('/register', methods=['POST'])
def register():
    params = request.get_json()
    name     = params['name']
    email    = params['email'] 
    password = params['password']
    pw_hash = generate_password_hash(password)
    print(pw_hash)
    dbCon.insertUser([name, email, pw_hash])
    return jsonify({'status': 200, 'result': "success"})

@user.route('/login', methods=['POST'])
def login():
    params = request.get_json()
    email    = params['email'] 
    password = params['password']
    true_pw = dbCon.selectUser(email)
    if dbCon.selectUser(email) is None:
        value = {"status": 404, "result": "not exist"}
    elif check_password_hash(true_pw[0], password) is False:
        value = {"status": 404, "result": "not match"}
    else:
        session_id = "".join(random.choice(string.ascii_letters) for i in range(10))
        session[session_id] = email
        value = {"status": 200, "result": "success", "session_id": session_id}
    return jsonify(value)

@user.route('/isLogin', methods=['POST'])
def isLogin():
    params = request.get_json()
    session_id = params['session_id']
    if session.get(session_id):
        value = {"status": 200, "result": "success"}
    else:
        value = {"status": 404, "result": "fail"}
    return jsonify(value)

@user.route('/logout', methods=['POST'])
def logout():
    params = request.get_json()
    session_id = params['session_id']
    if session.get(session_id):
        session.pop(session_id)
        value = {"status": 200, "result": "success"}
    else:
        value = {"status": 404, "result": "fail"}
    return jsonify(value)
