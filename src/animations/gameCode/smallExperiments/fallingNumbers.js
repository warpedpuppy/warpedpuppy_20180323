export default function Numbers (PIXI, Utils, Stats) {
    return {
        utils: new Utils(),
        stage: new PIXI.Container(),
        app: new PIXI.Application(),
        loader:  PIXI.loader,
        texts: {},
        streamers: [],
        streamerQ: 0,
        noDups: [],
        stats: new Stats(),
        init: function () {
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = 400;
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
            document.getElementById("tugtugCanvas").appendChild(this.renderer.view);
            this.webGL = (this.renderer instanceof PIXI.CanvasRenderer) ? false : true;
            this.resize = this.resize.bind(this);
            window.onresize = this.resize;
            if (!this.loader.resources.Typewriter) {
              this.loader.add('Typewriter', "/fonts/games/fallingNumbers/greenNumbers.xml").load(this.Main.bind(this));
            } else {
              this.Main.bind(this)
              this.Main();
            }
            
        },
        Main: function () {
            this.build();
            this.stats.setMode(0);
            let customContainer = document.getElementById('my-stats-container');
            customContainer.appendChild(this.stats.domElement);
            this.app.ticker.add(this.animate.bind(this));
        },
        build: function () {
            let text0 = new PIXI.extras.BitmapText("0", {font: "12px Typewriter", align: "left"});
            let width = text0.textWidth;
            let height = text0.textHeight;
            this.colQ = Math.floor(this.canvasWidth/width);
            this.rowQ = Math.floor(this.canvasHeight/height);
            let row, col;
            this.noDups = [];
            this.streamers = [];
            for(let i = 0; i < this.rowQ; i++){
                this.texts[i] = {};
                for(let j = 0; j < this.colQ; j++){
                    let str = (Math.floor(Math.random()*2) === 0)?"0":"1";
                    text0 = new PIXI.extras.BitmapText(str, {font: "12px Typewriter", align: "left"});
                    text0.x = width * j;
                    text0.y = height * i;
                    this.texts[i][j] = text0;
                    text0.alpha = .25;
                    this.stage.addChild(text0);
                }
            }
            this.streamerQ = Math.floor(this.colQ * 0.33);

            for(let i = 0; i < this.streamerQ; i ++){
                row = this.utils.randomIntBetween(0, this.rowQ-1);
                col = this.utils.randomIntBetween(0, this.colQ-1);
                let testString = `${row}_${col}`;
                while(this.noDups.indexOf(testString) !== -1){
                     row = this.utils.randomIntBetween(0, this.rowQ-1);
                     col = this.utils.randomIntBetween(0, this.colQ-1);
                     testString = `${row}_${col}`;
                }
                this.noDups.push(testString);
                this.streamers.push( this.Streamer(col, row));
            }
        },
        stop: function () {
            this.loader.destroy();
            this.app.ticker.destroy();
            this.renderer.destroy();
        },
        resize: function () {
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = 400;
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer.resize(this.canvasWidth,this.canvasHeight);
            this.stage.removeChildren();
            this.build();
        },
        Streamer: function (col, row) {
            let obj = {};
            obj.counter = 0;
            obj.lit = [];
            obj.col = col;
            obj.row = row;
            obj.current = this.texts[row][col];
            obj.current.alpha = 1;
            obj.lit.push(obj.current);
            obj.rowQ = this.rowQ;
            obj.texts = this.texts;

            obj.count = function () {
                this.counter ++;
                if (this.counter % 5 === 0) {
                        this.row ++;
                        if(this.row >= (this.rowQ-1)){
                            this.row = 0;
                        }
                        this.newNumber = this.texts[this.row][this.col];
                        this.newNumber.alpha = 1;
                        this.lit.push(this.newNumber);
                       
                        for (let i = 0; i < this.lit.length; i ++) {
                            let lighted_number = this.lit[i];
                            if (lighted_number.alpha > 0) {
                                lighted_number.alpha -= .074;
                            } else {
                                lighted_number.alpha = 0;
                                this.lit.splice(i,1);
                            }
                        }
                }
            }
            return obj;
        },
        animate: function () {
            for(let i = 0; i < this.streamerQ; i ++){
                this.streamers[i].count();
            }
            this.stats.update();
            this.renderer.render(this.stage);
        }
    }
}
