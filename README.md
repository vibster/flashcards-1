# flashcards

provide a "deck" (see format below) and choose to show any of the clue
keys provided with buttons to toggle the other keys.

    http://localhost/<deck>/[clue]

let's say you'd like to practice writing the characters for the words
in level 1, section 1 of Japanese source "A", then you could choose
the Romaji [la] (latin romanization) clue and get toggle buttons for
Japanese [ja] and English [en] with:

    http://localhost/ja-a-1-1/rj

the deck {lang} is the default clue. reload to shuffle!

# TODO

    [ ] make "lang" abstract, i.e. "subj", "subjstr"
    [ ] consider ordered "clues" member in deck JSON
    [ ] keyboard shortcuts

## deck format

    decks/{lang}-{source}-{level}-{section}.json:

    { "source":"text or workbook",
      "creator":"user id",
      "version":"year",
      "cards":
      [
        { "ja":"日本語", 
          "la":"latin (romaji)",
          "en":"english" },
      ]
    }

## screenshot

![screen](https://github.com/siznax/flashcards/raw/master/static/screen.png)


siznax 2012
