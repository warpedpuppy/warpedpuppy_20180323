export default function Paddle (parent) {
    return {
        segmentQ: 5,
        segmentWidth: 20,
        cont: new parent.PIXI.Container(),
        colors: [0x999999, 0x333333, 0x000000, 0x333333, 0x999999],
        init: function () {
            let cont = this.cont;
            cont.width = this.segmentQ * this.segmentWidth;
            cont.height = 100;
            cont.vx = 0;
            cont.arr = [];
            for(var i = 0; i < this.segmentQ; i++){
                let b = this.Block(10, this.segmentWidth, this.colors[i], 0x000000, 0);
                b.x = i * this.segmentWidth;
                cont.arr.push(b);
                cont.addChild(b);
            }
            var glowBlock = this.Block(cont.height, this.segmentWidth,0xFFFF00, 0xFF6600, 0);
            // glowBlock.x = 0;
            // glowBlock.alpha = 0;
            cont.addChild(glowBlock);
            this.glowBlock = glowBlock;
            cont.peterOut = false;
            cont.moveLeft = false;
            cont.moveRight = false;
            cont.speed = 3;
            cont.classRef = this;
            this.cont = cont;
            return cont;
        },
        Block: function (height, width, color) {
            this.blockHeight = height;
            this.blockWidth = width;
            var b = new parent.PIXI.Graphics();
            b.beginFill(color).drawRect(0,0, width, height).endFill();
            this.body = b;
            return b;
        },
        hit: function (ballX, paddleX) {
            //this.cont.uncache();
            var blockX = ballX - paddleX;
            parent.ball.vx = blockX <= 50? -Math.abs(parent.ball.speed):Math.abs(parent.ball.speed);
            blockX /= 20;
            blockX = Math.floor(blockX);
            blockX *= 20;
            if(blockX < 0 )blockX = 0;
            //this.glowBlock.body.x = blockX;
            //this.glowBlock.body.alpha = 1
            //parent.TweenLite.killTweensOf(this.glowBlock.body);
            this.reset = this.reset.bind(this);
            //parent.TweenLite.to(this.glowBlock.body,1,{alpha:0, onComplete:this.reset});
            parent.ball.vy *=-1;
        },
        reset: function () {
            //this.cont.cache(-10,-10, 150, 50);
        }
    }

}

