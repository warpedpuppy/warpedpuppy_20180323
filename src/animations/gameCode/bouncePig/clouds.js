export default function Clouds (gv, PIXI, Utils, TweenLite) {
    return {
        clouds: [],
        cont: new PIXI.Container(),
        onStage:false,
        init: function (){
            for(var i = 0; i < gv.level.cloudQ; i ++){
                this.clouds.push(this.cloud("right"));
                this.clouds.push(this.cloud("left"));
            }
            gv.stage.addChild(this.cont)
        },
        addToStage: function () {
            this.onStage = true;
            let cloud;
            for(var i = 0; i < this.clouds.length; i ++){
                cloud =  this.clouds[i];
                cloud.alpha = 1;
                cloud.y = Math.ceil(Math.random()*gv.canvasHeight);
                cloud.x = (cloud.side === "right")?Utils.randomIntBetween(gv.halfWidth+(cloud.w/2), gv.canvasWidth-cloud.w):Utils.randomIntBetween(0, gv.halfWidth-cloud.w-30);
                this.cont.addChild(cloud);
                TweenLite.to(cloud,0.5, {alpha:1});
            }
        },
        removeFromStage: function () {
            this.onStage = false;
            this.cont.removeChildren();
        },
        resize: function () {
            this.removeFromStage();
            this.addToStage();
        },
        cloud: function (side) {
            var cloud = (side === "right")?new PIXI.Sprite.fromFrame("cloudRight.png"):new PIXI.Sprite.fromFrame("cloudLeft.png");
            cloud.side= side;
            cloud.cacheAsBitmap = true;
            cloud.w = cloud.width;
            cloud.h = cloud.height;
            var box = new PIXI.Rectangle(0,60,cloud.w, 10);
            cloud.box = box;
            return cloud;
        }
    }
}


