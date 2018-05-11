/**
 * Created by edwardwalther on 2/26/15.
 */


function Slot(width, height){

    var cont = new createjs.Container();
    cont.width = width;
    cont.height = height;
    cont.value = 0;
    cont.suit;

    var background = new createjs.Shape;
    background.graphics.setStrokeStyle(3).beginStroke("#FFFFFF").beginFill("#333333").drawRect(0,0,width,height).endStroke().endFill();;
    cont.addChild(background);

    var text1 = new createjs.Text("", "bold 10px Verdana", "#000000");
    cont.addChild(text1);


    cont.mouseChildren = false;
    return cont;


}

