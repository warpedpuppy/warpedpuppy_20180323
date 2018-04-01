export default function Fruit(gv) {
    return {
        fruitArray: ["banana1.png", "banana2.png", "banana3.png", "banana4.png", "apple1.png", "apple2.png", "apple3.png", "apple4.png", "grapes1.png", "grapes2.png", "grapes3.png", "grapes4.png", "strawberry1.png", "strawberry2.png", "strawberry3.png", "strawberry4.png"],
        fruitCont: new gv.PIXI.particles.ParticleContainer(),
        fruitQ: gv.level.fruitQ,
        nextLevelFruitQ: gv.level.fruitQ,
        storeFruit: [],
        fruits: [],
        init: function () {
            gv.stage.addChild(this.fruitCont);
            this.build();
            this.addToStage();
        },
        build: function () {
            var fruit;
            for (var i = 0; i < this.fruitQ; i++) {
                fruit = new gv.PIXI.Sprite.fromFrame(this.fruitArray[gv.utils.randomIntBetween(0,this.fruitArray.length-1)]);
                fruit.scale.x = fruit.scale.y = 0.5;
                fruit.anchor.x = 0.5;

                this.fruits.push(fruit);
                this.storeFruit.push(fruit);
            }
        },
        addMoreFruit: function () {
            var additionalFruit = gv.level.fruitQ - this.fruitQ;
            var fruit;
            for (var i = 0; i < additionalFruit; i++) {
                fruit = new gv.PIXI.Sprite.fromFrame(this.fruitArray[gv.utils.randomIntBetween(0,this.fruitArray.length-1)]);
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
                fruit.rotation = gv.utils.deg2rad(90);
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
            gv.utils.playSound("crunch");
        },
        addToStage: function () {
            var fruit;
            for (var i = 0; i < this.fruitQ; i++) {

                fruit = this.fruits[i];
                fruit.pivot.x = 0.5;
                fruit.pivot.y = 0;
                fruit.alpha = 1;
                fruit.visible = true;
                fruit.scale.x = fruit.scale.y = 0.5;
                fruit.rotQ = gv.utils.randomNumberBetween(0.001, 0.005);
                fruit.y = gv.utils.randomNumberBetween(0, gv.canvasHeight);
                fruit.x = gv.utils.randomNumberBetween(0, gv.canvasWidth);//gv.canvasWidth/2;//

                this.fruitCont.addChild(fruit);

            }
        }
    }
}