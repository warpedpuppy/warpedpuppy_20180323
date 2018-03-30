export default function Level(PIXI, gv){
    return {
        cont: new PIXI.DisplayObjectContainer(),
        text: returnText("level:"),
        amount: returnText(cont.level.toString()),
        width: text.width,
        init: function () {
            cont.y = 10;
            cont.level = 1;
            cont.fruitQ = 5;
            cont.mineQ = 0;
            cont.cloudQ = 3;
            cont.maxFruit = 100;
            cont.maxMines = 10;
            cont.addChild(text);
            amount.x = width;
            cont.addChild(amount);
            this.addContProps();
        },
        returnText: function (str, big) {
            if(big === undefined)
                return new PIXI.BitmapText(str, {font: "30px SpeedballNo2SW", align: "left"});
            else
                return new PIXI.BitmapText(str, {font: "64px bigText", align: "left"});
        },
        addContProps: function () {
            cont.increase = function () {
                cont.level ++;
                if(cont.fruitQ < cont.maxFruit)cont.fruitQ += 5;
                if(cont.mineQ < cont.maxMines)cont.mineQ += 2;
                gv.score.fruit = 0;
                gv.score.reset();
                cont.removeChild(amount);
                amount.setText(cont.level.toString());
                amount.x = width;
                cont.addChild(amount);
                cont.place();
            };
            cont.place = function(){
                cont.x = gv.canvasWidth-cont.width-10;
            };
            cont.place();
        }
    }
}
    
    