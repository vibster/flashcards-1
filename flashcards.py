from flask import render_template

class Flashcards:

    decks_base = "static/decks"

    # augmented ISO 639-1 (eventually, subject codes)
    lang_code = {'ja':"Japanese",
                 'zh':"Chinese",
                 'en':"English",
                 'la':"Roman"}

    def __init__(self,deck,clue):
        if not deck and not clue:
            self.base = "."
            return 
        self.set_deck(deck)
        self.set_card()
        self.set_meta()
        self.clue = clue or self.deck.split('-')[0]
        if deck and clue:
            self.base = "../.."
        if (deck and not clue) or (clue and not deck):
            self.base = ".."

    def set_deck(self,deck):
        self.deck = deck
        import os
        deck_file = "%s/%s.json" % (self.decks_base,self.deck)
        if not os.path.exists(deck_file):
            self.json = None
            self.cards = None
            self.lang = None
            return 
        import json
        self.json = json.load(open(deck_file,'r'))
        self.jsonurl = self.decks_base + "/" + self.deck + ".json"
        self.cards = self.json["cards"]
        self.lang = self.deck.split('-')[0]

    def set_card(self,rand=False):
        if not self.cards:
            self.card = None
            return 
        num = 0
        if rand:
            import random
            num = random.randint(0,len(self.cards)-1)
        self.card = self.cards[num]
        self.card['clues'] = self.card.keys()
        self.card['num'] = num+1
        self.card['count'] = len(self.cards)
        
    def dict_href(self):
        if not hasattr(self,'card'):
            return None
        import urllib
        if self.lang == "ja":
            base = "http://jisho.org"
            arg  = urllib.quote(self.card[self.lang].encode('utf-8'))
            args = "words?jap=%s&eng=&dict=edict" % (arg)
        else:
            return None
        return "%s/%s" % (base,args)

    def set_meta(self):
        if not self.json:
            self.meta = None
            return 
        self.meta = {'deck'   :self.deck,
                     'jsonurl':self.jsonurl,
                     'source' :self.json["source"],
                     'creator':self.json["creator"],
                     'version':self.json["version"],
                     'srcref' :self.deck.split('-')[1],
                     'level'  :self.deck.split('-')[2],
                     'section':self.deck.split('-')[3],
                     'lang'   :self.lang,
                     'langstr':self.lang_code[self.lang],
                     'dict'   :self.dict_href(),
                     'count'  :len(self.cards)}
        
    def putcard(self):
        if not self.card:
            return render_template('404.html'), 404
        return render_template("card.html",
                               clue = self.clue,
                               base = self.base,
                               card = self.card,
                               meta = self.meta)

    def putindex(self):
        decks = list()
        import glob
        for fname in glob.glob("%s/*.json" % (self.decks_base)):
            key = fname.split('/')[-1].split('.')[0]
            try:
                self.set_deck(key)
            except:
                msg = "ERROR: could not load %s" % (self.deck)
                return render_template("error.html",msg=msg)
            self.set_meta()
            decks.append({'key':key,'meta':self.meta})
        return render_template("index.html",base=self.base,decks=decks)
