export default function NextLevelScreen (gv, StoreScore, Mines, Clouds, Drums, PIXI, TweenLite, TimelineLite,Utils) {
    return {
        storeScore: new StoreScore(),
        mines: Mines.init(),
        clouds: Clouds.init(),
        drums:  Drums.init(),
        ON_STAGE:  false,
        startButton:  new PIXI.Sprite.fromFrame("startButton.png"),
        nextLevelButton: new PIXI.Sprite.fromFrame("nexLevelButton.png"),
        dot1: gv.bouncePlatform.dot1,
        dot2: gv.bouncePlatform.dot2,
        line: gv.bouncePlatform.line,
        fruitCont: new PIXI.ParticleContainer(),
        init: function () {
            //core.y = gv.level.height + 10;
            this.startButton.anchor.x = this.startButton.anchor.y = 0.5;
            this.startButton.x = gv.halfWidth;
            this.startButton.y = gv.halfHeight - 30;
            this.nextLevelButton.anchor.x = this.startButton.anchor.y = 0.5;
            this.nextLevelButton.x = gv.halfWidth;
            this.nextLevelButton.y = gv.halfHeight - 50;
        },
        resize: function () {
            let gv = this.gv;
            if(this.ON_STAGE === true){
                gv.hero.x = gv.halfWidth;
                this.startButton.x = gv.halfWidth;
                this.nextLevelButton.x = gv.halfWidth;
                this.startButton.y = gv.halfHeight;
                this.nextLevelButton.y = gv.halfHeight- 50;
                this.line.x = gv.halfWidth-200;
                this.dot1.x = gv.halfWidth-200;
                this.dot2.x = gv.halfWidth+200;
                this.line.y = gv.halfHeight-100;
                this.dot1.y = gv.halfHeight-100;
                this.dot2.y = gv.halfHeight-100;
                gv.hero.y = this.line.y -30;
                this.titleText.x = Math.ceil((gv.canvasWidth - this.titleText.textWidth)/2);
                this.goalText.x = Math.ceil( gv.halfWidth);
                this.titleText.y = Math.ceil(gv.hero.y -200);
                this.goalText.y =  Math.ceil(gv.hero.y -100);
                this.fruitCont.x = gv.halfWidth;
                this.fruitCont.y = gv.hero.y;
            };
        },
        stop: function () {
            this.gv.introScreenOnStage = true;
            TweenLite.delayedCall(0.5, Utils.proxy(this.addToStage, this));
        },
        addToStage: function(){
            var date = new Date().getTime();
            var duration = date - gv.startGame;
            let arr = [["username", "user"], ["result", "win"],["duration", duration]];
            gv.keyString = "";
            gv.storeScore.sendScore();
            this.ON_STAGE = true;
            gv.hero.alpha = 0;
            this.fruitCont.alpha = 0;
            this.line.alpha = 0;
            this.dot1.alpha = 0;
            this.dot2.alpha = 0;
            gv.introScreenOnStage = true;
            if(gv.fruit.fruitQ != gv.level.fruitQ){
                gv.fruit.addMoreFruit();
            }
            if(gv.mines.mineQ != gv.level.mineQ){
                gv.mines.addMoreMines();
            }
            this.line.visible = true;
            this.line.rotation = Utils.deg2rad(0);
            this.line.width = 400;
            this.line.x = gv.halfWidth-200;
            this.line.y = gv.halfHeight-100;
            this.dot1.visible = true;
            this.dot1.x = gv.halfWidth-200;
            this.dot1.y = gv.halfHeight-100;
            this.dot2.visible = true;
            this.dot2.x = gv.halfWidth+200;
            this.dot2.y = gv.halfHeight-100;
            gv.hero.y = Math.ceil(this.line.y - 30);
            this.fruitCont.x = gv.halfWidth;
            this.fruitCont.y = gv.hero.y;
            gv.stage.addChild(this.fruitCont);
            TweenLite.delayedCall(0.11, Utils.proxy(this.makeRadial, this));
            gv.stage.removeChild(gv.level);
            gv.stage.removeChild(gv.score);
            gv.bouncePlatform.on(false);
            gv.swipeText.visible = false;
            if(gv.level.level > 1){
                gv.stage.addChild(this.nextLevelButton);
                this.nextLevelButton.scale.x = this.nextLevelButton.scale.y = 1;
                this.nextLevelButton.interactive = true;
                this.nextLevelButton.buttonMode = true;
                this.nextLevelButton.mousedown = this.nextLevelButton.touchstart = Utils.proxy(this.mouseDownHandler, this);
                this.nextLevelButton.mouseup = this.startButton.mouseupoutside = this.nextLevelButton.touchend = this.startButton.touchendoutside = Utils.proxy(this.transition, this);
                gv.stage.addChild(this.nextLevelButton);
            } else{
                this.startButton.alpha = 0;
                this.startButton.scale.x = this.startButton.scale.y = 1;
                this.startButton.interactive = true;
                this.startButton.buttonMode = true;
                this.startButton.mousedown = this.startButton.touchstart = Utils.proxy(this.mouseDownHandler, this);
                this.startButton.mouseup = this.startButton.mouseupoutside = this.startButton.touchend = this.startButton.touchendoutside = Utils.proxy(this.transition, this);
                gv.stage.addChild(this.startButton);
            }
            this.titleText =  new PIXI.BitmapText("Level "+gv.level.level, {font: "64px bigText", align: "left"});
            this.titleText.x = Math.ceil((gv.canvasWidth - this.titleText.textWidth)/2);
            var str = "";
            if(gv.level.mineQ >0)
                str = "goal: eat the "+gv.level.fruitQ+" pieces of fruit while avoiding the "+gv.level.mineQ+" mines!";
            else
                str = "goal: eat the "+gv.level.fruitQ+" pieces of fruit!";

            this.goalText = Utils.returnText(str);
            this.goalText.pivot.x = this.goalText.textWidth/2;
            this.goalText.alpha = 0;
            this.goalText.pivot.y = this.goalText.textHeight/2;
            this.goalText.x =Math.ceil( gv.halfWidth);
            this.titleText.y = Math.ceil(gv.hero.y -200);
            this.goalText.y =  Math.ceil(gv.hero.y -100);
            gv.stage.addChild(this.goalText);
            this.titleText.alpha = 0;
            gv.stage.addChild(this.titleText);
            var fadeIn = 1;
            var delayFadeIn = (gv.level.level > 1)?3:1;
            TweenLite.to(this.line,fadeIn, {alpha:1, delay:delayFadeIn});
            TweenLite.to(this.dot1,fadeIn, {alpha:1, delay:delayFadeIn});
            TweenLite.to(this.dot2,fadeIn, {alpha:1, delay:delayFadeIn});
            TweenLite.to(this.goalText,fadeIn, {alpha:1, delay:delayFadeIn});
            TweenLite.to(this.titleText,fadeIn, {alpha:1, delay:delayFadeIn});
            TweenLite.to(gv.hero,fadeIn, {alpha:1, delay:delayFadeIn});
            if(gv.level.level > 1)
                TweenLite.to(this.nextLevelButton,fadeIn, {alpha:1, delay:delayFadeIn});
            else
                TweenLite.to(this.startButton,fadeIn, {alpha:1, delay:delayFadeIn});
            TweenLite.to(this.fruitCont,fadeIn, {alpha:1, delay:delayFadeIn});
            gv.levelComplete.shrink();
        },
        makeRadial: function() {
            this.fruitCont.rotation = Utils.deg2rad(0);
            Utils.distributeAroundRadial(gv.fruit.reset(), 250, this.fruitCont, false, this.fruitQ);
        },
        transition: function() {
           for(var i = 0; i < gv.fruit.fruitQ; i++){
                var fruit = gv.fruit.fruits[i];
               TweenLite.to(fruit,0.25, {alpha:0, delay:i *0.015});
            }
            var tl = new TimelineLite();
            tl.to(gv.activeButton.scale, 0.15, {x:1.2, y:1.2});
            tl.to(gv.activeButton.scale, 0.25, {x:0, y:0});
            tl.to(this.dot1, 0.15, {alpha:0, onComplete:Utils.makeInvisible, onCompleteParams:[this.dot1]});
            tl.to(this.dot2, 0.15, {alpha:0, onComplete:Utils.makeInvisible, onCompleteParams:[this.dot2]});
            tl.to(this.line, 0.15, {alpha:0, onComplete:Utils.makeInvisible, onCompleteParams:[this.line]});
            tl.to(this.titleText, 0.15, {alpha:0});
            tl.to(this.goalText.scale, 0.15, {x:1.2, y:1.2});
            tl.to(gv.hero,0.75, {y:Math.ceil(gv.halfHeight), delay:0.5, onComplete:   Utils.proxy(this.nextLevel, this)});
            tl.to(this.goalText.scale, 0.25, {x:1, y:1});
            tl.to(this.goalText,0.25, {alpha:0, onComplete:Utils.removeFromStage, onCompleteParams:[this.goalText]}, "-=0.25");
        },
        mouseDownHandler: function(e){
            Utils.playSound("click");
            e.target.scale.x = e.target.scale.y = 0.85;
            gv.activeButton = e.target;
        },
        clearNextLevelScreen: function(){
            this.ON_STAGE = false;
            gv.vy = 2;
            gv.vx = 0;
           // var tl = new TimelineLite();
            this.fruitCont.removeChildren();
            gv.stage.removeChild(this.fruitCont);
            //gv.stage.removeChild(this.goalText);
            gv.stage.removeChild(this.titleText);
            this.line.visible = false;
            this.line.alpha = 1;
            this.line.width = 0;
            this.line.x = 0;
            this.line.y = 0;
            this.dot1.visible = false;
            this.dot1.x = 0;
            this.dot1.alpha = 1;
            this.dot1.y = 0;
            this.dot2.visible = false;
            this.dot2.alpha = 1;
            this.dot2.x = 0;
            this.dot2.y = 0;
            gv.bouncePlatform.on(true);
            gv.swipeText.visible = true;
            gv.hero.x = gv.halfWidth;
            gv.hero.y = gv.halfHeight;
            gv.introScreenOnStage = false;
            gv.loopingQ = Math.max(gv.background.lineQ, gv.fruit.fruits.length, gv.clouds.clouds.length, gv.mines.mines.length);
        },
        nextLevel: function(){
            if(gv.level.level == 1){
                this.startButton.interactive = false;
                this.startButton.buttonMode = false;
                this.startButton.mousedown = null;
                this.startButton.mouseup =this.startButton.mouseupoutside =null;
                gv.stage.removeChild(this.startButton);
            } else {
                this.nextLevelButton.interactive = false;
                this.nextLevelButton.buttonMode = false;
                this.nextLevelButton.mousedown = null;
                this.nextLevelButton.mouseup = this.startButton.mouseupoutside = null;
                gv.stage.removeChild(this.nextLevelButton);
            }
            gv.drums.addToStage();
            gv.fruit.addToStage();
            gv.stage.addChild(gv.swipeText);
            gv.mines.addToStage();
            gv.stage.setChildIndex(gv.hero, gv.stage.children.length-1);
            gv.clouds.addToStage();
            gv.stage.setChildIndex(gv.kingCont, gv.stage.children.length-1);
            gv.stage.addChild(gv.level);
            gv.stage.addChild(gv.score);
            gv.level.x = gv.score.x;
            this.clearNextLevelScreen();
        },
        tickIt: function(){
            this.fruitCont.rotation +=0.005;
            for(var i = 0; i < gv.fruit.fruitQ; i++){
                var fruit = gv.fruit.fruits[i];
                if(fruit !== undefined) fruit.rotation -=0.005;
            }
        }
    }
}

