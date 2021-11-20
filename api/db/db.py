import sqlite3

#book 초기데이터 삽입
class DBController():
    def __init__(self):
        self.con = sqlite3.connect('./db/database.db', check_same_thread=False)
        self.cur = self.con.cursor()
    def selectAll(self, table_name, columns):
        if columns == None:
            self.cur.execute(f'select * from {table_name};')
        elif len(columns) == 1:
            self.cur.execute(f'select {columns[0]} from {table_name};')
        elif len(columns) == 2:
            self.cur.execute(f'select {columns[0]}, {columns[1]} from {table_name};')
        else:
            self.cur.execute(f'select * from {table_name};')
        return self.cur.fetchall()
