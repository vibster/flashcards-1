from flask import Flask
app = Flask(__name__)

import flashcards.views

# this package wants something external to run app
# see http://flask.pocoo.org/docs/patterns/packages/
