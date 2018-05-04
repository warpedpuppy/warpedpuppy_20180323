export default function(Utils, PIXI, canvas, TweenLite) {
  return {
    left_adjustment: .15,
    utils: new Utils(),
    app: new PIXI.Application(),
    loader:  PIXI.loader,
    Init: function() {
        window.onresize = this.resizeFunction.bind(this);
        this.canvasWidth = this.utils.returnCanvasWidth();
        this.canvasHeight = this.utils.returnCanvasHeight();
        this.halfHeight = this.canvasHeight / 2;
        this.halfWidth = this.canvasWidth / 2;
        this.dotsArray = [];
        this.linesArray = [];
        this.stage = new PIXI.Container(); 
        this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
        this.renderer.backgroundColor = 0x333333;
        canvas.appendChild(this.renderer.view);
        this.dotCont = new PIXI.Container();
        this.stage.addChild(this.dotCont);
        this.lineCont = new PIXI.Container();
        this.stage.addChild(this.lineCont);
        this.stage.alpha = 0;
        this.webGL = (this.renderer instanceof PIXI.CanvasRenderer) ? false : true;
        this.dotQ = (this.webGL === true) ? 1000 : 100;
        this.lineQ = (this.webGL === true) ? 360 : 36;
        if(!this.loader.resources.spritesheet){
            this.loader.add('spritesheet', '/bmps/shimmer.json').load(this.Main.bind(this));
             this.loader.onComplete.add(() => {
                    this.stageFadeIn();
                });
        } else {
            this.Main.bind(this)
            this.Main();
            this.stageFadeIn();
        }
    },
    Main: function() {
        this.app.ticker.add(this.animate.bind(this));
        this.dots();
        this.lines();
    },
    stageFadeIn: function () {
        TweenLite.to(this.stage, 1, {alpha:1})
    },
    Stop: function () {
        window.onresize = null;
        this.renderer.destroy();
        this.app.ticker.destroy();
        this.loader.destroy();
    },
    lines: function() {
        if (this.canvasWidth > 1024) {
            this.lineCont.x = this.canvasWidth * this.left_adjustment;
            this.lineCont.y = 150;
        } else {
            this.lineCont.x = this.halfWidth;
            this.lineCont.y = 150;
        }
        
        this.lineCont.removeChildren();
        this.linesArray = [];
        let i, line;
        for (i = 0; i < this.lineQ; i++) {
            line = this.Line();
            line.rotation = this.utils.deg2rad(i * (360 / this.lineQ));
            line.x = 0; 
            line.y = 0; 
            this.lineCont.addChildAt(line, 0);
            this.linesArray.push(line);
        }
    },
    Line: function() {
        let line = new PIXI.Sprite.fromFrame("line.gif");
        line.scale.y = 0.25;
        line.scale.x = line.scaleValue = this.utils.randomNumberBetween(0.25, 1);
        line.scaleDiff = this.utils.randomNumberBetween(0.5, 1);
        line.alpha = .05; 
        line.speed = this.utils.randomNumberBetween(0.0005, 0.001);
        line.tint = 0xFFFF00;
        return line;
    },
    dots: function() {
        this.dotCont.removeChildren();
        this.dotsArray = [];
        let i, dot;
        for (i = 0; i < this.dotQ; i++) {
            dot = this.Dot();
            dot.x = dot.startX;
            dot.y = dot.startY;
            this.dotCont.addChildAt(dot, 0);
            this.dotsArray.push(dot);
        }
    },
    Dot: function() {
        let dot = new PIXI.Sprite.fromFrame("dot.png");
        dot.scale.x = dot.scale.y = this.utils.randomNumberBetween(0.25, 1);
        dot.startX = Math.random() * this.utils.returnCanvasWidth();
        dot.startY = Math.random() * this.utils.returnCanvasHeight();
        dot.xDiff = Math.abs(dot.startX);
        dot.yDiff = Math.abs(dot.startY);
        dot.alpha = .05;
        dot.speed = this.utils.randomNumberBetween(0.0005, 0.001);
        dot.tint = 0xFFFF00;
        return dot;
    },
    resizeFunction: function() {
        this.canvasWidth = this.utils.returnCanvasWidth();
        this.canvasHeight =this.utils.returnCanvasHeight();
        this.halfWidth = this.canvasWidth / 2;
        this.renderer.resize(this.canvasWidth, this.canvasHeight);
        this.dots();
        this.lines();
    },
    animate: function() {
        let i, dot, line;
        for (i = 0; i < this.dotQ; i++) {
            dot = this.dotsArray[i];
            dot.x = this.utils.cosWave(dot.startX, dot.xDiff, dot.speed);
            dot.y = this.utils.cosWave(dot.startY, dot.yDiff, dot.speed);
        }
        for (i = 0; i < this.lineQ; i++) {
            line = this.linesArray[i];
            line.scale.x = this.utils.cosWave(line.scaleValue, line.scaleDiff, line.speed);
        }
        this.lineCont.rotation += 0.005;
        this.renderer.render(this.stage);
    }
  }
};