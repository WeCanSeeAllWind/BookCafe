from flask import Flask
from flask_cors import CORS
from blueprints.book import book

app = Flask(__name__)
app.register_blueprint(book)
CORS(app)

@app.route('/api', methods=['GET'])
def test():
  x = "You can fly! Don't Forget it. Never... And I think we can"
  return x

if __name__ == "__main__":
  app.run(debug=True, host='0.0.0.0')
  # app.run(debug=True)