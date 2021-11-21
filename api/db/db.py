import sqlite3

#book 초기데이터 삽입
class DBController():
    def __init__(self):
        self.con = sqlite3.connect('./db/database.db', check_same_thread=False)
        self.cur = self.con.cursor()
    def select(self, table_name, columns):
        if columns == None:
            self.cur.execute(f'select * from {table_name};')
        elif len(columns) == 1:
            self.cur.execute(f'select {columns[0]} from {table_name};')
        elif len(columns) == 2:
            self.cur.execute(f'select {columns[0]}, {columns[1]} from {table_name};')
        else:
            self.cur.execute(f'select * from {table_name};')
        return self.cur.fetchall()

    def insertUser(self, userInfo):
        name, email, password = userInfo
        self.cur.execute("INSERT INTO USERS_TB (user_name, user_email, user_password) VALUES (?, ?, ?);", (name, email, password))
        self.con.commit()
    def selectUser(self, email):
        self.cur.execute(f"SELECT user_password FROM USERS_TB WHERE user_email = '{email}';")
        return self.cur.fetchone()
    def insertRent(self, rent_list):
        for book_id in rent_list:
            self.cur.execute(f"INSERT INTO RENT_TB (rent_book_id) VALUES ('{book_id}')")
        self.con.commit()
        return
