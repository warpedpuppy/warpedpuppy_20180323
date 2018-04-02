export default function WhirleyGigs(PIXI, Utils, Stats) {
    return {
        stage: new PIXI.Container(),
        utils: new Utils(),
        app: new PIXI.Application(),
        loader:  PIXI.loader,
        lines: [],
        temp: [],
        newScale: 1,
        kingCont: new PIXI.Container(),
        stats: new Stats(),
        init: function () {
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = 400;
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
            this.renderer.backgroundColor = 0xFFFFFF;

            document.getElementById("tugtugCanvas").appendChild(this.renderer.view);
            this.webGL = (this.renderer instanceof PIXI.CanvasRenderer) ? false : true;
            this.lineQ = (this.webGL === true) ? 360 : 36;

            let customContainer = document.getElementById('my-stats-container');
            customContainer.appendChild(this.stats.domElement);
            this.resize = this.resize.bind(this);
            window.onresize = this.resize;


            if(!this.loader.resources.spritesheet){
                this.loader.add('spritesheet', '/bmps/shimmer.json').load(this.Main.bind(this));
            } else {
                this.Main.bind(this)
                this.Main();
            }
        },
        Main: function () {
            this.kingCont.pivot.x = this.canvasWidth/2;
            this.kingCont.pivot.y = this.canvasHeight/2;
            this.kingCont.x = this.halfWidth;
            this.kingCont.y = this.halfHeight;
            this.stage.addChild(this.kingCont);
            this.addMore = this.addMore.bind(this);
            this.reset = this.reset.bind(this);
            this.WhirlyGig = this.WhirlyGig.bind(this);

            let line = this.WhirlyGig();
            this.lines.push(line);
            line.x = this.halfWidth;
            line.y = this.halfHeight;
            line.tint = "0x"+this.utils.randomColor().substr(1);
            this.kingCont.addChild(line);
            this.stats.setMode(0);
            this.app.ticker.add(this.animate.bind(this));
        },
        stop: function () {
            this.app.ticker.destroy();
        },
        resize: function () {
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer.resize(this.canvasWidth,this.canvasHeight);
            this.kingCont.x = this.halfWidth;
        },
        WhirlyGig: function () {

            let cont = new PIXI.Container();
            cont.added = false;
            let line = new PIXI.Sprite.fromFrame("line.gif");

            line.anchor.x = line.anchor.y = 0.5;
            line.tint = "0x" + this.utils.randomColor().substr(1);
            cont.addChild(line);

            cont.shell1 = new PIXI.Container();
            cont.shell1.scale.x = cont.shell1.scale.y = .95;
            cont.shell1.x = -line.width/2;
            line.addChild(cont.shell1);

            cont.shell2 = new PIXI.Container();
            cont.shell2.scale.x = cont.shell2.scale.y = .95;
            cont.shell2.x = line.width/2;
            line.addChild(cont.shell2);

            cont.spinSpeed = this.utils.randomNumberBetween(.01,.5);

            if(Math.floor(Math.random()*2)){cont.spinSpeed *=-1;}
            cont.line = line;
            let that = this;

            cont.spin = function(){
                cont.line.rotation += that.utils.deg2rad(cont.spinSpeed);
            }
            cont.add = function (that) {
                if(cont.shell1.children.length === 0){
                    let l = that.WhirlyGig();
                    l.rotation = 10;
                    cont.shell1.addChild(l);
                    that.temp.push(l);

                    l = that.WhirlyGig();
                    l.rotation = 10;
                    cont.shell2.addChild(l);
                    that.temp.push(l);
                }
            }
            return cont;
        },
        addMore: function () {
            for (let i = 0; i < this.lines.length; i++) {
                this.lines[i].add(this);
            }
            for (let i = 0; i < this.temp.length; i++) {
                this.lines.push(this.temp[i]);
            }
            this.temp.length = 0;
            this.newScale *=.95;
            this.kingCont.scale.x = this.kingCont.scale.y = this.newScale;
        },
        reset: function () {
            let store = this.kingCont.getChildAt(0).x
            this.kingCont.scale.x = this.kingCont.scale.y = 1;
            this.kingCont.removeChildren();
          
            this.lines.length = 0;
            this.temp.length = 0;

            let line = this.WhirlyGig();
            this.lines.push(line);
           
            line.x = store;
            line.y = this.halfHeight;
            this.kingCont.addChild(line);
           
        },
        animate: function() {
            for(let i = 0; i < this.lines.length; i++){
                this.lines[i].spin();
            }
            this.stats.update();
            this.renderer.render(this.stage);
        }
    }
}