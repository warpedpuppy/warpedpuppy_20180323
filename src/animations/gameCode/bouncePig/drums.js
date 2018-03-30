export default function Drums (gv, PIXI, ObjectPoolBuilder, TweenLite, Utils) {
    return {
        cont: new PIXI.Container(),
        miniExplosion: new ObjectPoolBuilder("miniCloud.png", 2000, [10,30],[2,25], undefined, true, true, gv),
        onStage: false,
        init: function () {
            this.rightDrum = this.drum("right");
            this.leftDrum = this.drum("left");
            this.rightDrum.y = gv.halfHeight;
            this.leftDrum.y = gv.halfHeight;
            this.drums =[this.leftDrum, this.rightDrum];
            gv.stage.addChild(this.cont);
        },
        addToStage: function () {
            this.onStage = true;
            this.rightDrum.visible = true;
            this.leftDrum.visible = true;
            this.cont.addChild(this.rightDrum);
            this.cont.addChild(this.leftDrum);
            this.place();
            
        },
        removeFromStage: function () {
            this.onStage = false;
            this.cont.removeChildren();
        },
        hide: function () {
            this.rightDrum.visible = false;
            this.leftDrum.visible = false;
        },
        place: function () {
            this.rightDrum.x = gv.canvasWidth * 0.75;
            this.leftDrum.x = gv.canvasWidth * 0.25;
        },
        resize: function () {
            this.removeFromStage();
            this.place();
            this.addToStage();
        },
        show: function () {
            if(this.rightDrum.visible !== true && gv.levelComplete.onStage === false){
                this.rightDrum.y = gv.halfHeight;
                this.rightDrum.x = gv.canvasWidth*0.75;

                this.leftDrum.y = gv.halfHeight;
                this.leftDrum.x = gv.canvasWidth*0.25;

                TweenLite.from(this.rightDrum,0.5, {alpha:0});
                TweenLite.from(this.leftDrum,0.5, {alpha:0});
                this.rightDrum.visible = true;
                this.leftDrum.visible = true;
            }
        },
        drumRoll: function (drum) {
            gv.animate = false;
            this.drum = drum;
            if(drum.side === "left"){
                drum.x = gv.halfWidth;
                drum.y = gv.halfHeight;
            }
            else{
                drum.x = gv.halfWidth;
                drum.y = gv.halfHeight+85;
            }
            TweenLite.delayedCall(0.5, Utils.proxy(this.blastOff, this));
        },
        blastOff: function () {
            this.hide();
            gv.animate = true;
            gv.utils.playSound("explosion");
            var rot = (this.drum === this.rightDrum)?-Utils.deg2rad(3*360):Utils.deg2rad(3*360);
            TweenLite.to(gv.hero,4, {rotation: rot, onComplete:this.heroZero});
            this.miniExplosion.startPool(gv.hero.x, gv.hero.y+10, gv.kingCont);

        },
        heroZero: function () {
            gv.hero.rotation = Utils.deg2rad(0);
        },
        drum: function (side) {
            var cont = new PIXI.Container();
            cont.side = side;
            var drum = new PIXI.Sprite.fromFrame("drum.png");
            drum.side= side;
            drum.rotation = (side === "right")?Utils.deg2rad(-30):Utils.deg2rad(30);
            drum.cacheAsBitmap = true;
            drum.w = cont.w = drum.width;
            drum.h = cont.h = drum.height;
            cont.addChild(drum);
            var line;
            if(side === "right"){
                line = new PIXI.Graphics();
                line.lineStyle(2, 0x000000, 1).moveTo(10,10).lineTo(cont.w-12,-cont.h-12);
                cont.line = line;
                cont.point1 = new PIXI.Point(10,10);
                cont.point2 = new PIXI.Point(drum.w-12,-drum.h-12);
            }
            else{
                line = new PIXI.Graphics();
                line.lineStyle(2, 0x000000, 1).moveTo(-5,10).lineTo(cont.w-25,cont.h+33);
                cont.line = line;
                cont.point1 = new PIXI.Point(-5,10);
                cont.point2 = new PIXI.Point(drum.w-25,drum.h+33);
            }
            cont.pivot.x = drum.width/2;
            cont.pivot.y = drum.height/2;

            return cont;
        }
    }
}
