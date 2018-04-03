export default function DynamicGradients (PIXI, Utils) {
    return {
        increment: 3,
        colors: [],
        a: 0,
        b: .5,
        c: 1,
        suns: [],
        sunQ: 15,
        utils: new Utils(),
        canvasHeight: 400,
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
            this.renderer.backgroundColor = 0xFFFFFF;
            document.getElementById("tugtugCanvas").appendChild(this.renderer.view);

            this.one = this.halfHeight;
            this.two = this.canvasHeight;

            this.resize = this.resize.bind(this);
            window.onresize = this.resize;

            this.build();
            
        },
        build: function () {
            for (var i = 0; i < 10; i++) {
                this.colors.push(this.utils.randomColor());
            }
            const sky = new PIXI.Graphics();
            sky.createLinearGradient([0x003F87, 0x0276FD], [0, 1], 0, this.one, 0, this.two).drawRect(0, 0, this.canvasWidth, this.canvasHeight);
            sky.endFill();
            this.stage.addChild(sky);
   
            for (var i = 0; i < this.sunQ; i++) {
                var sun = this.Sun();
                this.stage.addChild(sun);
                this.suns.push(sun);
            }
        },
        Sun: function () {
            var sun = new PIXI.Graphics();
            sun.diameter = this.utils.randomNumberBetween(25, 75);
            sun.colors = [];
            sun.colors.push(this.utils.randomColor(), this.utils.randomColor(), this.utils.randomColor());
            sun.vy = this.utils.randomNumberBetween(1, 4);
            sun.vx = this.utils.randomNumberBetween(1, 4);
            sun.x = Math.random() * this.canvasWidth;
            sun.y = Math.random() * this.canvasHeight;
            return sun;
        },
        increase: function (num, max, min) {
            if (num > max) {
                this.increment = - this.increment;
            } else if (num < min) {
                 this.increment =  this.increment;
            }
            num +=  this.increment;
        },
        animate: function () {
            for (let i = 0; i < this.sunQ; i++) {
                this.suns[i].graphics.clear();
                this.suns[i].graphics.setStrokeStyle(4).beginStroke("#000000").beginRadialGradientFill([this.suns[i].colors[0], this.suns[i].colors[1], this.suns[i].colors[2]], [ this.a,  this.b,  this.c], 0, 0, this.suns[i].diameter / 2, 0, 0, this.suns[i].diameter, 0, 0, this.suns[i].diameter).drawCircle(0, 0, this.suns[i].diameter);
                this.suns[i].graphics.endFill();

                this.suns[i].y += this.suns[i].vy;
                this.suns[i].x += this.suns[i].vx;
                if (this.suns[i].y > this.canvasHeight + this.suns[i].diameter)this.suns[i].y = -this.suns[i].diameter;
                if (this.suns[i].x > this.canvasWidth + this.suns[i].diameter)this.suns[i].x = -this.suns[i].diameter;
            }

            this.a =  this.utils.cosWave(.1, .1, .0025);
            this.b = this.utils.cosWave(.5, .25, .0015);
            this.c = this.utils.cosWave(.75, .15, .0015);

            this.sky.graphics.clear();
            this.sky.graphics.beginLinearGradientFill(["#003F87", "#0276FD"], [0, 1], 0, this.one, 0, this.two).drawRect(0, 0, this.canvasWidth, this.canvasHeight).endStroke();

            this.sky.graphics.endFill();

            this.one += this.increment;
            if (this.one >= (this.canvasHeight - 10) || this.one <= 0)this.increment *= -1;


            this.renderer.render(this.stage);
        },
        resize: function () {
            this.stage.removeAllChildren();
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.renderer.resize(this.canvasWidth, this.canvasHeight);
            this.halfWidth = this.canvasWidth / 2;
            this.build();
        }
    }
}