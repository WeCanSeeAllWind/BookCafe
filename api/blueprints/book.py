from flask import Flask, jsonify, Blueprint, request
from db.db import DBController

book = Blueprint('book', __name__, url_prefix='/api/book')

dbCon = DBController()

@book.route('/list')
def list():
    book_list = dbCon.select('BOOKS_TB', ['book_id', 'book_name'])
    return jsonify(book_list)

@book.route('/rent', methods=['POST'])
def rent():
    params = request.get_json()
    rent_list = params['rentList']
    dbCon.insertRent(rent_list)
    return jsonify({"status": 200, "result": "success"})