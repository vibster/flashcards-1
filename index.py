from flashcards import Flashcards

from flask import Flask
from flask import make_response
app = Flask(__name__)

@app.route('/')
def index():
    fc = Flashcards(None,None)
    return fc.putindex()

@app.route('/<deck>/')
@app.route('/<deck>/<clue>/')
def deck(deck=None,clue=None):
    fc = Flashcards(deck,clue)
    return fc.putcard()

if __name__ == '__main__':
    app.debug = True
    app.run()
