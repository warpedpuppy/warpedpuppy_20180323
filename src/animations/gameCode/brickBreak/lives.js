/**
 * Created by edwardwalther on 10/10/14.
 */


function Lives(){

    var num = 2;
    var cont = new createjs.Container();

    this.storeLives = num;

    var scoreText = new BitmapTextField(100, 50, "lives: ", "Mr. Jenkins", -1, 0, 0, "left", "top", !0);
    var numberText = new BitmapTextField(1000, 50, num, "Mr. Jenkins", -1, 0, 0, "left", "top", !0);
    this.numberText = numberText;
    numberText.x = 100;
    cont.addChild(scoreText);
    cont.addChild(numberText);
    cont.classRef = this;
    this.num = num;
    cont.cache(0,0,1000,50);
    this.cont = cont;
    return cont;
}

Lives.prototype.reset = function(){
    this.cont.uncache();
    this.num = this.storeLives;
    this.numberText.setText(this.num);
    this.cont.cache(0,0,1000,50);
}


Lives.prototype.loseLife = function(){
    this.cont.uncache();
    if(this.num > 0){
        this.num--;
        this.numberText.setText(this.num);
    }
    else{
        tugtug.startButton.classRef.endGame();
    }

    this.cont.cache(0,0,1000,50);

}