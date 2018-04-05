export default function TwoBalls (PIXI, Utils){
    return {
        utils: new Utils(),
        canvasHeight: 400,
        stage: new PIXI.Container(),
        app: new PIXI.Application(),
        init: function () {
            this.p = this.p.bind(this)
            this.r = this.r.bind(this)
            this.mouseMoveHandler = this.mouseMoveHandler.bind(this)
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
            this.ball0Dragging = false;
            this.ball1Dragging = false;
            this.friction = 0.95;
            this.springLength = 100;
            this.spring = 0.1;

            this.line = new PIXI.Graphics();
            this.stage.addChild(this.line);

            this.mousePosition = new PIXI.Point(0,0);

            this.ball0 = this.Ball(10, 0xFF0000);
            this.b0 = this.ball0.getBody();
            this.b0.x = Math.random() * this.canvasWidth;
            this.b0.y = Math.random() * this.canvasHeight;
            this.b0.interactive = true;
            this.b0.buttonMode = true;
            this.b0.mousedown = this.p;
            this.b0.name = 'b0';
            this.stage.addChild(this.ball0)

            this.ball1 = this.Ball(10,0xFF0000);
            this.b1 = this.ball1.getBody();
            this.b1.x = Math.random() * this.canvasWidth;
            this.b1.y = Math.random() * this.canvasHeight;
            this.b1.interactive = true;
            this.b1.buttonMode = true;
            this.b1.name = 'b1';
            this.b1.mousedown = this.p;
            this.stage.interactive = true;
            
            this.stage.mouseup = this.r;
            
            this.stage.addChild(this.ball1)
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
        springTo: function (ballA, ballB) {
            var bA = ballA.getBody();
            var bB = ballB.getBody();
            var dx = bB.x - bA.x;
            var dy = bB.y - bA.y;
            var angle = Math.atan2(dy, dx);
            var targetX = bB.x - Math.cos(angle) * this.springLength;
            var targetY = bB.y - Math.sin(angle) * this.springLength;
            ballA.vx += (targetX - bA.x) * this.spring;
            ballA.vy += (targetY - bA.y) * this.spring;
            ballA.vx *= this.friction;
            ballA.vy *= this.friction;
            bA.x += ballA.vx;
            bA.y += ballA.vy;
        },
        p: function (e) {
            if (e.currentTarget.name === 'b0') {
                this.ball0Dragging = true;
                this.stage.mousemove = this.mouseMoveHandler;
            }
            if (e.currentTarget.name === 'b1') {
                this.ball1Dragging = true;
                this.stage.mousemove = this.mouseMoveHandler;
            }
        },
        r: function (event) {
            this.ball0Dragging = false;
            this.ball1Dragging = false;
            this.stage.mousemove = null;
        },
        mouseMoveHandler: function (touchData) {
            this.mousePosition = touchData.data.global;
        },
        animate: function () {
            this.line.clear();
            this.line
            .lineStyle(4, 0xFFFFFF, 1)
            .moveTo(this.b0.x, this.b0.y)
            .lineTo(this.b1.x, this.b1.y);

            if (this.ball0Dragging) {
                this.b0.x = this.mousePosition.x;
                this.b0.y = this.mousePosition.y;
            } else if (this.ball1Dragging) {
                this.b1.x = this.mousePosition.x;
                this.b1.y = this.mousePosition.y;
            }

            if (!this.ball0Dragging) {
                this.springTo(this.ball0, this.ball1);
            }
            if(!this.ball1Dragging) {
                this.springTo(this.ball1, this.ball0);
            }

            this.keepOnStage(this.b0);
            this.keepOnStage(this.b1);
            this.renderer.render(this.stage);
        },
        keepOnStage: function (ball) {
            var adjust = false;
            if(ball.x < 0){
                adjust = true;
                ball.x = 50;
            } else if (ball.x > this.canvasWidth){
                adjust = true;
                ball.x = this.canvasWidth - 50;
            } else if (ball.y < 0){
                adjust = true;
                ball.y = 50;
            } else if (ball.y > this.canvasHeight){
                adjust = true;
                ball.y = this.canvasHeight-50;
            }
            if(adjust)this.ball0.vx = this.ball0.vy = this.ball1.vx = this.ball1.vy = 0;
        },
        resize: function () {
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.halfWidth = this.canvasWidth/2;
            this.renderer.resize(this.canvasWidth, this.canvasHeight);
            this.b0.x = Math.random() * this.canvasWidth;
            this.b0.y = Math.random() * this.canvasHeight;
        }
    }
}