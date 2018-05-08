export default function LongChain (PIXI, Utils){
    return {
        utils: new Utils(),
        canvasHeight: 400,
        stage: new PIXI.Container(),
        app: new PIXI.Application(),
        init: function () {

            this.mousePosition = new PIXI.Point(10,10);
            this.mouseMoveHandler = this.mouseMoveHandler.bind(this);

            this.stage.mousemove = this.stage.touchmove = this.mouseMoveHandler;
            this.stage.interactive = true;
            this.stage.buttonMode = true;

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
            window.onresize = undefined;
            this.app.ticker.destroy();
            this.renderer.destroy();
        },
        build: function () {
            this.spring = 0.1;
            this.friction = 0.8;
            this.gravity = 2.5;
            this.balls = [];
            this.numBalls = 10;
            this.line = new PIXI.Graphics();
            this.stage.addChild(this.line);
            let i, ball;
            for (i = 0; i < this.numBalls; i++){
                ball = this.Ball(5, 0xFF0000);
                this.balls.push(ball);
                this.stage.addChild(ball);
            }
        },
        Ball: function (radius, color) {
            let cont = new PIXI.Container();
            cont.radius = radius;
            cont.height = cont.radius * 4;
            cont.vx = 0;
            cont.vy = 0;
            cont.xpos = 0;
            cont.ypos = 0;
            let b = new PIXI.Graphics();
            b.beginFill(color).drawCircle(0,0,cont.radius*2);
            cont.addChild(b);
            cont.body = b;
            return cont;
        },
        mouseMoveHandler: function (touchData) {
            this.mousePosition = touchData.data.global;
        },
        animate: function (event) {
            this.line.clear();
            this.line.lineStyle(4, 0xFFFFFF, 1);
            this.line.moveTo(this.mousePosition.x, this.mousePosition.y);
            this.moveBall(this.balls[0], this.mousePosition.x, this.mousePosition.y);
            this.line.lineTo(this.balls[0].x, this.balls[0].y);
            let i, ballA, ballB;
            for (i = 1; i < this.numBalls; i++) {
                ballA = this.balls[i-1];
                ballB = this.balls[i];
                this.moveBall(ballB, ballA.x, ballA.y);
                this.line.lineTo(ballB.x, ballB.y);
            };

             this.renderer.render(this.stage);

        },
        moveBall: function (ball, targetX, targetY) {
            var tempBallBody = ball;
            ball.vx += (targetX - tempBallBody.x) * this.spring;
            ball.vy += (targetY - tempBallBody.y) * this.spring;
            ball.vy += this.gravity;
            ball.vx *= this.friction;
            ball.vy *= this.friction;
            tempBallBody.x += ball.vx;
            tempBallBody.y += ball.vy;
        },
        resize: function () {
            // this.stage.removeAllChildren();

            // this.canvasWidth = $(window).width();
            // $("#"+this.canvasID).attr("width", this.canvasWidth);
            // this.ctx.clearRect(0,0, this.canvasWidth, this.canvasHeight);
            // custom();
        }
    }
}