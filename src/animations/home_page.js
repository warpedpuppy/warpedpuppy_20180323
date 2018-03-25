export default function(Utils, PIXI, $) {
    return {
    gv: {},
    left_adjustment: .15,

    // gv.animate = true;
    // gv.canvasWidth = $(window).width();
    // gv.canvasHeight = $(window).height();
    // gv.halfHeight = gv.canvasHeight / 2;
    // gv.halfWidth = gv.canvasWidth / 2;
    // gv.dots = [];
    // gv.lines = [];
    // gv.stage = new PIXI.Stage(0x333333); //1a69ff);
    // gv.renderer = PIXI.autoDetectRenderer(gv.canvasWidth, gv.canvasHeight);
    // document.getElementById("index_canvas").appendChild(gv.renderer.view);
    // gv.dotCont = new PIXI.DisplayObjectContainer();
    // gv.stage.addChild(gv.dotCont);

    // gv.lineCont = new PIXI.DisplayObjectContainer();
    // gv.stage.addChild(gv.lineCont);


    // var spriteSheetLoader = new PIXI.AssetLoader(["/bmps/shimmer.json"]);


    // spriteSheetLoader.onComplete = Main;
    // spriteSheetLoader.load();

    // gv.webGL = (gv.renderer instanceof PIXI.CanvasRenderer) ? false : true;

    // gv.dotQ = (gv.webGL === true) ? 1000 : 100;
    // gv.lineQ = (gv.webGL === true) ? 360 : 36;

    // window.onresize = function() {
    //     resizeFunction();
    // };
    Main: function() {
        this.requestAnimFrame(this.animate);
        this.dots();
        this.lines();
    },
    lines: function() {
        this.gv.lineCont.x = this.gv.canvasWidth * this.left_adjustment;
        this.gv.lineCont.y = 150;
        this.gv.lineCont.removeChildren();
        this.gv.lines = [];
        for (var i = 0; i < this.gv.lineQ; i++) {
            var line = new this.Line();
            line.rotation = Utils.deg2rad(i * (360 / this.gv.lineQ));
            line.x = 0; //gv.halfWidth;
            line.y = 0; //gv.halfHeight;
            this.gv.lineCont.addChildAt(line, 0);
            this.gv.lines.push(line);
        }
    },
    Line: function() {
        var line = new PIXI.Sprite.fromFrame("line.gif");
        line.scale.y = 0.25;
        line.scale.x = line.scaleValue = Utils.randomNumberBetween(0.25, 1);
        line.scaleDiff = Utils.randomNumberBetween(0.5, 1);
        line.alpha = .05; //randomNumberBetween(0.1, 0.75);
        line.speed = Utils.randomNumberBetween(0.0005, 0.001);
        line.tint = 0xFFFF00;
        return line;
    },
    dots: function() {
        this.gv.dotCont.removeChildren();
        this.gv.dots = [];
        for (var i = 0; i < this.gv.dotQ; i++) {
            var dot = new this.Dot();
            dot.x = dot.startX;
            dot.y = dot.startY;
            this.gv.dotCont.addChildAt(dot, 0);
            this.gv.dots.push(dot);
        }
    },
    Dot: function() {
        var dot = new PIXI.Sprite.fromFrame("dot.png");
        dot.scale.x = dot.scale.y = Utils.randomNumberBetween(0.25, 1);
        dot.startX = Math.random() * this.gv.canvasWidth;
        dot.startY = Math.random() * this.gv.canvasHeight;
        dot.xDiff = Math.abs(dot.startX);
        dot.yDiff = Math.abs(dot.startY);
        dot.alpha = .05;
        dot.speed = Utils.randomNumberBetween(0.0005, 0.001);
        dot.tint = 0xFFFF00;
        return dot;
    },
    resizeFunction: function() {
        this.gv.canvasWidth = $(window).width();
        this.gv.canvasHeight = $(window).height();
        this.gv.halfWidth = this.gv.canvasWidth / 2;
        this.gv.renderer.resize(this.gv.canvasWidth, this.gv.canvasHeight);
        this.dots();
    },
    animate: function() {
        if (this.gv.animate === true) {
            for (var i = 0; i < this.gv.dotQ; i++) {
                var dot = this.gv.dots[i];
                dot.x = Utils.cosWave(dot.startX, dot.xDiff, dot.speed);
                dot.y = Utils.cosWave(dot.startY, dot.yDiff, dot.speed);
            }
            for (i = 0; i < this.gv.lineQ; i++) {
                var line = this.gv.lines[i];
                line.scale.x = Utils.cosWave(line.scaleValue, line.scaleDiff, line.speed);
            }
            this.gv.lineCont.rotation += 0.005;
            this.gv.renderer.render(this.gv.stage);
        }
        this.requestAnimFrame(this.animate);
    }
}
};