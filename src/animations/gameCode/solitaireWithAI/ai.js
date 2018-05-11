/**
 * Created by edwardwalther on 3/6/15.
 */


function AI(speed) {

    this.str = "<li>thinking</li>";

    this.speed = speed != undefined ? speed : 50;
    this.halfSpeed = this.speed / 2;


    this.shutDownCounter = 0;


}

AI.prototype.changeSpeed = function (num) {

    this.speed = num;
    this.halfSpeed = num / 2;

}

AI.prototype.stop = function () {

    this.shutDownCounter = 0;
    clearTimeout(this.to);
}

AI.prototype.start = function () {


    if (gv.pile13.length == 0) {
        clearTimeout(this.to);
        this.addComment("Finished!");
        gv.text.text = "0 cards remaining in pile at the left!!!!!!!!!!!";
        return;
    }

    var returnArr = this.checkForSlotMatch(this.determineMovableCards());
    var returnArr2 = this.checkForFrom13orFlippedPileMatch();
    var returnArr3 = this.checkForPileToPileMatch();




    if (returnArr.length > 0) {
        this.processData(returnArr, "slot");
    }
    else if (returnArr2.length > 0) {
        this.processData(returnArr2, "pile");
    }
    else if (returnArr3.length > 0) {
        this.processData(returnArr3, "pileToPile");
    }
    else {
        this.processData(undefined, "");
        this.flip();
    }

}

AI.prototype.processData = function (arr, str) {

    if (arr == undefined) {
        this.shutDownCounter++;
        this.addComment("no options available, let's flip.  Shut down counter = " + this.shutDownCounter);

        this.to = setTimeout(proxy(this.start, this), this.speed);

    }
    else if (str == "slot") {

        this.shutDownCounter = 0;

       // this.addComment("I will move the " + arr[0].card.name + " of " + arr[0].card.suit.capitalize() + " to a vacant slot");

        this.moveToSlot(arr[0]);
        this.to = setTimeout(proxy(this.start, this), this.speed);
    }
    else if (str == "pile") {


        this.shutDownCounter = 0;
       // this.addComment("I will move the " + arr[0].card.name + " of " + arr[0].card.suit.capitalize() + " from pile13 to pile" + arr[0].dest);

        this.moveToAPileFromAPile(arr[0]);
        this.to = setTimeout(proxy(this.start, this), this.speed);

    }
    else if (str == "pileToPile") {
        this.shutDownCounter = 0;

        //this.addComment("I will move the " + arr[0].card.name + " of " + arr[0].card.suit.capitalize() + " from pile" + arr[0].card.pile + " to pile" + arr[0].dest);

        this.moveToAPileFromAPile(arr[0]);

        this.to = setTimeout(proxy(this.start, this), this.speed);
    }


    gv.text.text = gv.pile13.length + " cards remaining in pile at the left";



    if (this.shutDownCounter == 30) {
        clearTimeout(this.to);
        this.addComment("Shutting down because it has been too long without a move!")
    }

}

AI.prototype.addComment = function (str) {
    this.str = "<li>" + str + "</li>" + this.str;
    $("#ai").html("<ol reversed>" + this.str + "</ol>");
}


