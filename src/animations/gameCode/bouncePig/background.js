
export default function Background(PIXI, gv, Utils){
    return {
        cont: new PIXI.Container(),
        container:  new PIXI.particles.ParticleContainer(),
        ballQ:  20,
        lines: [],
        balls:  [],
        bricks: [],
        init: function (){
            this.makeBalls();
            this.horizontalLines();
            this.cont.addChild(this.container);
            this.backgroundBitmap();
            gv.stage.addChildAt(this.cont, 0);
        },
        backgroundBitmap: function() {
            var background = new PIXI.Sprite.fromFrame("background.jpg");
            background.width = gv.canvasWidth;
            background.height = gv.canvasHeight;
            this.background = background;
            this.cont.addChildAt(background, 0);
        },
        backgroundBitmap: function() {
            var background = new PIXI.Sprite.fromFrame("background.jpg");
            background.width = gv.canvasWidth;
            background.height = gv.canvasHeight;
            this.background = background;
            this.cont.addChildAt(background, 0);
        },
        makeBricks: function () {
            this.bricks = [];
            this.brickQ = 0;
            var brickHQ = 10;
            var brickVQ = 20;
            var brickWidth = gv.canvasWidth/brickHQ;
            var brickHeight = gv.canvasHeight/brickVQ;
            var brick;
            for(var i = 0; i < brickVQ; i ++){
                for(var j = 0; j < brickHQ;j ++){
                    brick = new PIXI.Graphics();
                    brick.lineStyle(2, 0x000000,0.25).moveTo(0,0).lineTo(brickWidth, 0).lineTo(brickWidth, brickHeight).lineTo(0, brickHeight).lineTo(0,0);
                    brick.x = (j* brickWidth) +brickWidth/2;
                    brick.y = (i*brickHeight)+brickHeight/2;
                    brick.pivot.x = brickWidth/2;
                    brick.pivot.y = brickHeight/2;
                    this.cont.addChild(brick);
                    this.bricks.push(brick);
                    this.brickQ++;
                }
            }
        },
        makeBalls: function() {
            var ball;
            var colors = [0x31ff5b, 0x5F27E8, 0xB252ff, 0x16e4e8, 0x7d11ff];
            var colorCounter = 0;
            for (var i = 0; i <  this.ballQ; i++) {
                ball = new PIXI.Sprite.fromFrame("bubble.png");

                ball.scale.x = ball.scale.y = Utils.randomNumberBetween(5, 15);
                ball.y = Utils.randomNumberBetween(0, gv.canvasHeight);
                ball.x = Utils.randomNumberBetween(0, gv.canvasWidth);
                ball.vx = Utils.randomNumberBetween(0.05,0.5);
                ball.vy =  Utils.randomNumberBetween(0.05,0.5);
                ball.anchor.x = ball.anchor.y = 0.5;
                ball.tint = colors[colorCounter];//"0x" + randomColor().substring(1);
                colorCounter ++;
                if(colorCounter == colors.length-1)colorCounter = 0;
                this.balls.push(ball);
                this.cont.addChild(ball);
            }

        },
        horizontalLines: function() {
            var spacer = 40;
            this.lineQ = gv.canvasHeight / spacer;
            var line;
            this.lines.length = 0;
            for (var i = 0; i < gv.lineQ; i++) {
                line = new PIXI.Sprite.fromFrame("line.gif");
                line.y = spacer * i;
                line.height = 2;
                line.alpha = 0.25;
                line.width = gv.canvasWidth;
                line.tint = 0x000000;
                this.lines.push(line);
                this.container.addChild(line);
            }
        },
        tickIt: function(){
            var ball;
            for (var i = 0; i <  this.ballQ; i++) {
                ball = this.balls[i];
                ball.x += ball.vx;
                ball.y += ball.vy;
                if(ball.x > (gv.canvasWidth) || ball.x < 0){
                    ball.vx *=-1;
                }

                if(ball.y > (gv.canvasHeight) || ball.y < 0){
                    ball.vy *=-1;
                }
            }
            for( i = 0; i < this.brickQ; i++){
               // this.bricks[i].scale.x = this.bricks[i].scale.y =-Math.abs(cosWave(1,1,.0005));
            }
        }
    }
}
