export default function Level(gv){
    return {
        cont: new gv.PIXI.Container(),
        text: "",
        width: 100,
        mineQ: 3,
        fruitQ: 10,
        cloudQ: 3,
        maxFruit: 100,
        maxMines: 10,
        level: 1,
        init: function () {
            let cont = this.cont;
            cont.y = 70;
            let amount = this.amount = this.returnText(this.level.toString());
            this.text = this.returnText("level:");
            cont.addChild(this.text);
            amount.x = this.width;
            cont.addChild(amount);
            gv.stage.addChild(cont);
            this.place();
        },
        resize: function () {
            this.place();
        },
        returnText: function (str, big) {
            if(big === undefined)
                return new gv.PIXI.extras.BitmapText(str, {font: "30px SpeedballNo2SW", align: "left"});
            else
                return new gv.PIXI.extras.BitmapText(str, {font: "64px bigText", align: "left"});
        },
        increase: function () {
            let cont = this.cont;
            this.level ++;
            if(this.fruitQ < this.maxFruit)this.fruitQ += 5;
            if(this.mineQ < this.maxMines)this.mineQ += 2;
            gv.score.fruit = 0;
            gv.score.reset();
            cont.removeChild(this.amount);
            this.amount.text = this.level.toString();
            this.amount.x = this.width;
            cont.addChild(this.amount);
            this.place();
        },
        place: function () {
            this.cont.x = (gv.halfWidth-(this.cont.width/2));
        }
    }
}
    
    