AI.prototype.moveToAPileFromAPile = function (obj) {

    var originPile;
    var moveArray = [];
    moveArray.length = 0;

    var card = obj.card;
    if(obj.from != undefined)card.from = obj.from;


    if (card.pile != undefined) { //this means it is coming from another pile
        originPile = card.pile;
        indexToRemove = gv.piles[originPile].indexOf(card);

        for (var j = indexToRemove; j < gv.piles[originPile].length; j++) {

            moveArray.push(gv.piles[originPile][j]);

        }

        //remove them from gv.piles
        while (gv.piles[originPile].length > indexToRemove) {

            gv.piles[originPile].splice(indexToRemove, 1);
        }


    }
    else {//this means it is coming from the 13 pile or the flipped pile
        moveArray.push(card);

    }

    var dest = obj.dest;
    var topCard = gv.piles[dest].length - 1;


    for (var j = 0; j < moveArray.length; j++) {

        moveArray[j].x = moveArray[j].storeX = gv.piles[dest][topCard].x;
        moveArray[j].y = moveArray[j].storeY = gv.piles[dest][topCard].y + ((j + 1) * 30);

        this.addComment("I will move the " + moveArray[j].name + " of " + moveArray[j].suit.capitalize() + " from "+moveArray[j].from+" to pile" + dest);
        moveArray[j].pile = dest;//gv.piles[dest][topCard].pile;


        gv.piles[gv.piles[dest][topCard].pile].push(moveArray[j]);

        gv.cardCont.setChildIndex(moveArray[j], gv.cardCont.children.length - 1)
    }


    this.to = setTimeout(proxy(continueZ, this), this.halfSpeed);

    function continueZ() {


        // if card coming from is NOT from the 13 and leaves a gap, move one over from 13
        if (originPile != undefined && gv.piles[originPile].length == 0) {

            //print("move card from 13")
            var topCard13 = gv.pile13.length - 1;
            var cardToMove = gv.pile13[topCard13];

            cardToMove.x = cardToMove.storeX = gv.pileXYs[originPile].x;
            cardToMove.y = cardToMove.storeY = gv.pileXYs[originPile].y;

            cardToMove.pile = originPile;

            gv.piles[originPile].push(cardToMove)
            gv.pile13.splice(topCard13, 1);


            if (gv.pile13.length > 0) {
                topCard13 = gv.pile13.length - 1;
            }

            this.addComment("and I will move the " + cardToMove.name + " of " + cardToMove.suit.capitalize() + " from pile13 to pile" + originPile);
        }


        //if the card comes from the 13 pile
        if (gv.pile13.indexOf(card) != -1) {

            var indexToRemove = gv.pile13.indexOf(card);
            var cardToMoveFrom13 = gv.pile13[indexToRemove];

            gv.pile13.splice(indexToRemove, 1);




        }

        if (gv.flippedPile.indexOf(card) != -1) {

            var indexToRemove = gv.flippedPile.indexOf(card);
            var cardToMoveFromFlipped = gv.flippedPile[indexToRemove];

            //this.addComment("and I will move the " + cardToMoveFromFlipped.name + " of " + cardToMoveFromFlipped.suit.capitalize() + " from flip pile to pile" + dest);


            gv.flippedPile.splice(gv.flippedPile.indexOf(card), 1);
        }
    };


}


AI.prototype.moveToSlot = function (obj) {


    for (var i = 0; i < 4; i++) {


        if (gv.slots[i].suit == obj.suit || gv.slots[i].suit == undefined) {


            if (gv.slots[i].suit == undefined)gv.slots[i].suit = obj.suit;


            obj.card.x = gv.slots[i].x;
            obj.card.y = gv.slots[i].y;
            gv.slots[i].value++;
            gv.cardCont.setChildIndex(obj.card, gv.cardCont.children.length - 1);

            this.addComment("I will move the " + obj.card.name + " of " + obj.card.suit.capitalize() + " from "+obj.card.from+" to a vacant slot");

            if (obj.card.pile != undefined)
                gv.piles[obj.card.pile].splice(gv.piles[obj.card.pile].indexOf(obj.card), 1);


            this.to = setTimeout(proxy(continueX, this), this.halfSpeed);
            break;

            function continueX() {


                //move card from 13 pile
                var pile = obj.card.pile;
                if (pile != undefined && gv.piles[pile].length == 0) {
                    var topCard13 = gv.pile13.length - 1;
                    var cardToMove = gv.pile13[topCard13];

                    cardToMove.x = cardToMove.storeX = obj.card.storeX;
                    cardToMove.y = cardToMove.storeY = obj.card.storeY;
                    cardToMove.pile = obj.card.pile;

                    gv.piles[pile].push(cardToMove)
                    gv.pile13.splice(topCard13, 1);


                    if (gv.pile13.length > 0) {
                        topCard13 = gv.pile13.length - 1;
                    }

                    this.addComment("and I will move the " + cardToMove.name + " of " + cardToMove.suit.capitalize() +" from "+cardToMove.from+ " to pile " + pile);
                }

                //if the card comes from the 13 pile
                if (pile == undefined && gv.pile13.indexOf(obj.card) != -1) {

                    var indexToRemove = gv.pile13.indexOf(obj.card);
                    gv.pile13.splice(indexToRemove, 1);


                }

                // is the card from the flip pile
                if (gv.flippedPile.indexOf(obj.card) != -1) {
                    gv.flippedPile.splice(gv.flippedPile.indexOf(obj.card), 1);


                }

                obj.card.pile = undefined;


            }



        }
    }




}

