from flask import Flask, jsonify, Blueprint, request
from db.db import DBController

book = Blueprint('book', __name__, url_prefix='/api/book')

dbCon = DBController()

@book.route('/list')
def list():
  book_list = dbCon.selectAll('BOOKS_TB', ['book_id', 'book_name'])
  return jsonify(book_list)