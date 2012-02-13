from flask import render_template

class Flashcards:

    default="ja"

    def __init__(self,deckfile="decks/ja-a-1-1.json"):
        import json
        j = json.load(open(deckfile,'r'))
        self.set_meta(j,deckfile)
        self.deck = j["cards"]

    def set_meta(self,json,deckfile):
        fname = deckfile.split('-')
        self.meta = {'source' :json["source"],
                     'creator':json["creator"],
                     'version':json["version"],
                     'ref'    :fname[1],
                     'level'  :fname[2],
                     'section':fname[3].split('.')[0]}

    def putcard(self,ini):
        if not ini:
            ini=self.default
            base="."
        else:
            base=".."
        import random
        card = self.deck[random.randint(0,len(self.deck)-1)]
        return render_template("card.html",
                               base=base,
                               ini=ini,
                               card=card,
                               meta=self.meta)
