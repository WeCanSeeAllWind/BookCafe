from flask import Flask, jsonify, Blueprint, request, session
from db.db import DBController

book = Blueprint('book', __name__, url_prefix='/api/book')

dbCon = DBController()

@book.route('/list')
def list():
    book_list = dbCon.selectBooks()
    return jsonify(book_list)

@book.route('/rent', methods=['POST'])
def rent():
    params = request.get_json()
    rent_list = params['rentList']
    session_id = params['sessionId']
    user_email = session[session_id]
    dbCon.insertRent(rent_list, user_email)
    return jsonify({"status": 200, "result": "success"})

@book.route('/myBooks', methods=['POST'])
def myBooks():
    params = request.get_json()
    isRead = params['isRead']
    session_id = params['sessionId']
    user_email = session[session_id]
    myBooks = dbCon.selectMyBooks(user_email, isRead)
    return jsonify(myBooks)

@book.route('/return', methods=['POST'])
def returnBooks():
    params = request.get_json()
    return_list = params['returnList']
    session_id = params['sessionId']
    user_email = session[session_id]
    dbCon.insertReturn(return_list, user_email)
    return jsonify({"status": 200, "result": "success"})

@book.route('/detail', methods=['POST'])
def detail():
    params = request.get_json()
    book_id = params['bookId']
    bookDetail = dbCon.selectBookDetail(book_id)
    return jsonify(bookDetail)