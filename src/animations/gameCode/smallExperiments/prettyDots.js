export default function PrettyDots (PIXI, Utils, Stats) {
    return {
        utils: new Utils(),
        canvasHeight: 400,
        stage: new PIXI.Container(),
        app: new PIXI.Application(),
        loader:  PIXI.loader,
        stats: new Stats(),
        shells: [],
        init: function () {

            this.resize = this.resize.bind(this);
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = 400;
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
            this.renderer.backgroundColor = 0xFFFFFF;
            document.getElementById("tugtugCanvas").appendChild(this.renderer.view);
            this.resize = this.resize.bind(this);
            window.onresize = this.resize;
            this.stats.setMode(0);

            if (!this.loader.resources.spritesheet) {
                this.loader.add('spritesheet', '/bmps/shimmer.json').load(this.Main.bind(this));
            } else {
                this.Main.bind(this)
                this.Main();
            }
        },
        stop: function () {
            this.loader.destroy();
            this.app.ticker.destroy();
            this.renderer.destroy();
        },
        Main: function () {
            let kingCont = this.kingCont = new PIXI.Container();
            kingCont.x = this.halfWidth;
            kingCont.y = this.halfHeight;
            this.stage.addChild(kingCont);
            let shell = this.SpinningShell();
            kingCont.addChild(shell);
            this.app.ticker.add(this.animate.bind(this));
            let customContainer = document.getElementById('my-stats-container');
            customContainer.appendChild(this.stats.domElement);
        },
        SpinningShell: function () {
            let cont = new PIXI.Container();
            let q = this.utils.randomIntBetween(100, 300);
            let dots = [];
            let dot;
            for (let i = 0; i < q; i ++) {
                dot = this.Dot(this.utils.randomIntBetween(3, 10));
                dot.rotation = this.utils.deg2rad(360/q)*i;
                dots.push(dot);
                cont.addChild(dot)
            }
            this.shells.push(cont);
            cont.dots = dots;
            let that = this;
            cont.rotation = that.utils.randomNumberBetween(.00005, .0001)
            cont.cosineWave = function () {
                for (let i = 0; i < q; i ++) {
                    let dot = dots[i];
                    dot.child.x = that.utils.cosWave(0, dot.var,dot.timing);
                    dot.rotation += that.utils.deg2rad(1);
                }
            }
            return cont;
        },
        Dot: function (size) {
            let cont = new PIXI.Container();
            let dot = new PIXI.Sprite.fromFrame("dot.png");
            dot.alpha = this.utils.randomNumberBetween(.05, 1)
            dot.x = 100;
            dot.width = dot.height = size
            dot.tint = "0x551A8B";// + this.utils.randomColor().substr(1);
            cont.var = (Math.random()*150) + 20;
            cont.timing = this.utils.randomNumberBetween(.0005, .001);
            cont.addChild(dot);
            cont.child = dot;
            return cont;
        },
        addMore: function () {
            let shell = this.SpinningShell();
            this.kingCont.addChild(shell);
        },
        resize: function () {
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = 400;
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer.resize(this.canvasWidth, this.canvasHeight);
            this.reset();

        },
        reset: function () {
            this.kingCont.removeChildren();
            this.kingCont.x = this.halfWidth;
            this.kingCont.y = this.halfHeight;
            this.stage.addChild(this.kingCont);
            let shell = this.SpinningShell();
            this.kingCont.addChild(shell);
        },
        animate: function () {
            for (let i = 0; i < this.shells.length; i ++) {
                this.shells[i].cosineWave();
            }
            this.stats.update();
            this.renderer.render(this.stage);
        }
    }
}

