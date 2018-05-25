/**
 * Created by edwardwalther on 2/25/15.
 */


function generateCards(width, height){

    var value = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
    var suits = ["hearts", "spades", "diamonds", "clubs"];
    gv.storeCards = [];
    gv.storeSlots = [];
    var card;

    for(var i = 0; i < 4; i++){

        //gv.slots.push(new Slot(width, height));
        gv.storeSlots.push(new Slot(width, height))

        for(var j = 0; j < 13; j++){

            card = new Card(value[j], suits[i], j, width, height);
            //gv.cards.push(card);
            gv.storeCards.push(card);


        }

    }


}

function reset(){

    gv.cards = [];
    gv.slots = [];
    var counter = 0;

    for(var i = 0; i < 4; i++){

        gv.storeSlots[i].suit = undefined;
        gv.storeSlots[i].value = 0;
        gv.slots.push(gv.storeSlots[i])

        for(var j = 0; j < 13; j++){
            gv.storeCards[counter].x = gv.storeCards[counter].y = 0;
            gv.storeCards[counter].pile = undefined;
            gv.cards.push(gv.storeCards[counter]);
            counter++;


        }

    }

}



function deal(){
    reset();
    shuffle(gv.cards);
    var cardCheck = 0;
    var total = 0;
    var cardYSpacer = 10;
    for(var i = 0; i < 52; i ++){

        gv.cards[i].background.visible = true;

    }

    var str =  gv.totalCards+" cards remaining in pile at the left";
    gv.text = new createjs.Text(str, "bold italic 15px Verdana", "#FFFFFF");

    gv.text.y = -gv.text.getMeasuredHeight()- 30;
    gv.text.x = 100;
    gv.cardCont.addChild(gv.text);

    // first pile of 13
    for(var i = 0; i < 13; i ++){
        //gv.cards[i].y = gv.cards[i].height +(i*1.5)+cardYSpacer;
        gv.cards[i].y = gv.cards[i].height +(i*15)+cardYSpacer;
        gv.cardCont.addChild(gv.cards[i]);
        gv.cards[i].storeX = gv.cards[i].x;
        gv.cards[i].storeY = gv.cards[i].y;
        gv.cards[i].from = "pile13";
        gv.cards[i].cardBack.visible = false;
        gv.pile13.push(gv.cards[i]);
        total ++;
        cardCheck ++;
    }

    var text2 = new createjs.Text("pile13", "bold 10px Verdana", "#FFFFFF");

    text2.y =gv.cards[i].height -10;
    text2.x = 20;
    gv.cardCont.addChild(text2);

    var text3 = new createjs.Text("pile0", "bold 10px Verdana", "#FFFFFF");

    text3.y = text2.y
    text3.x =110;
    gv.cardCont.addChild(text3);

    var text4 = new createjs.Text("pile1", "bold 10px Verdana", "#FFFFFF");

    text4.y = text2.y
    text4.x =190;
    gv.cardCont.addChild(text4);


    var text4 = new createjs.Text("pile2", "bold 10px Verdana", "#FFFFFF");

    text4.y = text2.y
    text4.x =270;
    gv.cardCont.addChild(text4);

    var text4 = new createjs.Text("pile3", "bold 10px Verdana", "#FFFFFF");

    text4.y = text2.y
    text4.x =360;
    gv.cardCont.addChild(text4);

    var text4 = new createjs.Text("flip pile", "bold 10px Verdana", "#FFFFFF");

    text4.y = text2.y
    text4.x =440;
    gv.cardCont.addChild(text4);





    var counter = 1;
    var spacer = 10;
    var slotCounter = 0;
    for( i = 13; i < 17; i ++){
        gv.cards[i].from = "pile"+slotCounter;
        gv.cards[i].x = gv.cards[i].storeX = counter*(gv.cards[i].width+spacer);
        gv.cards[i].y = gv.cards[i].storeY = gv.cards[i].height+cardYSpacer;
        gv.piles[slotCounter].push(gv.cards[i]);
        gv.cards[i].pile = slotCounter;
        //gv.cards[i].addEventListener("pressmove", cardDrag);
        gv.cards[i].cardBack.visible = false;
        gv.cardCont.addChild(gv.cards[i]);

        gv.pileXYs.push(new createjs.Point( gv.cards[i].x, gv.cards[i].y));

        gv.slots[slotCounter].x = counter*(gv.slots[slotCounter].width+spacer);
        gv.slots[slotCounter].y =-20;
        gv.cardCont.addChild(gv.slots[slotCounter]);

        counter++;
        total ++;
        slotCounter++;
        cardCheck ++;
    }

    var yRestart = 0;
    for( i = total; i < 52; i ++){
        gv.cards[i].from = "flip pile";
        gv.cards[i].x = counter*(gv.cards[i].width+spacer);
        gv.cards[i].y =  gv.cards[i].height +(yRestart*.5)+cardYSpacer;
        gv.cards[i].cardBack.visible = true;
        gv.cards[i].background.visible = false;
        yRestart ++;
        gv.cardCont.addChild(gv.cards[i]);
        gv.flipPile.push(gv.cards[i]);
        cardCheck ++;
    }
    //gv.cards[51].addEventListener("mousedown", flip);

    var bounds = gv.cardCont.getBounds();
    gv.cardCont.x = 25;//(gv.halfWidth - bounds.width)/2
    gv.cardCont.y = 50;

    gv.cardCont.scaleX = gv.cardCont.scaleY = .75;

   // print(" cardCheck  = "+  cardCheck)

}

function Card(str1, suit, value, width, height){

    var cont = new createjs.Container();
    cont.width = width;
    cont.height = height;
    cont.storeX;
    cont.storeY;
    cont.value = value;
    cont.suit = suit;
    cont.color = (suit == "spades" || suit == "clubs")?"black":"red";
    cont.pile;

    var arr = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];

    cont.name = arr[cont.value];

    var background = new createjs.Shape;
    background.graphics.setStrokeStyle(1).beginStroke("#000000").beginFill("#FFFFFF").drawRoundRect(0,0,width,height, 5).endStroke().endFill();;
    cont.addChild(background);
    cont.background = background;

    var suitString = suit.substr(0, suit.length-1)
    var icon = new createjs.Bitmap(gv.assetLoader.loader.getResult(suitString));
    icon.x = width - icon.getBounds().width-5;
    icon.y = 5;
    cont.addChild(icon);

    var text1 = new createjs.Text(str1, "bold 10px Verdana", "#000000");
    text1.x = text1.y = 5;
    cont.addChild(text1);
    cont.text1 = text1;


    var text2 = new createjs.Text(suit, "bold 10px Verdana", "#000000");
    text2.x = 5
    text2.y = text1.getMeasuredHeight()+5;
    cont.addChild(text2);
    cont.text2 = text2;

    var cardBack = new createjs.Bitmap(gv.assetLoader.loader.getResult("cardBack"));
    cont.addChild(cardBack);
    cont.cardBack = cardBack;


    cont.mouseChildren = false;
    cont.cursor = 'pointer';
    return cont;





}


