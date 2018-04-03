export default function PrettyDots (PIXI, Utils, Stats) {
    return {
        utils: new Utils(),
        canvasHeight: 400,
        stage: new PIXI.Container(),
        app: new PIXI.Application(),
        loader:  PIXI.loader,
        stats: new Stats(),
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

            this.resize = this.resize.bind(this);
            window.onresize = this.resize;

             this.stats.setMode(0);

            if(!this.loader.resources.spritesheet){
                this.loader.add('spritesheet', '/bmps/shimmer.json').load(this.Main.bind(this));
            } else {
                this.Main.bind(this)
                this.Main();
            }
        },
        stop: function () {
            this.app.ticker.destroy();
        },
        Main: function () {
            this.flower = this.Flower(0);
            this.flower.x = this.halfWidth;
            this.flower.y = this.halfHeight;
            this.stage.addChild(this.flower);
            this.flowers = [];
            this.flowers.push(this.flower);
            this.app.ticker.add(this.animate.bind(this));
            let customContainer = document.getElementById('my-stats-container');
            customContainer.appendChild(this.stats.domElement);
        },
        Flower: function (zero) {
            let cont = new PIXI.Container();
            let spinners = this.Spinners(zero);
            cont.spinners = cont;
            cont.addChild(spinners);
            let that = this;
            cont.project = function () {
                for (let j = 0; j < spinners.spinners.length; j ++) {
                    spinners.spinners[j].project();
                }
            }
            cont.add = function () {
                for (let j = 0; j < spinners.spinners.length; j ++) {
                    let f = that.Flower(spinners.spinners[j].x + Math.random()*100);
                    that.flowers.push(f)
                    spinners.spinners[j].addChild(f);
                }
            }
            return cont;
        },
        Spinners: function (zero) {
            let cont = new PIXI.Container();
            let q = this.utils.randomIntBetween(10, 30);
            let spinners = [];
            let s;
            for (let i = 0; i < q; i ++) {
                s = this.Spinner(zero,this.utils.randomIntBetween(3, 10));
                s.rotation = this.utils.deg2rad(360/q)*i;
                spinners.push(s);
                cont.addChild(s)
            }
            cont.spinners = spinners;
            return cont;
        },
        Spinner: function (zero, size) {
            let cont = new PIXI.Container();
            let dot = new PIXI.Sprite.fromFrame("dot.png");
            dot.width = dot.height =size
            dot.tint = "0x" + this.utils.randomColor().substr(1);
            dot.var = (Math.random()*150) + 20;
            cont.addChild(dot);
            let that = this;
            cont.project = function () {
                cont.rotation += that.utils.deg2rad(1);
                dot.x = that.utils.cosWave(zero, dot.var,.001);
            }
            return cont;
        },
        addMore: function () {
            this.flower.add();
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
            this.stage.removeChildren();
            this.flower = this.Flower(0);
            this.flower.x = this.halfWidth;
            this.flower.y = this.halfHeight;
            this.stage.addChild(this.flower);
            this.flowers = [];
            this.flowers.push(this.flower);
        },
        animate: function () {
            for (let i = 0; i < this.flowers.length; i ++) {
                this.flowers[i].project();
            }
            this.stats.update();
            this.renderer.render(this.stage);
        }
    }
}

