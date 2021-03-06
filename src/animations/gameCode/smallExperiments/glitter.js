export default function GlitterCode (Utils, PIXI, loader_data) {
  return {
    utils: new Utils(),
    app: new PIXI.Application(),
    loader:  PIXI.loader,
    stage: new PIXI.Container(),
    canvasHeight: 400,
    dotsArray: [],
    linesArray: [],
    dotCont: new PIXI.Container(),
    lineCont: new PIXI.Container(),
    Init: function() {

        this.resize = this.resize.bind(this)
        window.onresize = this.resize;

        this.canvasWidth = this.utils.returnCanvasWidth();
        this.halfHeight = this.canvasHeight / 2;
        this.halfWidth = this.canvasWidth / 2;
        this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
        this.renderer.backgroundColor = 0x400175;
        document.getElementById("tugtugCanvas").appendChild(this.renderer.view);

        this.stage.addChild(this.dotCont);
        this.stage.addChild(this.lineCont);

        this.webGL = (this.renderer instanceof PIXI.CanvasRenderer) ? false : true;
        this.dotQ = (this.webGL === true) ? 1000 : 100;
        this.lineQ = (this.webGL === true) ? 360 : 36;

        this.Main = this.Main.bind(this)
        if(!this.loader.resources.spritesheet){
            this.loader.add('spritesheet', '/bmps/shimmer.json').load(this.Main);
            this.loader.onComplete.add(() => {
                loader_data('off');
                });
        } else {
            this.Main();
            loader_data('off');
        }
    },
    Main: function() {
        this.app.ticker.add(this.animate.bind(this));
        this.dots();
        this.lines();
    },
    Stop: function () {
        window.onresize = null;
        this.loader.destroy();
        this.app.ticker.destroy();
        this.renderer.destroy();
    },
    lines: function() {
        this.lineCont.x = this.halfWidth;
        this.lineCont.y = 150;
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
        this.dotCont.x = this.halfWidth;
        this.dotCont.y = 150;
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

        if (Math.floor(Math.random()*2) > 0) { 
            dot.startX = Math.random() * this.utils.returnCanvasWidth();
        } else {
            dot.startX = -Math.random() * this.utils.returnCanvasWidth();
        }
        if (Math.floor(Math.random()*2) > 0) { 
            dot.startY = Math.random() * this.utils.returnCanvasWidth();
        } else {
            dot.startY = -Math.random() * this.utils.returnCanvasWidth();
        }

        if(Math.floor(Math.random()*2) > 1){ dot.startY *=-1};
        dot.xDiff = Math.abs(dot.startX * 0.75);
        dot.yDiff = Math.abs(dot.startY * 0.75);
        dot.alpha = Math.random()*0.25+0.1;
        dot.speed = this.utils.randomNumberBetween(0.0005, 0.001);
        dot.tint = 0xFFFF00;
        return dot;
    },
    resize: function() {
        this.canvasWidth = this.utils.returnCanvasWidth();
        this.canvasHeight = 400;
        this.halfWidth = this.canvasWidth / 2;
        this.renderer.resize(this.canvasWidth, this.canvasHeight);
        this.dots();
        this.lines();
        this.stage.visible = true;
    },
    animate: function() {
            let dot, line, i;
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