from flask import Flask, jsonify, Blueprint, request, session
from db.db import DBController

book = Blueprint('book', __name__, url_prefix='/api/book')

dbCon = DBController()

@book.route('/main', methods=['POST'])
def main():
    params = request.get_json()
    page = params['page']
    length = len(dbCon.selectBooks())
    books = dbCon.selectMain(page)
    return jsonify(books, length)

@book.route('/list')
def list():
    book_list = dbCon.selectBooks()
    return jsonify(book_list)

@book.route('/rent', methods=['POST'])
def rent():
    params = request.get_json()
    rent_list = params['rentList']
    user_email = session['useremail']
    dbCon.insertRent(rent_list, user_email)
    return jsonify({"status": 200, "result": "success"})

@book.route('/myBooks', methods=['POST'])
def myBooks():
    params = request.get_json()
    isRead = params['isRead']
    user_email = session['useremail']
    myBooks = dbCon.selectMyBooks(user_email, isRead)
    return jsonify(myBooks)

@book.route('/return', methods=['POST'])
def returnBooks():
    params = request.get_json()
    return_list = params['returnList']
    user_email = session['useremail']
    dbCon.insertReturn(return_list, user_email)
    return jsonify({"status": 200, "result": "success"})

@book.route('/detail', methods=['POST'])
def detail():
    params = request.get_json()
    book_id = params['bookId']
    book_detail = dbCon.selectBookDetail(book_id)
    book_star = dbCon.selectBookStar(book_id)[0]
    book_reviews = dbCon.selectReview(book_id)
    return jsonify(book_detail, book_star, book_reviews)