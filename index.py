from flashcards import Flashcards

from flask import Flask
from flask import make_response
app = Flask(__name__)

@app.route('/')
@app.route('/<deck>/')
@app.route('/<deck>/<clue>/')
def index(deck=None,clue=None):
    fc = Flashcards(deck,clue)
    return fc.putcard()

if __name__ == '__main__':
    app.debug = True
    app.run()
