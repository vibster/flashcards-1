from flashcards import Flashcards
fc = Flashcards()

from flask import Flask
from flask import make_response
app = Flask(__name__)

@app.route('/')
@app.route('/<ini>/')
def index(ini=None):
    return fc.putcard(ini)

if __name__ == '__main__':
    app.debug = True
    app.run()
