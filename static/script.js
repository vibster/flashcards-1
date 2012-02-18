var keys = function(obj) {
    var k = [];
    for (var key in obj) {
	k.push(key);
    }
    return k;
}

var flashcards = function(rand) {
    this.rand=true;
    if (rand==false) { this.rand=false; }
    this.deck = null;
    this.json = null;
    this.cards = null;
    this.order = [];
    this.mark = 0;
    this.setJSON = function(data) {
	// alert('really complete');
	this.json = data;
	this.cards = data.cards;
	this.setOrder();
	this.putCard();
    }
    this.setOrder = function() {
	var order = [];
	for (i=0;i<this.cards.length;i++) { order[i] = i; }
	if (this.rand==true) {
	    this.order = order.sort(function() {return 0.5 - Math.random()});
	} else {
	    this.order = order;
	}
        $("span#num").html(this.mark+1);
        $("span#count").html(this.cards.length);
	this.setOrderHtml();
    }
    this.orderHtml = function() {
	d = [];
	for (i=0;i<this.order.length;i++) {
	    d[i] = (this.order[i]+1).toString();
	}
	d[this.mark] = "<b>" + d[this.mark] + "</b>";
	return d.join(" ");
    }
    this.setOrderHtml = function() {
	$("div#order").html(this.orderHtml());
    }
    this.setDeck = function(url) {
	this.deck=url;
    }
    this.putCard = function() {
	var clues = keys(this.cards[this.order[this.mark]]);
	for (var i in clues) {
	    clue = clues[i];
	    html = this.cards[this.order[this.mark]][clue];
            $("div#"+clue).html(html);
	}
	this.setDictLink()
    }
    this.setMarkNext = function() {
	if ( this.mark >= this.order.length-1 ) {
            this.mark = 0;
	} else {
            this.mark += 1;
	}
	$("span#num").html(this.mark+1);
	this.setOrderHtml();
    }
    this.setMarkPrev = function() {
	if ( this.mark < 1 ) {
            this.mark = this.order.length-1;
	} else {
            this.mark -= 1;
	}
	$("span#num").html(this.mark+1);
	this.setOrderHtml();
    }
    this.dictHref = function(lang,term) {
        term = encodeURIComponent(term);
        if (lang=="ja") {
            base="http://jisho.org";
            args="words?jap="+term+"&eng=&dict=edict";
            return base+"/"+args;
        }
        if (lang=="zh") {
            base="http://www.mdbg.net";
            args="chindict/chindict.php?page=worddict&wdrst=1&wdqb="+term;
            return base+"/"+args;
        }
        return false;
    }
    this.setDictLink = function() {
	lang = $("span#dict").attr("lang");
	term = this.cards[this.order[this.mark]][lang];
	href = this.dictHref(lang,term);
	if (href) {
   	    html = '<a target="_blank" href="'+href+'">dict</a>';
	    $("span#dict").html(html);
	}
    }
}

function init() {
    var deck = $("div#card").attr("deck");
    fc.setDeck(deckbase+'/'+deck+'.json');
    return true;
}

var base=window.location.origin;
var deckbase=base+"/flashcards/static/decks"
var fc = new flashcards();

$(document).ready(function() {

    init();

    var r = $.getJSON(fc.deck, function(data) { fc.setJSON(data); })
        .success(function() {})
	.error(function(err) { alert('ERR: could not load deck: '+fc.deck) });

    $("input#next").click(function() {
	if (fc.cards==null) { $("div#msg").html('hmph!'); return false; }
	fc.setMarkNext();
	fc.putCard();
    });

    $("input#prev").click(function() {
	if (fc.cards==null) { $("div#msg").html("hmph!"); return false; }
	fc.setMarkPrev();
	fc.putCard();
    });

});

function toggle(id) {
    var display = $("div#"+id).css("display");
    if ( display == "none") {
        $("div#"+id).css("display","block");
    } else {
        $("div#"+id).css("display","none");
    }
    return true;
}

