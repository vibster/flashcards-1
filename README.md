# flashcards

this web app differs from most web-based flashcards in that it offers
any number of clues on each card (in about 300 lines of code). provide
a "deck" and choose to show any of the clue keys provided with buttons
to toggle the other keys.  

in the case of the Japanese decks i've provided, you can select
Japanese (ja), the English (en) translation, or the Latin (la)
transliteration as your clue. buttons appear for each of the other
clues so that they can be exposed in a "sticky" manner. each page load
shuffles the deck in random order. the list below the clues highlights
which card is currently displayed. you can expose other clues or visit
a popular online dictionary for the term. reload to shuffle.

let's say you'd like to practice writing the characters for the words
in level 1, section 1 of Japanese source "A", then you could choose
the [la] \(latin romanization\) clue and get toggle buttons for
Japanese [ja] and English [en] with
<tt>flashcards.example.com/ja-a-1-1/la</tt> 

each "deck" is a JSON file (see this
[example](https://github.com/siznax/flashcards/tree/master/static/decks))
that specifies several clues for each card, but **there's no reason each
deck couldn't be extended with say French (fr), Spanish (es), and
Russian (ru) clues too.**

i hope you find the cards i'm using useful. contributions more than
welcome. please fork or clone. 

siznax 2012


![](https://github.com/siznax/flashcards/raw/master/static/screen.png)



