/**
 * Created by edwardwalther on 7/11/15.
 */


function Score(){

    var cont = this.cont = new PIXI.DisplayObjectContainer();
    cont.score = 0;

    cont.decreaseBoolean = false;
    this.slowTheDecreaseCounter = 0;

    var scoreText = this.scoreText = returnText("score:");
    var width1 = this.width1 = scoreText.width;
    cont.addChild(scoreText);

    var str = numberWithCommas(cont.score).toString();
    var scoreAmount = this.scoreAmount = returnText(str);
    scoreAmount.x = width1;
    cont.addChild(scoreAmount);



    cont.fruit = 0;

    var fruitText = this.fruitText = returnText("fruit:");
    fruitText.y = scoreText.y + scoreText.height + 10;
    var width2 = this.width2 = fruitText.width;
    cont.addChild(fruitText);

    var str2 = "0/"+gv.fruit.fruitQ.toString();
    var fruitAmount = this.fruitAmount = returnText(str2);
    fruitAmount.y = fruitText.y;
    fruitAmount.x = width2;
    cont.addChild(fruitAmount);


    cont.reset = function(){


        cont.fruit = 0;

        cont.removeChild(scoreAmount);
        str = numberWithCommas(cont.score).toString();
        scoreAmount.setText(str);
        scoreAmount.x = width1;
        cont.addChild(scoreAmount);

        cont.removeChild(fruitAmount);
        str = cont.fruit.toString()+"/"+gv.fruit.fruitQ.toString();
        fruitAmount.setText(str);
        fruitAmount.x = width2;
        cont.addChild(fruitAmount);


        cont.place();


    };

    cont.increase = function(){

        cont.score +=1;
        cont.fruit ++;

        cont.removeChild(scoreAmount);
        str = numberWithCommas(cont.score).toString();
        scoreAmount.setText(str);
        scoreAmount.x = width1;
        cont.addChild(scoreAmount);

        cont.removeChild(fruitAmount);
        str = cont.fruit.toString()+"/"+gv.fruit.fruitQ.toString();
        fruitAmount.setText(str);
        fruitAmount.x = width2;
        cont.addChild(fruitAmount);


        cont.place();


        if(cont.fruit.toString() == gv.level.fruitQ.toString()){
            gv.level.increase();
            gv.levelComplete.addToStage();
        }
    };

    cont.decrease = function(){
        cont.decreaseBoolean = true;
    };


    cont.place = function(){


        cont.x =  gv.level.x = gv.canvasWidth-cont.width-10;
    };
    cont.place();

    cont.classRef = this;
    return cont;




}
Score.prototype.tickIt = function(){


    if(this.cont.fruit > 0){

        var increment;
        if(this.cont.fruit > 20)
            increment = 2;
        else if(this.cont.fruit > 10)
            increment = 5;
        else if(this.cont.fruit > 5)
            increment = 10;
        else
            increment =20;

        if(this.slowTheDecreaseCounter % increment === 0){
            playSound("pop");
            this.cont.score --;
            this.cont.fruit --;

            var str = "";

            this.cont.removeChild(this.scoreAmount);
            str = this.cont.score.toString();
            this.scoreAmount.setText(str);
            this.scoreAmount.x = this.width1;
            this.cont.addChild(this.scoreAmount);

            this.cont.removeChild(this.fruitAmount);
            str = this.cont.fruit.toString()+"/"+gv.fruit.fruitQ.toString();
            this.fruitAmount.setText(str);
            this.fruitAmount.x = this.width2;
            this.cont.addChild(this.fruitAmount);


            this. cont.place();
        }
        this.slowTheDecreaseCounter ++;



    }
    else {
        TweenLite.to(gv.mines.redBackground,0.5, {alpha:0, onComplete:makeInvisible, onCompleteParams:[gv.mines.redBackground]});
        this.slowTheDecreaseCounter = 0;
        this.cont.decreaseBoolean = false;
    }

};