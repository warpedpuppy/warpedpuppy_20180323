export default function Game (PIXI, Utils, loader_data){
    return {
        utils: new Utils(),
        backgroundCont: new PIXI.Container(),
        stage: new PIXI.Container(),
        app: new PIXI.Application(),
        loader: PIXI.loader,
        PIXI: PIXI,
        spacer: 50,
        panelWidth: 0,
        panelHeight: 0,
        panels: [],
        velX: 0,
        velY: 0,
        speed: 0.5,
        cols: 0,
        rows: 0,
        init: function (cols, rows) {
            this.cols = cols;
            this.rows = rows;
            this.resize = this.resize.bind(this);
            window.onresize = this.resize;
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.changeRowCols = this.changeRowCols.bind(this);
            this.canvasHeight = 400;
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
            this.renderer.backgroundColor = 0xFFFFFF;
            this.webGL = (this.renderer instanceof PIXI.CanvasRenderer) ? false : true;
            document.getElementById("tugtugCanvas").appendChild(this.renderer.view);
            this.animate = this.animate.bind(this);
            this.addPegPanels();
            this.stage.addChild(this.backgroundCont);
            this.app.ticker.add(this.animate.bind(this));
            this.keyPress = this.keyPress.bind(this);
            this.velX = this.velY = this.speed;
            this.total = this.cols * this.rows;
            this.placeBehindCols = this.cols - 1;
            this.placeBehindRows = this.rows - 1;
            window.addEventListener('keydown', this.keyPress);

        },
        changeRowCols: function (cols, rows) {
            this.cols = (cols !== undefined)?cols:this.cols;
            this.rows = (rows !== undefined)?rows:this.rows;
              this.placeBehindCols = this.cols - 1;
            this.placeBehindRows = this.rows - 1;
            this.total = this.cols * this.rows;
            this.addPegPanels();
        },
        keyPress: function(e){
            e.preventDefault();
             switch (e.keyCode) {
                case 37:
                    //alert('left');
                    this.velX = -this.speed;
                    break;
                case 38:
                    //alert('up');
                    this.velY = -this.speed;
                    break;
                case 39:
                    //alert('right');
                    this.velX = this.speed;
                    break;
                case 40:
                    //alert('down');
                    this.velY = this.speed;
                    break;
                default:
                    console.log('')
            }
        },
        addPegPanels: function () {
            let panel,
                panelCounter = 0;
            this.panels = [];
            this.backgroundCont.removeChildren();
            for(let i = 0; i < this.rows; i++){
                for (let j = 0; j < this.cols; j ++) {
                panel = this.PegPanel(panelCounter);
                let w = this.panelWidth = panel.width;
                let h = this.panelHeight = panel.height;
                panel.x = w * j;
                panel.y = h * i;
                this.panels.push(panel)
                this.backgroundCont.x = this.halfWidth - (this.panelWidth/2);
                this.backgroundCont.y = this.halfHeight - (this.panelHeight/2);
                this.backgroundCont.addChild(panel);

                let frame = new PIXI.Graphics();
                frame.lineStyle(3, 0xFF0000).moveTo(0,0).lineTo(w, 0).lineTo(w,h).lineTo(0,h).lineTo(0,0)
                this.backgroundCont.addChild(frame);
                panelCounter ++;
            }
            }
            loader_data('off');

        },
        PegPanel: function (num) {
            let peg,
                pegPanel = new PIXI.Container();

            let horizQ = 2;//(this.canvasWidth / this.spacer) + 1;
            let vertQ = 2;//this.canvasHeight / this.spacer;

            this.horizSpacer = 100;
            this.vertSpacer = 50;

            let dot = new PIXI.Graphics();
            dot.beginFill(0x000000).drawCircle(0,0,20).endFill();
            dot.x = this.horizSpacer/2;
            dot.y = this.vertSpacer/2;
            dot.pivot.x = dot.pivot.y = 0.5;
            pegPanel.addChild(dot);

             let text = new PIXI.Text(num,{fontFamily : 'Arial', fontSize: 24, fill : 0xffffff, align : 'center'});
            text.x = this.horizSpacer/2;
            text.y = this.vertSpacer/2;
            text.anchor.x = text.anchor.y = 0.5;
             pegPanel.addChild(text)


            for (let i = 0; i < vertQ; i ++) {
                for (let j = 0; j < horizQ; j ++) {
                    peg = this.Peg();
                    peg.x = j*this.horizSpacer;
                    peg.y = i*this.vertSpacer;
                    pegPanel.addChild(peg);
                }
            }
            return pegPanel;
        },
        Peg: function () {
            let dot = new PIXI.Graphics();
            dot.beginFill(0x333333).drawCircle(0,0,2).endFill();
            return dot;
        },
        Stop: function () {
            this.app.ticker.destroy();
            this.renderer.destroy();
            window.onresize = undefined;
           
        },
        resize: function () {
            
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = 400;
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer.resize(this.canvasWidth,this.canvasHeight);
            this.changeRowCols();
        },
        handleKeyDown: function (event) {
            event.preventDefault();
            switch(event.keyCode) {
                case 39:
                    //right
                    this.paddle.vx = this.paddle.speed;
                    this.paddle.moveLeft = false;
                    this.paddle.moveRight= true;
                    this.paddle.peterOut = false;

                    break;
                case 37:
                    //left
                    this.paddle.vx = this.paddle.speed;
                    this.paddle.moveLeft = true;
                    this.paddle.moveRight= false;
                    this.paddle.peterOut = false;
                    break;
                case 13:
                    this.startButton.classRef.startGame();
                    break;
                default:
                    this.paddle.vx = 0;
                    break;

            }
        },
        handleKeyUp: function (event) {
            switch(event.keyCode) {
                case 39:
                    //right
                    this.paddle.moveRight= false;
                    this.paddle.peterOut = true;
                    break;
                case 37:
                    //left
                    this.paddle.peterOut = true;
                    this.paddle.moveLeft = false;
                    break;
                default:
                    this.paddle.moveRight= false;
                    this.paddle.peterOut = false;
                    this.paddle.peterOut = false;
                    this.paddle.moveLeft = false;
                    break;

            }
        },
        animate: function () {
            for(let i = 0; i < this.total; i++){

                this.panels[i].y += this.velY;
                this.panels[i].x += this.velX;
                if(this.panels[i].y > this.panelHeight * this.placeBehindRows){
                    this.panels[i].y = -this.panelHeight;
                }
                if(this.panels[i].x > this.panelWidth * this.placeBehindCols){
                    this.panels[i].x = -this.panelWidth;
                }
                 if(this.panels[i].y < -this.panelHeight * this.placeBehindRows){
                    this.panels[i].y = this.panelHeight;
                }
                if(this.panels[i].x < -this.panelWidth * this.placeBehindCols){
                    this.panels[i].x = this.panelWidth;
                }
            }

            this.renderer.render(this.stage);
        }
    }
}
