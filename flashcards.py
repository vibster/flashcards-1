from flask import render_template

class Flashcards:

    default="ja"

    def __init__(self,deckfile="decks/c001.json"):
        import json
        self.deck = json.load(open(deckfile,'r'))

    def putcard(self,ini):
        if not ini:
            ini=self.default
            base="."
        else:
            base=".."
        import random
        card = self.deck[random.randint(0,len(self.deck)-1)]
        return render_template("card.html",base=base,ini=ini,card=card)

