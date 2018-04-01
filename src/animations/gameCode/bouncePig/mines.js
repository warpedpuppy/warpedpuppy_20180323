export default function Mines (gv) {
    return {
        mineQ: gv.level.mineQ,
        mines: [],
        redBackground: new gv.PIXI.Graphics(),
        onStage: false,
        init: function () {
            this.build();
            this.redBackground.beginFill(0xFF0000).drawRect(0,0,gv.canvasWidth,gv.canvasHeight).endFill();
            this.redBackground.alpha = 0;
            gv.stage.addChildAt(this.redBackground, 0); // was 5
        },
        resize: function () {
            this.redBackground.clear();
            this.redBackground.beginFill(0xFF0000).drawRect(0,0,gv.canvasWidth,gv.canvasHeight).endFill();
        },
        build: function () {
            for(var i = 0; i < this.mineQ; i++){
                var mine = this.mine();
                this.mines.push(mine);
            }
            this.redLittles = new gv.ObjectPoolBuilder("redLittle.png", 200, [10,30], [10,50], [0.05, 2], true, true, gv);
            this.redBigs = new gv.ObjectPoolBuilder("redBig.png", 100, [3,8], [50,100], [0.05, 2], true, true, gv);
        },
        addMoreMines: function () {
            var additionalMines = gv.level.mineQ - this.mineQ;
            var mine;
            for (var i = 0; i < additionalMines; i++) {
                mine = this.mine();
                this.mines.push(mine);
            }
            this.mineQ = gv.level.mineQ;
        },
        removeFromStage: function () {
            this.onStage = false;
            for(var i = 0; i < this.mineQ; i++){
                var mine = this.mines[i];
                gv.kingCont.removeChild(mine);
            }
        },
        addToStage: function () {
            this.onStage = true;
            for(var i = 0; i < this.mineQ; i++){
                var mine = this.mines[i];
                mine.alpha = 1;
                mine.x = gv.utils.randomNumberBetween(0,gv.canvasWidth);
                mine.y = gv.utils.randomNumberBetween(0,gv.canvasHeight);
                gv.kingCont.addChild(mine);
                gv.TweenLite.to(mine,0.5, {alpha:1});
            }

        },
        explode: function (mine) {
            gv.utils.playSound("explosion");
            this.redBigs.startPool(mine.x, mine.y, gv.kingCont);
            this.redLittles.startPool(mine.x, mine.y, gv.kingCont);
            mine.x = gv.utils.randomNumberBetween(0, gv.canvasWidth);
            mine.y =  gv.utils.randomNumberBetween(0, 150);
            gv.TweenLite.killTweensOf(this.redBackground);
            this.redBackground.alpha = 1;
            this.redBackground.visible = true;
            gv.stage.setChildIndex(this.redBackground, 5);
            gv.TweenLite.to(this.redBackground,0.5, {alpha:0});
        },
        mine: function () {
            var mine = new gv.PIXI.Sprite.fromFrame("mine.png");
            mine.rect = new gv.PIXI.Rectangle(-30,-30,60,60);
            mine.w = mine.h =Math.max(mine.height,mine.width);
            mine.anchor.x = mine.anchor.y = 0.5;
            mine.rot = gv.utils.randomNumberBetween(-0.005,0.01);
            return mine;
        }
    }
};