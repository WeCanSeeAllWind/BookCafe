from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

con = sqlite3.connect('./sqlite.db')
cur = con.cursor()
# cur.execute("create table family (name varchar(255), age int);")
cur.execute("insert into family values ('lucy', 3), ('babe', 31);")
cur.execute('select * from family;')

con.commit()

res = cur.fetchall();
# res = cur.fetchall();
# print(res)

app = Flask(__name__)
CORS(app)

@app.route('/api', methods=['GET'])
def test():
  x = "You can fly! Don't Forget it. Never... And I think we can"
  return res[0][0]

if __name__ == "__main__":
  app.run(debug=True, host='0.0.0.0')
  # app.run(debug=True)