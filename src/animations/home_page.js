export default {


    var gv = {};

    var left_adjustment = .15;

    gv.animate = true;

    gv.canvasWidth = $(window).width();
    gv.canvasHeight = $(window).height();
    gv.halfHeight = gv.canvasHeight / 2;
    gv.halfWidth = gv.canvasWidth / 2;
    gv.dots = [];
    gv.lines = [];


    gv.stage = new PIXI.Stage(0x333333); //1a69ff);
    gv.renderer = PIXI.autoDetectRenderer(gv.canvasWidth, gv.canvasHeight);
    document.getElementById("index_canvas").appendChild(gv.renderer.view);
    gv.dotCont = new PIXI.DisplayObjectContainer();
    gv.stage.addChild(gv.dotCont);

    gv.lineCont = new PIXI.DisplayObjectContainer();
    gv.stage.addChild(gv.lineCont);


    var spriteSheetLoader = new PIXI.AssetLoader(["/images/site_wide/shimmer.json"]);


    spriteSheetLoader.onComplete = Main;
    spriteSheetLoader.load();

    gv.webGL = (gv.renderer instanceof PIXI.CanvasRenderer) ? false : true;

    gv.dotQ = (gv.webGL === true) ? 1000 : 100;
    gv.lineQ = (gv.webGL === true) ? 360 : 36;

    window.onresize = function() {
        resizeFunction();
    };

    function Main() {






        requestAnimFrame(animate);

        dots();
        lines();

    }

    function lines() {

        gv.lineCont.x = gv.canvasWidth * left_adjustment;
        gv.lineCont.y = 150;
        gv.lineCont.removeChildren();
        gv.lines = [];
        for (var i = 0; i < gv.lineQ; i++) {
            var line = new Line();

            line.rotation = Utils.deg2rad(i * (360 / gv.lineQ));
            line.x = 0; //gv.halfWidth;
            line.y = 0; //gv.halfHeight;


            gv.lineCont.addChildAt(line, 0);
            gv.lines.push(line);
        }


    }


    function Line() {

        var line = new PIXI.Sprite.fromFrame("line.gif");
        line.scale.y = 0.25;
        line.scale.x = line.scaleValue = Utils.randomNumberBetween(0.25, 1);

        line.scaleDiff = Utils.randomNumberBetween(0.5, 1);
        line.alpha = .05; //randomNumberBetween(0.1, 0.75);
        line.speed = Utils.randomNumberBetween(0.0005, 0.001);
        line.tint = 0xFFFF00;
        return line;
    }



    function dots() {

        gv.dotCont.removeChildren();
        gv.dots = [];
        for (var i = 0; i < gv.dotQ; i++) {
            var dot = new Dot();
            dot.x = dot.startX;
            dot.y = dot.startY;

            gv.dotCont.addChildAt(dot, 0);
            gv.dots.push(dot);
        }
    }


    function Dot() {

        var dot = new PIXI.Sprite.fromFrame("dot.png");
        dot.scale.x = dot.scale.y = Utils.randomNumberBetween(0.25, 1);
        dot.startX = Math.random() * gv.canvasWidth;
        dot.startY = Math.random() * gv.canvasHeight;
        dot.xDiff = Math.abs(dot.startX);
        dot.yDiff = Math.abs(dot.startY);
        dot.alpha = .05;
        dot.speed = Utils.randomNumberBetween(0.0005, 0.001);
        dot.tint = 0xFFFF00;
        return dot;
    }


    function resizeFunction() {


        gv.canvasWidth = $(window).width();
        gv.canvasHeight = $(window).height();
        gv.halfWidth = gv.canvasWidth / 2;

        gv.renderer.resize(gv.canvasWidth, gv.canvasHeight);

        dots();

    }

    function animate() {



        if (gv.animate === true) {

            for (var i = 0; i < gv.dotQ; i++) {
                var dot = gv.dots[i];
                dot.x = Utils.cosWave(dot.startX, dot.xDiff, dot.speed);
                dot.y = Utils.cosWave(dot.startY, dot.yDiff, dot.speed);

            }
            for (i = 0; i < gv.lineQ; i++) {
                var line = gv.lines[i];
                line.scale.x = Utils.cosWave(line.scaleValue, line.scaleDiff, line.speed);


            }
            gv.lineCont.rotation += 0.005;

            gv.renderer.render(gv.stage);
        }

        requestAnimFrame(animate);
    }


};