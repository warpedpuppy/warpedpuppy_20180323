export default function Level(PIXI, gv){
    return {
        cont: new PIXI.Container(),
        text: "",
        width: 100,
        mineQ: 0,
        fruitQ: 1,
        cloudQ: 3,
        maxFruit: 100,
        maxMines: 10,
        level: 1,
        y: 10,
        init: function () {
            let cont = this.cont;
            cont.y = 10;
            let amount = this.returnText(this.level.toString());
            this.text = this.returnText("level:"),
            cont.addChild(this.text);
            amount.x = this.width;
            cont.addChild(amount);
            this.addContProps();
        },
        returnText: function (str, big) {
            if(big === undefined)
                return new PIXI.BitmapText(str, {font: "30px SpeedballNo2SW", align: "left"});
            else
                return new PIXI.BitmapText(str, {font: "64px bigText", align: "left"});
        },
        increase: function () {
            let cont = this.cont;
            this.level ++;
            if(cont.fruitQ < cont.maxFruit)cont.fruitQ += 5;
            if(cont.mineQ < cont.maxMines)cont.mineQ += 2;
            gv.score.fruit = 0;
            gv.score.reset();
            cont.removeChild(this.amount);
            this.amount.setText(this.level.toString());
            this.amount.x = this.width;
            cont.addChild(this.amount);
            cont.place();
        },
        place: function(){
            let cont = this.cont;
            cont.x = gv.canvasWidth-cont.width-10;
        }
    }
}
    
    