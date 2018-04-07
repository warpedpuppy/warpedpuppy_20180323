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
        brickColQ:4,
        rows: 10,
        bricks: [],
        bricksQ:0,
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

            const paddle = this.Paddle();
            paddle.x = (this.canvasWidth - paddle.width)/2;
            paddle.y = this.canvasHeight  - paddle.height;
            this.stage.addChild(paddle);
            this.paddle = paddle;

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
            let brickWidth = Math.ceil(this.canvasWidth /this.brickColQ);
            console.log(brickWidth)
            for(let i = 0; i < this.rows; i++){
                for(let j = 0; j < this.brickColQ; j++){
                    let brick = new PIXI.Graphics();
                    brick
                    .beginFill(0xFF00FF)
                    .drawRect(0,0,brickWidth, this.brickHeight)
                    .endFill()
                    brick.x = j * brickWidth;
                    brick.y = i * this.brickHeight;
                    brick.alpha = (Math.random()*1)+0.2;
                    this.bricks.push(brick)
                    cont.addChild(brick);
                    this.bricksQ ++;
                }
            }
            return cont;
        },
        Paddle: function () {
            const paddle = new PIXI.Graphics();
            paddle
            .beginFill(0x000000)
            .drawRect(0,0,200, 10)
            .endFill();
            paddle.vx = 10;
            paddle.moveRight = false;
            paddle.moveLeft = false;
            return paddle;
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

                for(let i = 0; i < this.bricksQ; i++) {
                    let brick = this.bricks[i];
                    if(brick.alpha !== 0){
                        let rect = new PIXI.Rectangle(brick.x, brick.y, brick.width, brick.height);
                        if (this.utils.circleRectangleCollision(this.ball, rect)){
                            brick.alpha = 0;
                            this.ball.vy *= -1;
                        }
                    }
                    

                }
            //     var rect = new PIXI.Rectangle(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height)

            //     if (this.utils.pointRectangleCollisionDetection(this.ball, rect)) {
            //         this.paddle.classRef.hit(this.ball.x,this.paddle.x)
            //         //this.setting.classRef.spinWheels();
            //     }

            // }
            if(this.paddle.moveRight){
                this.paddle.vx = -Math.abs(this.paddle.vx);
            }
            else if(this.paddle.moveLeft){
                this.paddle.vx = Math.abs(this.paddle.vx);
            }

            // if(!this.paddle.moveLeft && !this.paddle.moveRight) {
            //   if (this.paddle.peterOut && Math.abs(this.paddle.vx) > 1) {
            //         this.paddle.vx *= .9;
            //     } else if (this.paddle.peterOut && Math.abs(this.paddle.vx) < 1) {
            //         this.paddle.peterOut = false;
            //         this.paddle.vx = 0;
            //     }
            // }
            
            if(this.paddle.x > this.canvasWidth){
                this.paddle.x = this.canvasWidth;
            } else if(this.paddle.x < 0 ) {
                this.paddle.x = 0;
            }

            //this.paddle.x -= this.paddle.vx;
            // let counter = this.counter = 0;
           }
            this.renderer.render(this.stage);
        }
    }
}
