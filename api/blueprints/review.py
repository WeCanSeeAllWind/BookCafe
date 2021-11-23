from flask import Flask, jsonify, Blueprint, request, session
from db.db import DBController

review = Blueprint('review', __name__, url_prefix='/api/review')

dbCon = DBController()

@review.route('/new', methods=['POST'])
def new():
    params = request.get_json()
    session_id  = params['sessionId']   
    book_id     = params['bookId']
    star_score  = params['starScore']   
    review_text = params['reviewText']    
    user_email = session[session_id]
    if dbCon.insertReview(book_id, star_score, review_text, user_email):
        return jsonify({"status": 200, "result": "success"})
    else:
        return jsonify({"status": 200, "result": "change"})