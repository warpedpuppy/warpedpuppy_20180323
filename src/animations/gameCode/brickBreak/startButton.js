/**
 * Created by edwardwalther on 10/12/14.
 */


function StartButton(){


    var cont = new createjs.Container();
    cont.mouseChildren = false;
    cont.cursor = "pointer";
    cont.width = 300;
    cont.height = 50;
    this.cont = cont;

    var background = new createjs.Shape();
    background.shadow = new createjs.Shadow("rgba(32, 45, 21, .5)", 0, 15, 15);
    background.graphics.ss(2).s("#FFFFFF").f("#666666").rr(0,0,cont.width, cont.height, 10).ef();

    var text = new BitmapTextField(300, 30, "press enter to start!", "Mr. Jenkins", -1, 0, 0, "left", "top", !0);
    var bounds = text.getBounds();
    text.x = (cont.width - bounds.width)/2;
    text.y = ((cont.height - bounds.height)/2)-2;


    cont.addChild(background);
    cont.addChild(text);

    cont.addEventListener("click", proxy(this.startGame, this));

    cont.classRef = this;
    return cont;







}


StartButton.prototype.startGame = function(e){

    if(this.cont.visible == true){
        tugtug.bricks.classRef.reset();
        tugtug.gamePlay = true;
        this.cont.visible = false;
        TweenLite.to(tugtug.setting,.5, {alpha:1});
    }



}


StartButton.prototype.endGame = function(){


    tugtug.score.classRef.reset();
    tugtug.lives.classRef.reset();
    tugtug.gamePlay = false;
    this.cont.visible = true;
    //TweenLite.to(tugtug.setting,.5, {alpha:.5});

}