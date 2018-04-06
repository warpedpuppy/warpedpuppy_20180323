/**
 * Created by edwardwalther on 10/10/14.
 */


function Score(){

    var num = 0;
    var cont = new createjs.Container();

    var scoreText = new BitmapTextField(100, 50, "score: ", "Mr. Jenkins", -1, 0, 0, "left", "top", !0);
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

Score.prototype.increase = function(){
    this.cont.uncache();
    this.num ++
    this.numberText.setText(this.num);
    this.cont.cache(0,0,1000,50);

}



Score.prototype.reset = function(){
    this.cont.uncache();
    this.num = 0;
    this.numberText.setText(this.num);
    this.cont.cache(0,0,1000,50);
}



