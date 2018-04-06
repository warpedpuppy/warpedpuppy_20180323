export default function BrickBreak (PIXI, Utils, Setting, TweenLite, Bricks, Paddle, Ball){
    return {
        utils: new Utils(),
        canvasHeight: 400,
        stage: new PIXI.Container(),
        app: new PIXI.Application(),
        loader: PIXI.loader,
        PIXI: PIXI,
        TweenLite: TweenLite,
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

            this.kingCont = new PIXI.Container();
            this.stage.addChild(this.kingCont);

            const setting = this.setting = new Setting(PIXI, this);
            const settingContainer = this.settingContainer = setting.init();
            settingContainer.x = (this.canvasWidth - settingContainer.width)/2;
            settingContainer.y = (this.canvasHeight - settingContainer.height)/2;
            this.settingContainer = settingContainer;
            this.kingCont.addChild(settingContainer);

            const bricks = Bricks(this);
            const bricksCont = bricks.init();
            bricksCont.mask = setting.background;
            settingContainer.addChildAt(bricksCont, 1);
            this.bricks = bricks;

            const paddle = Paddle(this);
            const paddleCont = paddle.init();
            paddleCont.x = (settingContainer.width - paddleCont.width)/2;
            paddleCont.y = settingContainer.height - paddleCont.height - 25;
            paddleCont.mask = setting.background;
            settingContainer.addChild(paddleCont);
            this.paddle = paddleCont;

            const ball = Ball(this, 3, 0xFF0000);
            const ballCont = ball.init();
            ballCont.vx = ballCont.speed;
            ballCont.vy = ballCont.speed;
            this.ball = ballCont;
            ballCont.x= settingContainer.width/2;
            ballCont.y = settingContainer.height/2;
            settingContainer.addChild(ballCont);
            this.gamePlay = true;
            this.handleKeyDown = this.handleKeyDown.bind(this);
            document.addEventListener('keydown', this.handleKeyDown);
            this.app.ticker.add(this.animate.bind(this));
        },
        resize: function () {
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = 400;
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer.resize(this.canvasWidth,this.canvasHeight);
            this.settingContainer.x = (this.canvasWidth - this.settingContainer.width)/2;
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
            this.setting.spinWheels();
            let rightBoundary = this.settingContainer.width - this.paddle.width;
            let leftBoundary  = -this.ball.radius;
            if (this.gamePlay) {

                this.ball.x += this.ball.vx;
                this.ball.y += this.ball.vy;

                if(this.ball.y < leftBoundary) {
                    this.ball.vy *= -1;
                } else if(this.ball.x + this.ball.radius > 500) {
                    //this.ball.vx  = 0;
                    this.ball.vx *= -1;
                    //this.ball.x = this.ball.y = 10;
                } else if (this.ball.x < leftBoundary) {
                    this.ball.vx *= -1;
                } else if(this.ball.y + this.ball.radius > 300){

                    this.ball.classRef.reset();
                    this.ball.x = this.ball.y = 10;
                }
                var rect = new PIXI.Rectangle(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height)

                if (this.utils.pointRectangleCollisionDetection(this.ball, rect)) {
                    this.paddle.classRef.hit(this.ball.x,this.paddle.x)
                    //this.setting.classRef.spinWheels();
                }

            }
            if(this.paddle.moveRight){
                this.paddle.vx = -Math.abs(this.paddle.vx);
            }
            else if(this.paddle.moveLeft){
                this.paddle.vx = Math.abs(this.paddle.vx);
            }

            if(!this.paddle.moveLeft && !this.paddle.moveRight) {
              if (this.paddle.peterOut && Math.abs(this.paddle.vx) > 1) {
                    this.paddle.vx *= .9;
                } else if (this.paddle.peterOut && Math.abs(this.paddle.vx) < 1) {
                    this.paddle.peterOut = false;
                    this.paddle.vx = 0;
                }
            }
            
            if(this.paddle.x > rightBoundary){
                this.paddle.x = rightBoundary;
            } else if(this.paddle.x < 0 ) {
                this.paddle.x =0;
            }

            this.paddle.x -= this.paddle.vx;
            // let counter = this.counter = 0;
           
            this.renderer.render(this.stage);
        }
    }
}
