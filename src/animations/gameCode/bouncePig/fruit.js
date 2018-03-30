export default function Fruit() {
    return {
        fruitArray: ["banana1.png", "banana2.png", "banana3.png", "banana4.png", "apple1.png", "apple2.png", "apple3.png", "apple4.png", "grapes1.png", "grapes2.png", "grapes3.png", "grapes4.png", "strawberry1.png", "strawberry2.png", "strawberry3.png", "strawberry4.png"],
        fruitCont: new PIXI.SpriteBatch(),
        fruitQ: gv.level.fruitQ,
        nextLevelFruitQ: this.fruitQ,
        storeFruit: [],
        fruits: [],
        init: function () {
            gv.stage.addChild(this.fruitCont);
            this.build();
        },
        build: function () {
            var fruit;
            for (var i = 0; i < this.fruitQ; i++) {
                fruit = new PIXI.Sprite.fromFrame(this.fruitArray[randomIntBetween(0,this.fruitArray.length-1)]);
                fruit.scale.x = fruit.scale.y = 0.5;
                fruit.anchor.x = 0.5;
                this.storeFruit.push(fruit);\
            }
        },
        addMoreFruit: function () {
            var additionalFruit = gv.level.fruitQ - this.fruitQ;
            var fruit;
            for (var i = 0; i < additionalFruit; i++) {
                fruit = new PIXI.Sprite.fromFrame(this.fruitArray[randomIntBetween(0,this.fruitArray.length-1)]);
                fruit.scale.x = fruit.scale.y = 0.5;
                fruit.anchor.x = 0.5;

                this.storeFruit.push(fruit);
            }
            this.fruitQ = gv.level.fruitQ;
        },
        reset: function () {
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
                this.fruits.push(fruit);
            }
            return this.fruits;
        },
        eat: function (fruit) {
            this.fruitCont.removeChild(fruit);
            this.fruits.splice(this.fruits.indexOf(fruit),1);
            playSound("crunch");
        },
        addToStage: function () {
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
        }
    }
}