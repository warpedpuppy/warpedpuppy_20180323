export default function NodeGarden (PIXI, Utils){
    return {
        utils: new Utils(),
        canvasHeight: 400,
        numParticles: 50,
        minDist: 100,
        springAmount: .001,
        particles: [],
        lines: [],
        colors: [0xFFF81A,0xFF4108,0x17FF00,0x0877E8,0x410178],
        colorCounter: 0,
        stage: new PIXI.Container(),
        app: new PIXI.Application(),
        speedLimit: 6,
        init: function () {

            this.resize = this.resize.bind(this);
            window.onresize = this.resize;

            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = 400;
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
            this.renderer.backgroundColor = 0x333333;
            document.getElementById("tugtugCanvas").appendChild(this.renderer.view);

            this.build();
            this.app.ticker.add(this.animate.bind(this));

        },
        stop: function () {
            window.onresize = undefined;
            this.app.ticker.destroy();
            this.renderer.destroy();
        },
        build: function () {
            this.particles = [];
            this.lines = [];

            let particle, line, i;
            for (i = 0; i < this.numParticles; i++) {
                particle = this.Ball(3, this.colors[this.colorCounter]);
                particle.body.x = Math.random() *  this.canvasWidth;
                particle.body.y = Math.random() *  this.canvasHeight;
                particle.vx = Math.random() * 6 - 3;
                particle.vy = Math.random() * 6 - 3;
                this.particles.push(particle);

                line = new PIXI.Graphics();
                this.lines.push(line);
                this.stage.addChild(line);
                this.stage.addChild(particle);

                this.colorCounter ++;
                if ( this.colorCounter === 5) {
                    this.colorCounter = 0;
                }
            }
        },
        animate: function (event) {
            let i, j, particle, partA, partB;
            for (i = 0; i < this.numParticles; i++) {
                this.lines[i].clear();
                particle = this.particles[i];

                particle.body.x += particle.vx;
                particle.body.y += particle.vy;

                if (particle.body.x > this.canvasWidth) {
                    particle.body.x = 0;
                    particle.vx = Math.random() * 6 - 3;
                } else if (particle.body.x < 0) {
                    particle.body.x = this.canvasWidth;
                     particle.vx = Math.random() * 6 - 3;
                }

                if (particle.body.y > this.canvasHeight) {
                    particle.body.y = 0;
                    particle.vy = Math.random() * 6 - 3;
                } else if(particle.body.y < 0) {
                    particle.body.y = this.canvasHeight;
                    particle.vy = Math.random() * 6 - 3;
                }

            }
            for (i = 0; i < this.numParticles - 1; i++) {
                partA = this.particles[i];
                for (j = i + 1; j < this.numParticles; j++) {
                    partB = this.particles[j];
                    this.spring(partA, partB, i);
                }
            }
            this.renderer.render(this.stage);

        },
        Ball: function (radius, color) {
            let cont = new PIXI.Container();
            cont.radius = radius;
            cont.height = cont.radius * 4;
            cont.vx = 0;
            cont.vy = 0;

            cont.xpos = 0;
            cont.ypos = 0;

            var b = new PIXI.Graphics();
            b.beginFill(color).drawCircle(0,0,cont.radius * 2);
            cont.addChild(b);

            cont.body = b;
            return cont;
        },
        spring: function (partA, partB, index) {
            var dx = partB.body.x - partA.body.x;
            var dy = partB.body.y - partA.body.y;
            var dist = Math.sqrt(dx * dx + dy * dy);

            if(dist < this.minDist)
            {
                var line = this.lines[index];
                line.clear();
                line.lineStyle(1, 0xFFFFFF);
                line.moveTo(partA.body.x, partA.body.y);
                line.lineTo(partB.body.x, partB.body.y);
                line.alpha = 1 - dist / this.minDist;

                var ax = dx * this.springAmount;
                var ay = dy * this.springAmount;
                partA.vx += ax;
                partA.vy += ay;
                partB.vx -= ax;
                partB.vy -= ay;
            }
        },
        resize: function () {
            this.stage.removeChildren();
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.renderer.resize(this.canvasWidth, this.canvasHeight);
            this.build();
        }
    }
}