export default function(Utils, PIXI, canvas) {
  return {
    utils: new Utils(),
    app: new PIXI.Application(),
    loader:  PIXI.loader,
    lineQ: 0,
    lines: [],
    canvasWidth: 0,
    canvasHeight:0,
    stage: {},
    renderer: {},
    objectPool: [],
    colors: [0xFF00FF, 0xFF922D, 0x8442FF, 0x59FF49, 0xFFF53E],
    Init: function() {
        window.onresize = this.resizeFunction.bind(this);
        this.canvasWidth = this.utils.returnCanvasWidth();
        this.canvasHeight = this.utils.returnCanvasHeight();
        this.stage = new PIXI.Container(); 
        this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
        this.renderer.backgroundColor = 0x333333;
        canvas.appendChild(this.renderer.view);
        this.webGL = (this.renderer instanceof PIXI.CanvasRenderer) ? false : true;
        this.lineQ = (this.webGL === true) ? 50 : 10;
        this.app.ticker.add(this.animate.bind(this));
        let line;
        let colorCounter = 0;
        for(let i = 0; i < this.lineQ; i++){
            let h = this.utils.randomNumberBetween(1, 5);
            let vy = this.utils.randomNumberBetween(1, 2);
            line = new PIXI.Graphics();
            this.objectPool.push(line);
            line
            .beginFill(this.colors[colorCounter])
            .drawRect(0,0,this.canvasWidth, h)
            .endFill();
            line.alpha = this.utils.randomNumberBetween(0.2, 0.35);
            line.vy = vy;
            line.h = h;
            line.y = this.utils.randomNumberBetween(0, this.canvasHeight-h);
            this.lines.push(line);
            this.stage.addChild(line);
            colorCounter ++;
            if (colorCounter >= this.colors.length){
                colorCounter = 0;
            }
        }
    },
    Stop: function () {
        this.stage.removeChildren();
        window.onresize = null;
        this.app.ticker.remove(this.animate.bind(this));
    },
    resizeFunction: function() {
        this.stage.removeChildren();
        this.canvasWidth = this.utils.returnCanvasWidth();
        this.canvasHeight =this.utils.returnCanvasHeight();
        this.renderer.resize(this.canvasWidth, this.canvasHeight);
        let line;
         for(let i = 0; i < this.lineQ; i++){
            line = this.lines[i];
            line.width = this.canvasWidth;
            this.stage.addChild(line);
        }
    },
    animate: function() {
        for(let i = 0; i < this.lineQ; i++){
            this.lines[i].y +=this.lines[i].vy;
            if(this.lines[i].y > (this.canvasHeight-this.lines[i].h*2) || this.lines[i].y < 0){
                this.lines[i].vy *= -1;
            }
        }
        this.renderer.render(this.stage);
        
    }
  }
};