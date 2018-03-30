/**
 * Created by edwardwalther on 7/11/15.
 */



function Fruit() {


    this.fruitArray = ["banana1.png", "banana2.png", "banana3.png", "banana4.png", "apple1.png", "apple2.png", "apple3.png", "apple4.png", "grapes1.png", "grapes2.png", "grapes3.png", "grapes4.png", "strawberry1.png", "strawberry2.png", "strawberry3.png", "strawberry4.png"];

    this.fruitCont = new PIXI.SpriteBatch();
    gv.stage.addChild(this.fruitCont);
    this.fruits = [];
    this.fruitQ = gv.level.fruitQ;
    this.nextLevelFruitQ = this.fruitQ;

    this.storeFruit = [];
    this.build();



}

Fruit.prototype.build = function(){
    var fruit;
    for (var i = 0; i < this.fruitQ; i++) {
        fruit = new PIXI.Sprite.fromFrame(this.fruitArray[randomIntBetween(0,this.fruitArray.length-1)]);
        fruit.scale.x = fruit.scale.y = 0.5;
        fruit.anchor.x = 0.5;

        this.storeFruit.push(fruit);
        //this.fruits.push(fruit);
    }

};

Fruit.prototype.addMoreFruit = function(){

    var additionalFruit = gv.level.fruitQ - this.fruitQ;

    var fruit;
    for (var i = 0; i < additionalFruit; i++) {
        fruit = new PIXI.Sprite.fromFrame(this.fruitArray[randomIntBetween(0,this.fruitArray.length-1)]);
        fruit.scale.x = fruit.scale.y = 0.5;
        fruit.anchor.x = 0.5;

        this.storeFruit.push(fruit);
        //this.fruits.push(fruit);
    }
    this.fruitQ = gv.level.fruitQ;
};


Fruit.prototype.reset = function(){

    this.fruitCont.removeChildren();
    var fruit;
    this.fruits.length = 0;
    for (var i = 0; i < this.fruitQ; i++) {
        fruit = this.storeFruit[i];
        fruit.rotation = deg2rad(0);
        fruit.x = fruit.y = 0;
        fruit.scale.x = fruit.scale.y = 0.5;
        fruit.anchor.x = 0.5;
        fruit.anchor.y = 0;
        fruit.alpha = 1;
        fruit.visible = true;
       // if(fruit.parent !== null)fruit.parent.removeChild(fruit);
        this.fruits.push(fruit);
    }

    return this.fruits;

};
Fruit.prototype.eat = function(fruit){
    this.fruitCont.removeChild(fruit);
    this.fruits.splice(this.fruits.indexOf(fruit),1);
    playSound("crunch");
};


Fruit.prototype.addToStage = function(){
    var fruit;

    for (var i = 0; i < this.fruitQ; i++) {

        fruit = this.fruits[i];
        fruit.anchor.x = 0.5;
        fruit.anchor.y = 0;
        fruit.alpha = 1;
        fruit.visible = true;
        fruit.scale.x = fruit.scale.y = 0.5;
        fruit.rotQ = randomNumberBetween(0.001, 0.005);
        fruit.y = randomNumberBetween(0, gv.canvasHeight);
        fruit.x = randomNumberBetween(0, gv.canvasWidth);

        this.fruitCont.addChild(fruit);

    }

};