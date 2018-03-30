/**
 * Created by edwardwalther on 7/13/15.
 */



function Clouds(){



    this.clouds = [];

    for(var i = 0; i < gv.level.cloudQ; i ++){


        this.clouds.push(this.cloud("right"));


        this.clouds.push(this.cloud("left"));
    }

    this.onStage = false;


}
Clouds.prototype.addToStage = function(){
    this.onStage = true;
    var cloud;

    for(var i = 0; i < this.clouds.length; i ++){

        cloud =  this.clouds[i];
        cloud.alpha = 0;
        cloud.y = Math.ceil(Math.random()*gv.canvasHeight);
        cloud.x = (cloud.side == "right")?randomIntBetween(gv.halfWidth+(cloud.w/2), gv.canvasWidth-cloud.w):randomIntBetween(0, gv.halfWidth-cloud.w-30);
        gv.stage.addChild(cloud);
        TweenLite.to(cloud,0.5, {alpha:1});



    }


};

Clouds.prototype.removeFromStage = function(){
    this.onStage = false;
    var cloud;

    for(var i = 0; i < this.clouds.length; i ++){

        cloud =  this.clouds[i];
        gv.stage.removeChild(cloud);




    }


};



Clouds.prototype.cloud = function(side){

    //var cont = new PIXI.DisplayObjectContainer();



    var cloud = (side == "right")?new PIXI.Sprite.fromFrame("cloudRight.png"):new PIXI.Sprite.fromFrame("cloudLeft.png");
    cloud.side= side;
    cloud.cacheAsBitmap = true;
    cloud.w = cloud.width;
    cloud.h = cloud.height;


    /*var box = new PIXI.Graphics();
    box.beginFill(0x000000).drawRect(0,0,cont.w, 10).endFill();
    box.y = 40;
    cont.addChild(box);*/

    var box = new PIXI.Rectangle(0,60,cloud.w, 10);

    cloud.box = box;

    return cloud;



};