AI.prototype.determineMovableCards = function () {

    //print("here")
    //what cars are available for placement?
    var top13 = {};
    top13.suit = gv.pile13[gv.pile13.length - 1].suit;
    top13.value = gv.pile13[gv.pile13.length - 1].value;
    top13.pile = 13;
    top13.card = gv.pile13[gv.pile13.length - 1];
    //  print(top13);

    // print(gv.piles);
    var topPile0 = {};
    topPile0.suit = gv.piles[0][gv.piles[0].length - 1].suit;
    topPile0.value = gv.piles[0][gv.piles[0].length - 1].value;
    topPile0.pile = 0;
    topPile0.card = gv.piles[0][gv.piles[0].length - 1];
    //print(topPile0);

    var topPile1 = {};
    topPile1.suit = gv.piles[1][gv.piles[1].length - 1].suit;
    topPile1.value = gv.piles[1][gv.piles[1].length - 1].value;
    topPile1.pile = 1;
    topPile1.card = gv.piles[1][gv.piles[1].length - 1];
    //print(topPile1);

    var topPile2 = {};
    topPile2.suit = gv.piles[2][gv.piles[2].length - 1].suit;
    topPile2.value = gv.piles[2][gv.piles[2].length - 1].value;
    topPile2.card = gv.piles[2][gv.piles[2].length - 1];
    topPile2.pile = 2;
    // print(topPile2);

    var topPile3 = {};
    topPile3.suit = gv.piles[3][gv.piles[3].length - 1].suit;
    topPile3.value = gv.piles[3][gv.piles[3].length - 1].value;
    topPile3.card = gv.piles[3][gv.piles[3].length - 1];
    topPile3.pile = 3;
    //  print(topPile3);

    //trace(top13.value+" "+topPile0.value+" "+topPile1.value+" "+topPile2.value+" "+topPile3.value)
    if (gv.flippedPile.length > 0) {

        var flipped = {};
        flipped.suit = gv.flippedPile[gv.flippedPile.length - 1].suit;
        flipped.value = gv.flippedPile[gv.flippedPile.length - 1].value;
        flipped.card = gv.flippedPile[gv.flippedPile.length - 1];
        // flipped.pile = 4;

        // print("flipped card = " + flipped.value)
        return [top13, topPile0, topPile1, topPile2, topPile3, flipped];
    }
    else {
        return [top13, topPile0, topPile1, topPile2, topPile3];
    }


}

AI.prototype.checkForSlotMatch = function (loopArray) {

    var returnArray = [];
    var loopingQ = loopArray.length;
    for (var i = 0; i < 4; i++) {
        // print("slot "+i+"  is "+gv.slots[i].value+" "+gv.slots[i].suit);


        var obj = {};
        obj.value = gv.slots[i].value
        obj.suit = gv.slots[i].suit


        for (var j = 0; j < loopingQ; j++) {

            if (obj.value == loopArray[j].value && (obj.suit == loopArray[j].suit || obj.suit == undefined)) {

                if (returnArray.indexOf(loopArray[j]) === -1) {
                    if (obj.suit == undefined)obj.suit = loopArray[j].suit;
                    returnArray.push(loopArray[j]);
                    break;
                }
            }

        }


    }

    return returnArray;

}

