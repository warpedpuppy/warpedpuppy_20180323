export default function Level(PIXI, gv){

    var cont = new PIXI.DisplayObjectContainer();
    cont.y = 10;
    cont.level = 1;
    cont.fruitQ = 5;
    cont.mineQ = 0;
    cont.cloudQ = 3;

    cont.maxFruit = 100;
    cont.maxMines = 10;

    function  returnText(str, big) {
        if(big === undefined)
            return new PIXI.BitmapText(str, {font: "30px SpeedballNo2SW", align: "left"});
        else
            return new PIXI.BitmapText(str, {font: "64px bigText", align: "left"});
    };
    var text = returnText("level:");
    var width = text.width;
    cont.addChild(text);

    var amount = returnText(cont.level.toString());
    amount.x = width;
    cont.addChild(amount);



    cont.increase = function(){
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


    return cont;




}