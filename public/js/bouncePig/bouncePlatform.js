/**
 * Created by edwardwalther on 7/11/15.
 */




function BouncePlatform(){


    this.line = new PIXI.Sprite.fromFrame("line.gif");
    this.line.height = 2;
    this.line.anchor.y = 0.5;
    this.line.tint = 0x000000;
    this.line.visible = false;
    gv.stage.addChild(this.line);


    this.dot1 = new PIXI.Sprite.fromFrame("newDot.png");
    this.dot1.anchor.x = this.dot1.anchor.y = 0.5;
   // this.dot1.scale.x = this.dot1.scale.y = .25;
    this.dot1.visible = false;
    gv.stage.addChild(this.dot1);

    
    this.dot2 = new PIXI.Sprite.fromFrame("newDot.png");
    this.dot2.anchor.x = this.dot2.anchor.y = 0.5;
   // this.dot2.scale.x = this.dot2.scale.y = .25;
    this.dot2.visible = false;
    gv.stage.addChild(this.dot2);








}
BouncePlatform.prototype.on = function(trueFalse) {

    if(trueFalse === true){
        gv.stage.interactive = true;
        gv.stage.mousedown = gv.stage.touchstart =  proxy(this.placeFirstDot, this);
        gv.stage.mousemove = gv.stage.touchmove = proxy(this.onMouseMove, this);
        gv.stage.mouseup =  gv.stage.touchend = proxy(this.releaseMouse, this);
    }else{
        //gv.stage.interactive = false;
        gv.stage.mousedown = gv.stage.touchstart =  null;
        gv.stage.mousemove = gv.stage.touchmove = null;
        gv.stage.mouseup =  gv.stage.touchend = null;
    }


};
BouncePlatform.prototype.placeFirstDot = function(touchData) {




    var mouse = touchData.getLocalPosition(gv.stage);
    var mouseX = mouse.x;
    var mouseY = mouse.y;

    this.line.width = 0;
    this.line.x = mouseX;
    this.line.y = mouseY;
    this.line.visible = true;


    this.dot1.x = mouseX;
    this.dot1.y = mouseY;
    this.dot1.visible = true;

    this.dot2.x = mouseX;
    this.dot2.y = mouseY;
    this.dot2.visible = true;

    gv.mouseDown = true;


};

BouncePlatform.prototype.onMouseMove = function(touchData){

    if(gv.mouseDown === true){


        var mouse = touchData.getLocalPosition(gv.stage);
        var mouseX = mouse.x;
        var mouseY = mouse.y;

        this.dot2.x = mouseX;
        this.dot2.y = mouseY;


        var disAngle = distanceAndAngle(new PIXI.Point(this.dot1.x, this.dot1.y), new PIXI.Point(this.dot2.x, this.dot2.y));


        this.line.rotation = disAngle[1];
        this.line.width = disAngle[0];

    }


};

BouncePlatform.prototype.releaseMouse = function(data) {

    gv.mouseDown = false;
};

BouncePlatform.prototype.tickIt = function() {

    if(this.dot2.visible === true){
        this.dot1.rotation += 0.25;
        this.dot2.rotation += 0.25;
    }

};