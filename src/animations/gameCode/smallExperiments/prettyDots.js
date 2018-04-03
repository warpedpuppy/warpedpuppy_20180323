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
        Main: function () {
            this.flower = new Flower(0);
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
            let spinners = new Spinners(zero);
            cont.addChild(spinners);
            cont.project = function () {
                for (let j = 0; j < spinners.spinners.length; j ++) {
                    spinners.spinners[j].project();
                }
            }
            cont.add = function () {
                for (let j = 0; j < spinners.spinners.length; j ++) {
                    let f = new Flower(spinners.spinners[j].x+Math.random()*100);
                    this.flowers.push(f)
                    spinners.spinners[j].addChild(f);
                }
            }
            return cont;
        },
        Spinners: function (zero) {
            let cont = new PIXI.Container();
            let q = randomIntBetween(4, 10);
            let spinners = [];
            let s;
            for (let i = 0; i < q; i ++) {
                s = new Spinner(zero,randomIntBetween(3, 10));
                s.rotation = deg2rad(360/q)*i;
                spinners.push(s);
                cont.addChild(s)
            }
            cont.spinners = spinners;
            return cont;
        },
        Spinner: function (zero, size) {
            let cont = new PIXI.DisplayObjectContainer();
            let dot = new PIXI.Sprite.fromFrame("dot.png");
            dot.width = dot.height =size
            dot.tint = "0x"+randomColor().substr(1);
            cont.addChild(dot);
            cont.project = function(){
                cont.rotation += deg2rad(1);
                dot.x = cosWave(zero, 50,.001);
            }
            return cont;
        },
        addMore: function () {
            this.flower.add();
        },
        reset: function () {
            this.stage.removeChildren();
            this.flower = new Flower(0);
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
            this.renderer.render(this.stage);
        }
    }
}

