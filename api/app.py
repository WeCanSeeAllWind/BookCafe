from flask import Flask
from flask_cors import CORS
from blueprints.book import book
from blueprints.user import user
from blueprints.review import review
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.register_blueprint(book)
app.register_blueprint(user)
app.register_blueprint(review)
app.config['SECRET_KEY'] = 'I am your father'
app.config['BCRYPT_LEVEL'] = 10
bcrypt = Bcrypt(app)
CORS(app)

@app.route('/api', methods=['GET'])
def test():
  x = "You can fly! Don't Forget it. Never... And I think we can"
  return x

if __name__ == "__main__":
  app.run(debug=True, host='0.0.0.0')
  # app.run(debug=True)