export default function Score (PIXI, Utils, gv, TweenLite) {
    return {
        cont: new PIXI.Container(),
        str: "",
        decreaseBoolean: false,
        init: function () {
            this.scoreText = Utils.returnText("score:");
            let str = this.str;
            let cont = this.cont;
            cont.score = 0;
            str = Utils.numberWithCommas(cont.score).toString();
            this.decreaseBoolean = false;
            this.slowTheDecreaseCounter = 0;
            var width1 = this.width1 = this.scoreText.width;
            cont.addChild(this.scoreText);
            var scoreAmount = this.scoreAmount = Utils.returnText(str);
            scoreAmount.x = width1;
            cont.addChild(scoreAmount);
            cont.fruit = 0;
            var fruitText = this.fruitText = Utils.returnText("fruit:");
            fruitText.y = this.scoreText.y + this.scoreText.height + 10;
            var width2 = this.width2 = fruitText.width;
            cont.addChild(fruitText);
            var str2 = "0/"+gv.fruit.fruitQ.toString();
            var fruitAmount = this.fruitAmount = Utils.returnText(str2);
            fruitAmount.y = fruitText.y;
            fruitAmount.x = width2;
            cont.addChild(fruitAmount);
            cont.place();
            cont.classRef = this;
        },
        reset: function () {
            let str = this.str;
            let cont = this.cont;
            cont.fruit = 0;
            cont.removeChild(this.scoreAmount);
            str = Utils.numberWithCommas(cont.score).toString();
            this.scoreAmount.setText(str);
            this.scoreAmount.x = this.width1;
            cont.addChild(this.scoreAmount);

            cont.removeChild(this.fruitAmount);
            str = cont.fruit.toString()+"/"+gv.fruit.fruitQ.toString();
            this.fruitAmount.setText(str);
            this.fruitAmount.x = this.width2;
            cont.addChild(this.fruitAmount);
            cont.place();
        },
        increase: function () {
            let str = this.str;
            this.cont.score +=1;
            this.cont.fruit ++;
            this.cont.removeChild(this.scoreAmount);
            str = Utils.numberWithCommas(this.cont.score).toString();
            this.scoreAmount.setText(str);
            this.scoreAmount.x = this.width1;
            this.cont.addChild(this.width1scoreAmount);
            this.cont.removeChild(this.fruitAmount);
            str = this.cont.fruit.toString()+"/"+gv.fruit.fruitQ.toString();
            this.fruitAmount.setText(str);
            this.fruitAmount.x = this.width2;
            this.cont.addChild(this.fruitAmount);
            this.cont.place();
            if(this.cont.fruit.toString() == gv.level.fruitQ.toString()){
                gv.level.increase();
                gv.levelComplete.addToStage();
            }
        },
        decrease: function () {
            this.cont.decreaseBoolean = true;
        },
        place: function () {
            this.cont.x =  gv.level.x = gv.canvasWidth-this.cont.width-10;
        },
        tickIt: function () {
            let str = this.str;
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
                    this.playSound("pop");
                    this.cont.score --;
                    this.cont.fruit --;
                    str = "";
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
            } else {
                TweenLite.to(gv.mines.redBackground,0.5, {alpha:0, onComplete:Utils.makeInvisible, onCompleteParams:[gv.mines.redBackground]});
                this.slowTheDecreaseCounter = 0;
                this.cont.decreaseBoolean = false;
            }
        }
    }

}