export default function LevelComplete () {
    return {
        level: new PIXI.Sprite.fromFrame("level.png"),
        complete: new PIXI.Sprite.fromFrame("complete.png"),
        tl: new TimelineLite(),
        tl2: new TimelineLite(),
        onStage: false,
        init: function () {
            this.level.anchor.x = this.level.anchor.y = 0.5;
            this.level.x = gv.halfWidth;
            this.level.y = this.level.height;
            this.complete.anchor.x = this.complete.anchor.y = 0.5;
            this.complete.x = gv.halfWidth;
            this.complete.y = this.level.y + this.level.height +20;
        },
        addToStage: function () {
            this.onStage = true;
            this.level.scale.x = this.level.scale.y = this.complete.scale.x = this.complete.scale.y = 0;
            gv.stage.addChild(this.level);
            gv.stage.addChild(this.complete);

            this.tl.to(this.level.scale, 0.5, {x:1, y:1, ease:Back.easeOut});
            this.tl.to(this.complete.scale, 0.5, {x:1, y:1, ease:Back.easeOut, onComplete:proxy(this.done, this)});


            gv.nextLevelScreen.line.alpha = 0;
            gv.nextLevelScreen.dot1.alpha = 0;
            gv.nextLevelScreen.dot2.alpha = 0;
            gv.hero.alpha = 0;
            gv.nextLevelScreen.fruitCont.alpha = 0;
            gv.nextLevelScreen.nextLevelButton.alpha = 0;
            gv.nextLevelScreen.startButton.alpha = 0;

            gv.mines.removeFromStage();
            gv.drums.removeFromStage();
            gv.clouds.removeFromStage();

            gv.stage.removeChild(gv.level);
            gv.stage.removeChild(gv.score);

            gv.stage.removeChild(gv.swipeText);
        },
        done: function () {
            TweenLite.delayedCall(2,proxy(gv.nextLevelScreen.stop,gv.nextLevelScreen));
        },
        shrink: function () {
            this.tl.to(this.level.scale, 1, {x:0, y:0, ease:Back.easeOut});
            this.tl.to(this.complete.scale, 1, {x:0, y:0, ease:Back.easeOut, onComplete:proxy(this.cleanUp, this)});
        },
        cleanUp: function () {
            gv.stage.removeChild(this.level);
            gv.stage.removeChild(this.complete);

            this.onStage = false;
        }
    }
};