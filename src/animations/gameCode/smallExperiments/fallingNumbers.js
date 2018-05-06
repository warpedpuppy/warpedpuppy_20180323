export default function Numbers (PIXI, Utils, Stats, loader_data) {
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
        canvasHeight: 400,
        init: function () {
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
            document.getElementById("tugtugCanvas").appendChild(this.renderer.view);

            this.webGL = (this.renderer instanceof PIXI.CanvasRenderer) ? false : true;

            this.resize = this.resize.bind(this);
            window.onresize = this.resize;

            this.Main = this.Main.bind(this);
            this.animate = this.animate.bind(this);

            this.app.ticker.add(this.animate);

            this.stats.setMode(0);
            let customContainer = document.getElementById('my-stats-container');
            customContainer.appendChild(this.stats.domElement);

            if (!this.loader.resources.Typewriter) {
              this.loader
                  .add('Typewriter', "/fonts/games/fallingNumbers/greenNumbers.xml")
                  .load(this.Main)
                  .onComplete.add(() => {
                      loader_data('off');
                   });
            } else {
              this.Main();
              loader_data('off')
            }
            
        },
        Main: function () {
            this.build();
        },
        build: function () {
            let textObj = {font: "12px Typewriter", align: "left"},
                text0 = new PIXI.extras.BitmapText("0", textObj),
                width = text0.textWidth,
                height = text0.textHeight,
                row,
                col,
                i,
                j,
                str,
                testString;
            this.colQ = Math.ceil(this.canvasWidth/width);
            this.rowQ = Math.ceil(this.canvasHeight/height);
            this.noDups = [];
            this.streamers = [];
            for (i = 0; i < this.rowQ; i++) {
                this.texts[i] = {};
                for (j = 0; j < this.colQ; j++) {
                    str = (Math.floor(Math.random()*2) === 0)?"0":"1";
                    text0 = new PIXI.extras.BitmapText(str, textObj);
                    text0.x = width * j;
                    text0.y = height * i;
                    this.texts[i][j] = text0;
                    text0.alpha = .25;
                    this.stage.addChild(text0);
                }
            }

            this.streamerQ = Math.floor(this.colQ * 0.33);

            for(i = 0; i < this.streamerQ; i ++){
                row = this.utils.randomIntBetween(0, this.rowQ-1);
                col = this.utils.randomIntBetween(0, this.colQ-1);
                testString = `${row}_${col}`;
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
            window.onresize = undefined;
            this.loader.destroy();
            this.app.ticker.destroy();
            this.renderer.destroy();
        },
        resize: function () {
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer.resize(this.canvasWidth,this.canvasHeight);
            this.stage.removeChildren();
            this.build();
        },
        Streamer: function (col, row) {
            let obj = {},
                lighted_number,
                i;
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
                        if(this.row >= (this.rowQ)){
                            this.row = 0;
                        }
                        this.newNumber = this.texts[this.row][this.col];
                        this.newNumber.alpha = 1;
                        this.lit.push(this.newNumber);
                       
                        for (i = 0; i < this.lit.length; i ++) {
                            lighted_number = this.lit[i];
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
