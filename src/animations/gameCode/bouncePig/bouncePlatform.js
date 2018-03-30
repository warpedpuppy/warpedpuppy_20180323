export default function BouncePlatform (gv, PIXI, Utils) {
    return {
        line: new PIXI.Sprite.fromFrame("line.gif"),
        dot1: new PIXI.Sprite.fromFrame("newDot.png"),
        dot2: new PIXI.Sprite.fromFrame("newDot.png"),
        init: function () {
            this.line.height = 2;
            this.line.anchor.y = 0.5;
            this.line.tint = 0x000000;
            this.line.visible = false;
            gv.stage.addChild(this.line);
            this.dot1.anchor.x = this.dot1.anchor.y = 0.5;
            this.dot1.visible = false;
            gv.stage.addChild(this.dot1);
            this.dot2.anchor.x = this.dot2.anchor.y = 0.5;
            this.dot2.visible = false;
            gv.stage.addChild(this.dot2);
            this.on = this.on.bind(this);
            this.on(true);
        },
        on: function (trueFalse) {
            this.placeFirstDot = this.placeFirstDot.bind(this);
            this.onMouseMove = this.onMouseMove.bind(this)
            this.releaseMouse = this.releaseMouse.bind(this)

            if(trueFalse === true){
                gv.stage.interactive = true;
                gv.stage.buttonMode = true;
                let that = this;
                //gv.stage.on('pointerdown', (e) => {console.log(this); this.placeFirstDot(e)})
                 gv.stage.mousedown = gv.stage.touchstart =  this.placeFirstDot;
                gv.stage.mousemove = gv.stage.touchmove = this.onMouseMove;
                gv.stage.mouseup =  gv.stage.touchend = this.releaseMouse;
            } else {
                //gv.stage.interactive = false;
                gv.stage.mousedown = gv.stage.touchstart =  null;
                gv.stage.mousemove = gv.stage.touchmove = null;
                gv.stage.mouseup =  gv.stage.touchend = null;
            }
        },
        placeFirstDot: function(touchData) {
            var mouse = touchData.data.global;
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
        },
        onMouseMove: function(touchData){
            if(gv.mouseDown === true){
                var mouse = touchData.data.global;
                var mouseX = mouse.x;
                var mouseY = mouse.y;
                this.dot2.x = mouseX;
                this.dot2.y = mouseY;
                var disAngle = gv.utils.distanceAndAngle(new PIXI.Point(this.dot1.x, this.dot1.y), new PIXI.Point(this.dot2.x, this.dot2.y));
                this.line.rotation = disAngle[1];
                this.line.width = disAngle[0];
            }
        },
        releaseMouse: function(data) {
            gv.mouseDown = false;
        },
        tickIt: function() {
            if(this.dot2.visible === true){
                this.dot1.rotation += 0.25;
                this.dot2.rotation += 0.25;
            }
        }

    }

}
