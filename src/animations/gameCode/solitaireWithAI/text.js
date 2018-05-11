/**
 * Created by edwardwalther on 2/28/15.
 */

function Title(){

    var cont = new createjs.Container();
    cont.height = 0;

    var str = "this is going to be an experiment in solitaire AI";
    var text = new createjs.Text(str, "bold 15px Verdana", "#000000")

    var height = text.getMeasuredHeight();
    cont.height += height;
    cont.addChild(text);


    str = "This is currently playable, though.";
    text = new createjs.Text(str, "bold 15px Verdana", "#000000")
    text.y =height;
    height = text.getMeasuredHeight();
    cont.height += height;
    cont.addChild(text);

    str = "Click on pile to the right to cycle through three at a time.";
    text = new createjs.Text(str, "bold 15px Verdana", "#000000")
    text.y =height;
    height = text.getMeasuredHeight();
    cont.height += height;
    cont.addChild(text);


    return cont;


}