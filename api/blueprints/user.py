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
        session['useremail'] = email
        value = {"status": 200, "result": "success"}
    return jsonify(value)

@user.route('/isLogin', methods=['GET'])
def isLogin():
    if session.get('useremail'):
        email = session['useremail']
        value = {"status": 200, "result": "success", "payload": email, "session": session}
    else:
        value = {"status": 404, "result": "fail"}
    return jsonify(value)

@user.route('/logout', methods=['GET'])
def logout():
    if session.get('useremail'):
        session.pop('useremail', None)
        value = {"status": 200, "result": "success"}
    else:
        value = {"status": 404, "result": "fail"}
    return jsonify(value)

@user.route('/isEmail', methods=['POST'])
def isEmail():
    params = request.get_json()
    email  = params['email'] 
    result = dbCon.selectUser(email)
    if result:
        value = {"status": 404, "result": "fail"}
    else:
        value = {"status": 200, "result": "success"}
    return jsonify(value)

@user.route('/whoami')
def whoami():
    email = session['useremail']
    name = dbCon.selectUser(email)[1]
    return jsonify(email, name)
