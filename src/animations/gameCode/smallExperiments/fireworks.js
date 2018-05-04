export default function Firework (PIXI, Utils, TimelineLite){
    return {
        utils: new Utils(),
        canvasHeight: 400,
        fs: [],
        fq: 20,
        starQ: 500,
        range: 100,
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
            this.renderer.backgroundColor = 0x000000;
            document.getElementById("tugtugCanvas").appendChild(this.renderer.view);
            this.build();
            this.app.ticker.add(this.animate.bind(this));
        },
        build: function () {;
            let i, firework, star, delay, shape, width, height, widthCheck = 0;
            for (i = 0; i < this.fq; i ++) {
                firework = this.FireworkInstance();
                firework.start = firework.start.bind(firework);
                firework.restart = firework.restart.bind(firework);
                firework.x = this.utils.randomNumberBetween(this.halfWidth-this.range,this.halfWidth+this.range);
                firework.y = this.utils.randomNumberBetween(this.halfHeight+50,this.halfHeight-this.range);
                this.stage.addChild(firework);
                this.fs.push(firework);
                delay = this.utils.randomIntBetween(0, 1);
                setTimeout(firework.start, delay);
            }
            for (i = 0; i < this.starQ; i ++) {
                star = new PIXI.Graphics();
                star.beginFill(0xFFFF00).drawCircle(0,0,0.25).endFill();
                star.x = this.utils.randomNumberBetween(0,this.canvasWidth);
                star.y = this.utils.randomNumberBetween(0,this.canvasHeight);
                this.stage.addChild(star);
            }
            while (widthCheck < this.canvasWidth) {
                shape = new PIXI.Graphics();
                width = this.utils.randomNumberBetween(10, 30);
                height =  this.utils.randomNumberBetween(10, 50);
                shape.beginFill(0x333333).drawRect(0,0,width, height).endFill();
                shape.x = widthCheck;
                shape.y = this.canvasHeight-height;
                this.stage.addChild(shape);
                widthCheck += width;
            }
        },
        stop: function () {
            this.app.ticker.destroy();
            this.renderer.destroy();
        },
        resize: function () {
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = 400;
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.stage.removeChildren();
            this.renderer.resize(this.canvasWidth, this.canvasHeight)
            this.fs = [];
            this.build();
        },
        FireworkInstance: function () {
            let cont = new PIXI.Container(),
                i = 0,
                cf = 0,
                numberOfBeams = 20,
                myBeam1,
                colorArray =[ 0xFFFF00 , 0xFF00FF , 0x00FF00 , 0x00FFFF , 0xCCFF00],
                color = colorArray[this.utils.randomIntBetween(0, colorArray.length-1)],
                that = this,
                fps = 60,
                fps2 = fps * 2,
                frames = that.utils.randomIntBetween(fps, fps2);
            cont.beams = [];
            for ( i = 0; i < numberOfBeams; i++) {
                myBeam1 = this.Beam(color);
                myBeam1.rotation = this.utils.deg2rad(Math.random()*360);
                myBeam1.scaleX = this.utils.randomNumberBetween(.2,1)
                myBeam1.scaleY = this.utils.randomNumberBetween(.2,1)
                cont.addChild(myBeam1);
                cont.beams.push(myBeam1);
            }
            cont.cf = cf;
            cont.numberOfBeams = numberOfBeams;
            cont.tl = new TimelineLite();
            cont.tls = [];
            cont.twinkleStart = Math.floor(frames * .33);
            cont.fadeOutStart = Math.floor(frames * .66);
            cont.end = frames;
            cont.start = function () {
                let beam;
                for (i = 0; i < numberOfBeams; i++) {
                    beam = this.beams[i];
                    beam.shape.rotation = that.utils.deg2rad(Math.random() * 360);
                    this.tl = new TimelineLite({ 
                        useFrames:true, 
                        onStart:this.alphaOne, 
                        onStartParams:[beam.shape]
                    });
                    this.distance = that.utils.randomNumberBetween(50,150);
                    this.tl.to(beam.shape, frames, {x:this.distance});
                    this.tls.push( this.tl);
                }
            }
            cont.restart = function () {
                this.cf = 0;
                this.x = that.utils.randomNumberBetween(that.halfWidth-that.range,that.halfWidth+that.range);
                this.y = that.utils.randomNumberBetween(that.halfHeight+50,that.halfHeight-that.range);
                for ( i = 0; i < numberOfBeams; i++) {
                    this.beams[i].shape.x = this.beams[i].shape.y = 0;
                    this.beams[i].alpha = 1;
                    if(this.tls[i])cont.tls[i].restart();
                }
            }
            return cont;
        },
        alphaOne: function (mc) {
           mc.alpha = 1;
        },
        Beam: function (color) {
            let cont = new PIXI.Container();
            let shape = new PIXI.Graphics();
            shape.beginFill(color).drawCircle(0,0,1).endFill();
            cont.addChild(shape);
            cont.shape = shape;
            return cont;
        },
        animate: function () {
            let i, j, f, twinkleStart, fadeOutStart, end;

            for (j = 0; j < this.fq; j++) {
                f =  this.fs[j]
                f.cf ++;
                twinkleStart = f.twinkleStart;
                fadeOutStart = f.fadeOutStart;
                end = f.end;
                if (f.cf >= twinkleStart && f.cf < fadeOutStart) {
                    for (i = 0; i < f.numberOfBeams; i++) {
                        f.beams[i].alpha = Math.random() * 1;
                        f.alpha = 1;
                    }
                }
                if (f.cf >= fadeOutStart) {
                    for (i = 0; i < f.numberOfBeams; i++) {
                        f.beams[i].alpha *= .75;
                    }
                }
                if (f.cf >= end) {
                    f.restart();
                }
            }
            this.renderer.render(this.stage);
        }
    }
}