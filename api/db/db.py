import sqlite3
import datetime

#book 초기데이터 삽입
class DBController():
    def __init__(self):
        self.con = sqlite3.connect('./db/database.db', check_same_thread=False)
        self.cur = self.con.cursor()
    #User 처리 --------------
    def selectUser(self, email):
        self.cur.execute(f"SELECT user_password FROM USERS_TB WHERE user_email = '{email}';")
        return self.cur.fetchone()

    def insertUser(self, userInfo):
        name, email, password = userInfo
        self.cur.execute("INSERT INTO USERS_TB (user_name, user_email, user_password) VALUES (?, ?, ?);", (name, email, password))
        self.con.commit()
    #Book 처리 --------------
    def selectMain(self, page):
        start_id = 8 * page - 7
        self.cur.execute(f"SELECT * FROM BOOKS_RENTAL_REVIEW_VW WHERE book_id >= {start_id} LIMIT 8;")
        return self.cur.fetchall()

    def selectBooks(self):
        self.cur.execute("SELECT * FROM BOOKS_RENTAL_REVIEW_VW;")
        return self.cur.fetchall()

    def selectBookStar(self, book_id):
        self.cur.execute(f"SELECT review_avg_score FROM BOOKS_RENTAL_REVIEW_VW WHERE book_id = '{book_id}'")
        return self.cur.fetchone()
    
    def selectBookDetail(self, book_id):
        self.cur.execute(f"SELECT * FROM BOOKS_TB WHERE book_id = '{book_id}';")
        return self.cur.fetchone()
    
    def selectMyBooks(self, user_email, isRead):
        isNull = 'is not NULL' if isRead else 'is NULL'
        self.cur.execute(f"SELECT R.rent_book_id, B.book_name, B.book_author, count(R.rent_book_id), B.review_avg_score FROM RENTAL_TB as R LEFT JOIN BOOKS_RENTAL_REVIEW_VW as B on R.rent_book_id = B.book_id WHERE R.rent_user_email = '{user_email}' and R.rent_to_date {isNull} GROUP BY R.rent_book_id;")
        return self.cur.fetchall()
    
    def insertRent(self, rent_list, user_email):
        for book in rent_list:
            book_id = book[0]
            rent_count = book[3]
            for i in range(rent_count):
                self.cur.execute(f"INSERT INTO RENTAl_TB (rent_book_id, rent_user_email) VALUES ('{book_id}', '{user_email}')")
        self.con.commit()
    
    def insertReturn(self, return_list, user_email):
        now = datetime.datetime.now()
        nowDateTime = now.strftime('%Y-%m-%d %H:%M:%S')
        for book in return_list:
            book_id = book[0]
            return_count = book[4]
            self.cur.execute(f"UPDATE RENTAL_TB SET rent_to_date = '{nowDateTime}' WHERE rent_book_id = {book_id} and rent_user_email = '{user_email}' and rent_to_date is NULL LIMIT {return_count}")
        self.con.commit()
    #Review 처리 --------------
    def insertReview(self, book_id, star_score, review_text, user_email):
        self.cur.execute(f"SELECT * FROM REVIEW_TB WHERE review_book_id='{book_id}' and review_user_email = '{user_email}';")
        isExist = self.cur.fetchall()
        if isExist:
            self.cur.execute(f"UPDATE REVIEW_TB SET review_score = '{star_score}', review_content = '{review_text}' WHERE review_book_id='{book_id}' and review_user_email = '{user_email}';")
            self.con.commit()
            return False
        else: 
            self.cur.execute(f"INSERT INTO REVIEW_TB (review_book_id, review_user_email, review_score, review_content) VALUES ('{book_id}', '{user_email}', '{star_score}', '{review_text}');")
            self.con.commit()
            return True
    def selectReview(self, book_id):
        self.cur.execute(f"SELECT U.user_name, R.review_content, R.review_score FROM REVIEW_TB AS R LEFT JOIN USERS_TB AS U ON R.review_user_email = U.user_email WHERE review_book_id = '{book_id}' LIMIT 10;")
        return self.cur.fetchall()