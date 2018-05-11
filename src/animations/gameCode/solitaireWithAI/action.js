/**
 * Created by edwardwalther on 2/26/15.
 */


function cardDrag(e) {

//print("press")
    var globalPoint = gv.cardCont.globalToLocal(stage.mouseX, stage.mouseY);

    var card = e.target;
    gv.cardCont.setChildIndex(card, gv.cardCont.children.length - 1) //let's move this somewhere that it won't continually fire
    card.x = globalPoint.x - 30;
    card.y = globalPoint.y - 30;

    card.addEventListener("pressup", cardRelease);

    if (card.pile != undefined) {
        //print("this card is in pile: " + card.pile + " and that pile has " + gv.piles[card.pile].length + " cards in it")


        var cardIndex = gv.piles[card.pile].indexOf(card) + 1;
        var cardYCounter = 1;
        for (var i = cardIndex; i < gv.piles[card.pile].length; i++) {

            var nextCard = gv.piles[card.pile][i];
            nextCard.x = card.x;
            nextCard.y = card.y + (cardYCounter*30);
            cardYCounter ++;
            gv.cardCont.setChildIndex(nextCard, gv.cardCont.children.length - 1)


        }
    }



}


function cardRelease(e) {
    e.target.removeEventListener("pressup", cardRelease);

    var slotHit = false;

    var rect1 = new createjs.Rectangle(e.target.x, e.target.y, e.target.width, e.target.height);
    var rect2;
    var rect3;
    var topCard;


    for (var i = 0; i < 4; i++) {
        rect2 = new createjs.Rectangle(gv.slots[i].x, gv.slots[i].y, gv.slots[i].width, gv.slots[i].height);

        topCard = gv.piles[i].length - 1;



        rect3 = new createjs.Rectangle(gv.piles[i][topCard].x, gv.piles[i][topCard].y, gv.piles[i][topCard].width, gv.piles[i][topCard].height);

        var cardPileTop = gv.piles[i][topCard].value - 1;

        if (rectangleRectangleCollisionDetection(rect1, rect2) //DRAG TO SLOTS
            && e.target.value == gv.slots[i].value
            && (gv.slots[i].suit == undefined || gv.slots[i].suit == e.target.suit)) {


            if(gv.slots[i].suit == undefined){
                gv.slots[i].suit = e.target.suit

            }

            e.target.x = gv.slots[i].x;
            e.target.y = gv.slots[i].y;
            gv.slots[i].value++;

            e.target.removeEventListener("pressmove", cardDrag);

            slotHit = true;

            //remove it from piles array && gv.piles[e.target.pile].indexOf(e.target) != -1


            if (e.target.pile != undefined) {

                gv.piles[e.target.pile].splice(gv.piles[e.target.pile].indexOf(e.target), 1);


            }


            //move card from 13 pile if the space is blank

            if(e.target.pile != undefined && gv.piles[e.target.pile].length == 0){
                var topCard13 = gv.pile13.length - 1;
                var cardToMove = gv.pile13[topCard13];

                cardToMove.x = cardToMove.storeX = e.target.storeX;
                cardToMove.y = cardToMove.storeY = e.target.storeY;
                cardToMove.pile = e.target.pile;
                if (!cardToMove.hasEventListener("pressmove"))cardToMove.addEventListener("pressmove", cardDrag);

                gv.piles[e.target.pile].push(cardToMove)
                gv.pile13.splice(topCard13, 1);

                if(gv.pile13.length > 0){
                    topCard13 = gv.pile13.length - 1;
                    gv.pile13[topCard13].addEventListener("pressmove", cardDrag);
                }


            }

            //if the card comes from the 13 pile
            if(gv.pile13.indexOf(e.target)!= -1){

                var indexToRemove = gv.pile13.indexOf(e.target);
                gv.pile13.splice(indexToRemove, 1);

                gv.pile13[gv.pile13.length-1].addEventListener("pressmove", cardDrag);


            }



            // is the card from the flip pile
            if (gv.flippedPile.indexOf(e.target) != -1){
                gv.flippedPile.splice(gv.flippedPile.indexOf(e.target), 1);
                //add listener to the next card
                gv.flippedPile[gv.flippedPile.length-1].addEventListener("pressmove", cardDrag)

            }

            e.target.pile = undefined;
            break;
        }
        else if (rectangleRectangleCollisionDetection(rect1, rect3)//DRAG ONTO OTHER CARD
            && e.target.color != gv.piles[i][topCard].color
            && e.target.value == (gv.piles[i][topCard].value - 1)) {



            var originPile;
            var moveArray = [];
            moveArray.length = 0;

            if(e.target.pile != undefined){ //this means it is coming from another pile
                originPile = e.target.pile;
                indexToRemove = gv.piles[originPile].indexOf(e.target);

                for(var j = indexToRemove; j < gv.piles[originPile].length; j ++){

                    moveArray.push(gv.piles[originPile][j]);

                }

                //remove them from gv.piles
                while(gv.piles[originPile].length > indexToRemove){

                    gv.piles[originPile].splice(indexToRemove, 1);
                }



            }
            else{//this means it is coming from the 13 pile
                moveArray.push(e.target);
            }


            for(var j = 0; j < moveArray.length; j++){

                moveArray[j].x =  moveArray[j].storeX = rect3.x;
                moveArray[j].y =  moveArray[j].storeY = rect3.y + ((j+1)*30);


                moveArray[j].pile = gv.piles[i][topCard].pile;

               // print("moving card "+j+" to "+gv.piles[i][topCard].pile)
                gv.piles[gv.piles[i][topCard].pile].push( moveArray[j]);
            }




            slotHit = true;

            if(originPile != undefined && gv.piles[originPile].length == 0){

                //print("move card from 13")
                var topCard13 = gv.pile13.length - 1;
                var cardToMove = gv.pile13[topCard13];

                cardToMove.x = cardToMove.storeX = gv.pileXYs[originPile].x;
                cardToMove.y = cardToMove.storeY = gv.pileXYs[originPile].y;

                cardToMove.pile = originPile;
                if (!cardToMove.hasEventListener("pressmove"))cardToMove.addEventListener("pressmove", cardDrag);

                gv.piles[originPile].push(cardToMove)
                gv.pile13.splice(topCard13, 1);

                if(gv.pile13.length > 0){
                    topCard13 = gv.pile13.length - 1;
                    gv.pile13[topCard13].addEventListener("pressmove", cardDrag);
                }


            }

            //if the card comes from the 13 pile
            if(gv.pile13.indexOf(e.target)!= -1){

                var indexToRemove = gv.pile13.indexOf(e.target);
                gv.pile13.splice(indexToRemove, 1);

                if(gv.pile13.length > 0){
                    topCard13 = gv.pile13.length - 1;
                    gv.pile13[topCard13].addEventListener("pressmove", cardDrag);
                }


            }



            if (gv.flippedPile.indexOf(e.target) != -1){
                gv.flippedPile.splice(gv.flippedPile.indexOf(e.target), 1);
                gv.flippedPile[gv.flippedPile.length-1].addEventListener("pressmove", cardDrag)
            }
            break;
        }


    }


    if (!slotHit) {

        if (e.target.pile != undefined) {
            for (var i = 0; i < gv.piles[e.target.pile].length; i++) {

                var card = gv.piles[e.target.pile][i];
                card.x = card.storeX;
                card.y = card.storeY;
            }
        }
        else {
            e.target.x = e.target.storeX;
            e.target.y = e.target.storeY;
        }

    }


    if(gv.pile13.length == 0){
        gv.cardCont.alpha = .25;
        gv.cardCont.mouseEnabled = false;
        gv.cardCont.mouseChildren = false;
        print("done!")

    }

}

