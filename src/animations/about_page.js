export default function Ladybug (PIXI, Utils, TimelineMax, BezierPlugIn, Power1) {
return {
        utils: new Utils(),
        canvasHeight: 400,
        boardWidthHeight: 19,
        tileWidth: 27,
        idNo:  0,
        pathArray: [],
        pathArrayCounter: 0,
        go: {},
        tileWidthHeight: 25,
        stage: new PIXI.Container(),
        app: new PIXI.Application(),
        bugs: [],
        loader:  PIXI.loader,
        init: function () {
            this.resize = this.resize.bind(this);
            window.onresize = this.resize;
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = this.utils.returnCanvasHeight();
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
            this.renderer.backgroundColor = 0x333333;
            document.getElementById("aboutCanvas").appendChild(this.renderer.view);
            this.webGL = (this.renderer instanceof PIXI.CanvasRenderer) ? false : true;
            this.bugQ = (this.webGL === true) ? 200 : 50;
            this.Main.bind(this)
            this.Main();
        },
        Main: function () {
            let colors = [0xFFFF00,0xFF00FF,0x17FF00,0x0877E8,0x410178];
            let counter = 0;
            for (let i = 0; i < this.bugQ; i ++) {
                this.body = new PIXI.Graphics();//new PIXI.extras.AnimatedSprite(this.walking);
                let diam = Math.floor(Math.random()*100)+100;
                this.body.beginFill(colors[counter]).drawCircle(0,0,diam).endFill();
                let startX = Math.floor(Math.random()* this.canvasWidth);
                let startY = Math.floor(Math.random()* this.canvasHeight)
                this.body.x = startX;
                this.body.scale.x = this.body.scale.y = Math.floor(Math.random()*1)+0.25;
                this.body.y =startY;
                this.body.alpha =  Math.floor(Math.random()*1)+0.25;
                this.bugs.push(this.body);
                this.stage.addChild(this.body);
                counter ++;
                if(counter === colors.length - 1){
                    counter = 0;
                }
               
            }
              this.tl = new TimelineMax({repeat: -1, yoyo: true});
              let startX = 100;
              let startY = 100;
                let arr = [{x:startX, y:startY}, 
                    {x:startX + 100, y:startY + 250}, 
                    {x:startX + 150, y:startY + 100}, 
                    {x:startX + 700, y:startY + 700}, 
                    {x:startX + 500, y:startY + 400, alpha:0},
                    {x:startX, y:startY}]
                this.tl.staggerTo(this.bugs, 10, { bezier: {
                      type: 'thru',
                      values: arr,
                      curviness: 1
                    }, ease: Power1.easeInOut }, 0.1);
            this.app.ticker.add(this.animate.bind(this));
           

        },
        stop: function () {
            this.app.ticker.destroy();
            this.renderer.destroy();
        },
        animate: function () {
            this.renderer.render(this.stage);
        },
        resize: function () {
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = this.utils.returnCanvasHeight();
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer.resize(this.canvasWidth, this.canvasHeight);
            this.stage.removeChildren();
            this.tl.stop();
            for (let i = 0; i < this.bugQ; i ++) {
                this.body = this.bugs[i];
                let startX = Math.floor(Math.random()* this.canvasWidth);
                let startY = Math.floor(Math.random()* this.canvasHeight)
                this.body.x = startX;
                this.body.y = startY;
                this.stage.addChild(this.body);
            }
            this.tl.restart();
        }
    }
}