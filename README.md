provide a "deck" (see format below) and choose to show any of the clue
keys provided with buttons to toggle the other keys.

    http://example.com/<deck>/<clue>

let's say for instance you'd like to practice writing the characters
for the words in level 1, section 1 of Japanese source "A", then you
could choose the Romaji (rj) clue and get toggle buttons for Japanese
(ja) and English (en) with: 

    http://example.com/ja-a-1-1/rj

reload to shuffle!

## deck format

    decks/{lang}-{source}-{level}-{section}.json:

    { "source":"text or workbook",
      "creator":"user id",
      "version":"year",
      "cards":
      [
        { "ja":"日本語", 
          "rj":"romaji",
          "en":"english" },
      ]
    }

## screenshot

![screen](http://www.archive.org/download/siznax.docs/flashcards.png)


siznax 2012
