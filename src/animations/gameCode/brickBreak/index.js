export default function BrickBreak (PIXI, Utils, Setting, TweenLite, Bricks, Paddle, Ball){
    return {
        utils: new Utils(),
        canvasHeight: 400,
        stage: new PIXI.Container(),
        app: new PIXI.Application(),
        loader: PIXI.loader,
        PIXI: PIXI,
        TweenLite: TweenLite,
        brickHeight: 10,
        brickWidth: 250,
        rows: 10,
        init: function () {
            this.resize = this.resize.bind(this);
            window.onresize = this.resize;
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = 400;
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
            this.renderer.backgroundColor = 0xFFFFFF;
            document.getElementById("tugtugCanvas").appendChild(this.renderer.view);
            this.build();
            

        },
        stop: function () {
            this.app.ticker.destroy();
            this.renderer.destroy();
        },
        build: function () {

           
            const bricks = this.Bricks();
            this.stage.addChild(bricks);

            // const paddle = Paddle(this);
            // const paddleCont = paddle.init();
            // paddleCont.x = (this.canvasWidth - paddleCont.width)/2;
            // paddleCont.y = this.canvaseHeight - paddleCont.height - 25;
            // this.stage.addChild(paddleCont);
            // this.paddle = paddle;

            this.ball = this.Ball();
            this.ball.x = this.halfWidth;
            this.ball.y = this.halfHeight;
            this.stage.addChild(this.ball);

            this.gamePlay = true;
            this.handleKeyDown = this.handleKeyDown.bind(this);
            document.addEventListener('keydown', this.handleKeyDown);
            this.app.ticker.add(this.animate.bind(this));
        },
        Bricks: function () {
            const cont = new PIXI.Container();
            let cols = this.canvasWidth / this.brickWidth;
            for(let i = 0; i < this.rows; i++){
                for(let j = 0; j < cols; j++){
                    let brick = new PIXI.Graphics();
                    brick
                    .beginFill(0xFF00FF)
                    .drawRect(0,0,this.brickWidth, this.brickHeight)
                    .endFill()
                    brick.x = j * this.brickWidth;
                    brick.y = i * this.brickHeight;
                    brick.alpha = (Math.random()*1)+0.2;
                    cont.addChild(brick)
                }
            }
            return cont;
        },
        Ball: function () {
            const ball = new PIXI.Graphics();
            ball
            .beginFill(0x000000)
            .drawCircle(0,0,20)
            .endFill();
            ball.radius = 20;
            ball.vx = ball.vy = 5;
            return ball;
        },
        resize: function () {
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = 400;
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer.resize(this.canvasWidth,this.canvasHeight);
           
        },
        handleKeyDown: function (event) {
            event.preventDefault();
            switch(event.keyCode) {
                case 39:
                    //right
                    this.paddle.vx = this.paddle.speed;
                    this.paddle.moveLeft = false;
                    this.paddle.moveRight= true;
                    this.paddle.peterOut = false;

                    break;
                case 37:
                    //left
                    this.paddle.vx = this.paddle.speed;
                    this.paddle.moveLeft = true;
                    this.paddle.moveRight= false;
                    this.paddle.peterOut = false;
                    break;
                case 13:
                    this.startButton.classRef.startGame();
                    break;
                default:
                    this.paddle.vx = 0;
                    break;

            }
        },
        handleKeyUp: function (event) {
            switch(event.keyCode) {
                case 39:
                    //right
                    this.paddle.moveRight= false;
                    this.paddle.peterOut = true;
                    break;
                case 37:
                    //left
                    this.paddle.peterOut = true;
                    this.paddle.moveLeft = false;
                    break;
                default:
                    this.paddle.moveRight= false;
                    this.paddle.peterOut = false;
                    this.paddle.peterOut = false;
                    this.paddle.moveLeft = false;
                    break;

            }
        },
        animate: function () {
            if (this.gamePlay) {

                this.ball.x += this.ball.vx;
                this.ball.y += this.ball.vy;

                if(this.ball.y < 0) {
                    this.ball.vy *= -1;
                } else if(this.ball.x  > this.canvasWidth) {
                    this.ball.vx *= -1;
                } else if (this.ball.x < 0) {
                    this.ball.vx *= -1;
                } else if(this.ball.y  > this.canvasHeight){
                     this.ball.vy *= -1;
                }
            //     var rect = new PIXI.Rectangle(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height)

            //     if (this.utils.pointRectangleCollisionDetection(this.ball, rect)) {
            //         this.paddle.classRef.hit(this.ball.x,this.paddle.x)
            //         //this.setting.classRef.spinWheels();
            //     }

            // }
            // if(this.paddle.moveRight){
            //     this.paddle.vx = -Math.abs(this.paddle.vx);
            // }
            // else if(this.paddle.moveLeft){
            //     this.paddle.vx = Math.abs(this.paddle.vx);
            // }

            // if(!this.paddle.moveLeft && !this.paddle.moveRight) {
            //   if (this.paddle.peterOut && Math.abs(this.paddle.vx) > 1) {
            //         this.paddle.vx *= .9;
            //     } else if (this.paddle.peterOut && Math.abs(this.paddle.vx) < 1) {
            //         this.paddle.peterOut = false;
            //         this.paddle.vx = 0;
            //     }
            // }
            
            // if(this.paddle.x > rightBoundary){
            //     this.paddle.x = rightBoundary;
            // } else if(this.paddle.x < 0 ) {
            //     this.paddle.x =0;
            // }

            //this.paddle.x -= this.paddle.vx;
            // let counter = this.counter = 0;
           }
            this.renderer.render(this.stage);
        }
    }
}
