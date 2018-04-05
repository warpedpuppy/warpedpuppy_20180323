export default function NodeGarden (PIXI, Utils){
    return {
        utils: new Utils(),
        canvasHeight: 400,
        stage: new PIXI.Container(),
        app: new PIXI.Application(),
        init: function () {
            this.resize = this.resize.bind(this);
            window.onresize = this.resize;
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = 400;
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
            this.renderer.backgroundColor = 0x333333;
            document.getElementById("tugtugCanvas").appendChild(this.renderer.view);
            this.build();
            this.app.ticker.add(this.animate.bind(this));

        },
        stop: function () {
            this.app.ticker.destroy();
            this.renderer.destroy();
        },
        build: function () {
            this.numSegments = 6;
            this.gravity = 0.5;
            this.bounce = -0.9;
            this.ball = this.Ball(10, 0xFF0000);
            this.ball.vx = 10;
            this.segments = [];
            for (var i = 0; i < this.numSegments; i++) {
                var segment = this.Segment(50, 10);
                segment.body.x = this.halfWidth;
                segment.body.y = this.canvasHeight;
                this.segments.push(segment);
                this.stage.addChild(segment)
            }
            this.stage.addChild(this.ball)
            
        },
        Ball: function (radius, color) {
            let cont = new PIXI.Container();
            cont.radius = typeof radius !== 'undefined' ? radius : 10;
            cont.color = typeof color !== 'undefined' ? color : 0xFF00FF;
            cont.height = cont.radius*4;
            cont.vx = 0;
            cont.vy = 0;
            cont.vz = 0;

            cont.xpos = 0;
            cont.ypos = 0;
            cont.zpos = 0;
            cont.mass = 1;
            //private properties
            var b = new PIXI.Graphics();
            b.beginFill(color).drawCircle(0,0,cont.radius*2);
            cont.addChild(b);

            cont.body = b;
            cont.getBody = function(){return b};
            return cont;
        },
        animate: function (event) {
            this.moveBall();
            var target = this.reach(this.segments[0], this.ball.body.x, this.ball.body.y);
            for (let i = 1; i < this.numSegments; i++) {
                var segment = this.segments[i];
                target = this.reach(segment, target.x, target.y);

            }
            for (let i = this.numSegments - 1; i > 0; i--) {
                var segmentA = this.segments[i];
                var segmentB = this.segments[i - 1];
                this.position(this.segmentB, this.egmentA);
            }
            this.checkHit();
            this.renderer.render(this.stage);
        },
        reach: function (segment, xpos, ypos) {
            var dx = xpos - segment.body.x;
            var dy = ypos - segment.body.y;
            var angle = Math.atan2(dy, dx);
            segment.body.rotation = this.utils.deg2rad(angle * 180 / Math.PI);
            var w = segment.getPin().x - segment.body.x;
            var h = segment.getPin().y - segment.body.y;
            var tx = xpos - w;
            var ty = ypos - h;
            return new PIXI.Point(tx, ty);
        },
        Segment: function(segmentWidth, segmentHeight, color) {
            const cont = new PIXI.Container();
            var color;
            var segmentWidth;
            var segmentHeight;

            cont.vx = 0;
            cont.vy = 0;
            cont.segmentWidth = segmentWidth;
            cont.segmentHeight = segmentHeight;
            cont.color = color;

            var sprite = new PIXI.Container;
            var roundRect = new PIXI.Graphics();
            roundRect.beginFill(color);

            roundRect.drawRoundedRect(
                -segmentHeight / 2, 
                -segmentHeight / 2,
                segmentWidth*1.25,
                segmentHeight,
                10);
            roundRect.endFill();
           sprite.addChild(roundRect);

            // draw the two "pins"
            var circle1 = new PIXI.Graphics();
            circle1.beginFill(0xFF0000)
            circle1.drawCircle(0, 0, 2);
            circle1.endFill()
            sprite.addChild(circle1);
            var circle2 = new PIXI.Graphics();
            circle2.beginFill(0xFF0000)
            circle2.drawCircle(segmentWidth, 0, 2);
            circle2.endFill()
            sprite.addChild(circle2);
            cont.addChild(sprite);

            cont.body = sprite;
            let that = this;
            cont.getPin = function () {
                var angle = sprite.rotation * that.utils.deg2rad(Math.PI / 180);
                var xPos = sprite.x + Math.cos(angle) * cont.segmentHeight;
                var yPos = sprite.y + Math.sin(angle) * cont.segmentHeight;
                var point = new PIXI.Point(xPos, yPos);
                return point;
            }
            return cont;
        },
        position: function (segmentA, segmentB) {
            if(segmentA){
                segmentA.body.x = segmentB.getPin().x;
                segmentA.body.y = segmentB.getPin().y;
            }
           
        }, 
        moveBall: function () {
            this.ball.vy += this.gravity;
            this.ball.body.x += this.ball.vx;
            this.ball.body.y += this.ball.vy;

            if (this.ball.body.x + this.ball.radius > this.canvasWidth) {
                this.ball.body.x = this.canvasWidth - this.ball.radius;
                this.ball.vx *= this.bounce;
            } else if (this.ball.body.x - this.ball.radius < 0) {
                this.ball.body.x = this.ball.radius;
                this.ball.vx *= this.bounce;
            }

            if (this.ball.body.y + this.ball.radius > this.canvasHeight) {
                this.ball.body.y = this.canvasHeight - this.ball.radius;
                this.ball.vy *= this.bounce;
            } else if (this.ball.body.y - this.ball.radius < 0) {
                this.ball.body.y = this.ball.radius;
                this.ball.vy *= this.bounce;
            }
        },
        checkHit: function () {
            var segment = this.segments[0];
            var dx = segment.getPin().x - this.ball.body.x;
            var dy = segment.getPin().y - this.ball.body.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < this.ball.radius) {
                this.ball.vx += Math.random() * 2 - 1;
                this.ball.vy -= 1;
            }
        },
        resize: function () {
            this.stage.removeChildren();
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.halfWidth = this.canvasWidth/2;
            this.renderer.resize(this.canvasWidth, this.canvasHeight);
        }
    }
}