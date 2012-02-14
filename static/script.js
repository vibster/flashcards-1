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
	for (i=0;i<this.json.cards.length;i++) { order[i] = i; }
	if (this.rand==true) {
	    this.order = order.sort(function() {return 0.5 - Math.random()});
	} else {
	    this.order = order;
	}
        $("span#num").html(this.mark+1);
        $("span#count").html(this.order.length);
	this.setOrderHtml();
    }
    this.orderHtml = function() {
	d = [];
	for (i=0;i<this.order.length;i++) {
	    d[i] = (this.order[i]+1).toString();
	}
	d[this.mark] = "<b class=\"bold\">" + d[this.mark] + "</b>";
	return d.join(" ");
    }
    this.setOrderHtml = function() {
	$("div#order").html(this.orderHtml());
    }
    this.setDeck = function(url) {
	this.deck=url;
    }
    this.putCard = function() {
        $("div#ja").html(this.cards[this.order[this.mark]].ja);
        $("div#rj").html(this.cards[this.order[this.mark]].rj);
        $("div#en").html(this.cards[this.order[this.mark]].en);
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
}

function init(id) {
    document.getElementById(id).style.display="block";
    return true;
}

function toggle(id) {
    e = document.getElementById(id);
    if (e.style.display == "none") {
        e.style.display="block";
    } else {
        e.style.display="none";
    }
    return true;
}

$(document).ready(function() {

    fc = new flashcards();
    fc.setDeck('http://127.0.0.1:5000/static/decks/ja-a-1-1.json');
    var r = $.getJSON(fc.deck, function(data) { fc.setJSON(data); })
        .success(function() {})
	.error(function() {alert('OOPS!');});
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