AI.prototype.checkForFrom13orFlippedPileMatch = function () {

    var returnArray = [];

    for (var i = 0; i < 4; i++) {


        var obj = {};
        var topCard = gv.piles[i].length - 1;
        obj.value = gv.piles[i][topCard].value;
        obj.suit = gv.piles[i][topCard].suit;
        obj.color = gv.piles[i][topCard].color;

        var top13 = {};
        top13.suit = gv.pile13[gv.pile13.length - 1].suit;
        top13.value = gv.pile13[gv.pile13.length - 1].value;
        top13.card = gv.pile13[gv.pile13.length - 1];
        top13.color = gv.pile13[gv.pile13.length - 1].color;

        var plusOne = obj.value - 1;

        if ((top13.value == plusOne) && top13.color != obj.color) {

            top13.dest = i;
            top13.from = "pile13";
            if (returnArray.indexOf(top13) === -1)returnArray.push(top13);
        }


        if (gv.flippedPile.length > 0) {
            var f = {};
            f.suit = gv.flippedPile[gv.flippedPile.length - 1].suit;
            f.value = gv.flippedPile[gv.flippedPile.length - 1].value;
            f.card = gv.flippedPile[gv.flippedPile.length - 1];
            f.color = gv.flippedPile[gv.flippedPile.length - 1].color;

            var plusOne = obj.value - 1;

            if ((f.value == plusOne) && f.color != obj.color) {

                f.dest = i;
                f.from = "flip pile";
                if (returnArray.indexOf(f) === -1)returnArray.push(f);
            }
        }


    }

    return returnArray;

}


AI.prototype.checkForPileToPileMatch = function () {

    var returnArray = [];

    for (var i = 0; i < 4; i++) {


        var bottom = {};
        var bottomCard = 0;

        bottom.value = gv.piles[i][bottomCard].value;
        bottom.suit = gv.piles[i][bottomCard].suit;
        bottom.color = gv.piles[i][bottomCard].color;
        bottom.name = gv.piles[i][bottomCard].name;
        bottom.card = gv.piles[i][bottomCard];

        for (var j = 0; j < 4; j++) {

            if (j != i) {
                var top = {};
                var topCard = gv.piles[j].length - 1;
                top.value = gv.piles[j][topCard].value;
                top.suit = gv.piles[j][topCard].suit;
                top.color = gv.piles[j][topCard].color;


                var plusOne = top.value - 1;

                if ((bottom.value == plusOne) && bottom.color != top.color) {
                    bottom.from = "pile"+i;
                    bottom.to = bottom.dest = j;
                    // print("bottom value = "+bottom.value+" "+bottom.from+" "+bottom.to+" "+bottom.name)
                    if (returnArray.indexOf(bottom) === -1)returnArray.push(bottom);
                }


            }


        }


    }

    return returnArray;

}

AI.prototype.flip = function() {



    var remove = []
    for (var i = gv.flipPile.length - 1; i > gv.flipPile.length - 4; i--) {
        if (gv.flipPile[i]) {
            gv.cardCont.setChildIndex(gv.flipPile[i], gv.cardCont.children.length - 1)
            gv.flipPile[i].y = gv.flipPile[i].storeY = 260;
            gv.flipPile[i].storeX = gv.flipPile[i].x;
            gv.flipPile[i].cardBack.visible = false;
            gv.flipPile[i].background.visible = true;
            gv.flippedPile.push(gv.flipPile[i]);
            remove.push(i);
        }


    }

    if (gv.flipPile[remove[remove.length - 1]]) {
        gv.flipPileDragCard = gv.flipPile[remove[remove.length - 1]]
        //  gv.flipPileDragCard.addEventListener("pressmove", cardDrag);
    }

    for (var i = 0; i < remove.length; i++) {
        gv.flipPile.splice(remove[i], 1)
    }

    if (gv.flipPile[gv.flipPile.length - 1]) {
        // gv.flipPile[gv.flipPile.length - 1].addEventListener("mousedown", flip);
    }

    if(gv.flipPile.length  == 0){

        var cardQ = gv.flippedPile.length;
        gv.flippedPile.reverse();
        gv.flipPile = [];
        for (var i = 0; i < cardQ; i++) {

            var cardYSpacer = 10;
            gv.flippedPile[i].y = gv.flippedPile[i].height + (i - .5) + cardYSpacer;
            gv.flippedPile[i].cardBack.visible = true;
            gv.flippedPile[i].background.visible = false;
            gv.cardCont.setChildIndex(gv.flippedPile[i], gv.cardCont.children.length - 1);

            gv.flipPile.push(gv.flippedPile[i]);
        }
        // gv.flippedPile[cardQ - 1].addEventListener("mousedown", flip);


        gv.flippedPile = [];

    }

}