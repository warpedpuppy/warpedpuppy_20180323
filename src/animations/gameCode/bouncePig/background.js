
export default function Background(gv){
    return {
        cont: new gv.PIXI.Container(),
        ballQ:  20,
        balls:  [],
        bricks: [],
        init: function (){
            this.makeBalls();
            this.backgroundBitmap();
            gv.stage.addChildAt(this.cont, 0);
        },
        backgroundBitmap: function() {
            var background = new gv.PIXI.Sprite.fromFrame("background.jpg");
            background.width = gv.canvasWidth;
            background.height = gv.canvasHeight;
            this.background = background;
            this.cont.addChildAt(background, 0);
        },
        makeBalls: function() {
            const colors = [0x31ff5b, 0x5F27E8, 0xB252ff, 0x16e4e8, 0x7d11ff];
            let colorCounter = 0,
                ball;
            for (let i = 0; i <  this.ballQ; i++) {
                ball = new gv.PIXI.Sprite.fromFrame("bubble.png");
                ball.scale.x = ball.scale.y = gv.utils.randomNumberBetween(5, 15);
                ball.y = gv.utils.randomNumberBetween(0, gv.canvasHeight);
                ball.x = gv.utils.randomNumberBetween(0, gv.canvasWidth);
                ball.vx = gv.utils.randomNumberBetween(0.05,0.5);
                ball.vy =  gv.utils.randomNumberBetween(0.05,0.5);
                ball.anchor.x = ball.anchor.y = 0.5;
                ball.tint = colors[colorCounter];
                colorCounter ++;
                if(colorCounter === colors.length-1)colorCounter = 0;
                this.balls.push(ball);
                this.cont.addChild(ball);
            }

        },
        resize: function () {
            this.background.width = gv.canvasWidth;
            this.background.height = gv.canvasHeight;
        },
        tickIt: function(){
            let ball;
            for (let i = 0; i <  this.ballQ; i++) {
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
        }
    }
}
