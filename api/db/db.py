import sqlite3
import datetime

#book 초기데이터 삽입
class DBController():
    def __init__(self):
        self.con = sqlite3.connect('./db/database.db', check_same_thread=False)
        self.cur = self.con.cursor()

    def selectUser(self, email):
        self.cur.execute(f"SELECT user_password FROM USERS_TB WHERE user_email = '{email}';")
        return self.cur.fetchone()

    def insertUser(self, userInfo):
        name, email, password = userInfo
        self.cur.execute("INSERT INTO USERS_TB (user_name, user_email, user_password) VALUES (?, ?, ?);", (name, email, password))
        self.con.commit()

    def selectBooks(self):
        self.cur.execute("SELECT * FROM RENTAL_BOOKS_VW")
        return self.cur.fetchall()
    
    def selectMyBooks(self, user_email):
        self.cur.execute(f"SELECT R.rent_book_id, B.book_name, count(R.rent_book_id) FROM RENTAL_TB as R LEFT JOIN BOOKS_TB as B on R.rent_book_id = B.book_id WHERE R.rent_user_email = '{user_email}' and R.rent_to_date is NULL GROUP BY R.rent_book_id;")
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
            return_count = book[3]
            self.cur.execute(f"UPDATE RENTAL_TB SET rent_to_date = '{nowDateTime}' WHERE rent_book_id = {book_id} and rent_user_email = '{user_email}' and rent_to_date is NULL LIMIT {return_count}")
        self.con.commit()
