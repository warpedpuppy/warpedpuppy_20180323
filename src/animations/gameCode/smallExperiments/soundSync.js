export default function SoundSync (PIXI, Utils) {
	return {
		typeSpeed: 100,
		fontReadyBoolean: false,
		soundReadyBoolean: false,
		playing: false,
		textArrayCounter: 0,
		app: new PIXI.Application(),
        loader:  PIXI.loader,
        utils: new Utils(),
        stage: new PIXI.Container(),
		textString: "Second Fig by Millay:|Safe upon the solid |rock the ugly houses stand|Come and see my shining palace |built upon the sand!",
        newString: '',
        init: function () {
        	this.animate = this.animate.bind(this);
        	this.newLetter = this.newLetter.bind(this);
        	this.onButtonDown = this.onButtonDown.bind(this);
        	this.textArray = this.textString.split('');
        	this.resize = this.resize.bind(this);
        	window.onresize = this.resize;
        	this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = 400;
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
            this.renderer.backgroundColor = 0xFFFFFF;
            this.kingCont = new PIXI.Container();
            this.stage.addChild(this.kingCont);
            this.StartButton = this.StartButton.bind(this);
           	this.ReStartButton = this.ReStartButton.bind(this);

            document.getElementById("tugtugCanvas").appendChild(this.renderer.view);

        	 if(!this.loader.resources.soundSyncTest){
        	 	// this.click = PIXI.sound.Sound.from('/sounds/click.mp3');
        	 	// this.carriageReturn = PIXI.sound.Sound.from('/sounds/carriageReturn.mp3');
                this.loader
                    .add('soundSyncTest', "/fonts/games/soundSync/testing.xml")
                    .add('click', "/sounds/click.mp3")
                    .add('return', "/sounds/carriageReturn.mp3")
                    .load(this.Main.bind(this));
                 if ( document.getElementById('loading')) {
                        document.getElementById('loading').innerHTML = '';
                    }   
            } else {
                this.Main.bind(this)
                this.Main();
                 if ( document.getElementById('loading')) {
                        document.getElementById('loading').innerHTML = '';
                    }   
            }
        },
        stop: function () {
        	clearTimeout(this.to);
        	this.loader.destroy();
            this.app.ticker.destroy();
            this.renderer.destroy();
        },
		Main: function () {


			this.button = this.StartButton();
			this.button.x = Math.floor(this.halfWidth-100);
            this.button.y = Math.floor(170);
            this.button.buttonMode = true;
            this.button.interactive = true;
            this.button.mousedown = this.onButtonDown;


            this.button2 = this.ReStartButton();
			this.button2.x = Math.floor(this.halfWidth-150);
            this.button2.y = Math.floor(this.canvasHeight-70);
            this.button2.buttonMode = true;
            this.button2.interactive = true;
            this.button2.mousedown = this.onButtonDown;
            this.button2.visible = false;

            this.stage.addChild(this.button2);
			this.stage.addChild(this.button);
			this.app.ticker.add(this.animate);


		},
		StartButton: function () {
			let button = new PIXI.Sprite();
            let buttonGraphic = new PIXI.Graphics();
            buttonGraphic.buttonMode = true;
            buttonGraphic.interactive = true;
            buttonGraphic.beginFill(0xFFFF00).drawRoundedRect(0,0,200,50,10).endFill();
            let buttonText = new PIXI.extras.BitmapText("click to start", {font: "24px AntsyPants", align: "left"})
            buttonText.y = -7;
            buttonText.x = 5;
          	button.addChild(buttonText);
            return button;

		},
		ReStartButton: function () {
			let button = new PIXI.Sprite();
            let buttonGraphic = new PIXI.Graphics();
            buttonGraphic.buttonMode = true;
            buttonGraphic.interactive = true;
            buttonGraphic.beginFill(0xFFFF00).drawRoundedRect(0,0,300,50,10).endFill();
            let buttonText2 = new PIXI.extras.BitmapText("click to re-start", {font: "24px AntsyPants", align: "left"})
            buttonText2.y = -7;
            buttonText2.x = 35;
            button.addChild(buttonText2);
            return button;

		},
		onButtonDown: function () {
			this.kingCont.removeChildren();
			this.textArrayCounter = 0;
			this.newString = "";
			this.go();
			this.button.visible = false;
			this.button2.visible = false;
		},
		fontReady: function () {
			this.fontReadyBoolean = true;
		},
		soundReady: function  () {
			 this.soundReadyBoolean = true;
		},
		go: function () {
			  	this.loader.resources.click.sound.play();
			    this.newString += this.textArray[this.textArrayCounter];
			    this.b = new PIXI.extras.BitmapText(this.newString, {font: "24px AntsyPants", align: "left"})
			    this.b.y = 50;
			    this.b.x = Math.ceil(( this.canvasWidth - this.b.getBounds().width)/2);
			    this.kingCont.addChild(this.b);
			    this.to = setTimeout(this.newLetter, this.typeSpeed)
		},
		newLetter: function () {
			if (this.textArrayCounter < this.textArray.length-1) {
		        this.kingCont.removeChild(this.b);
		        this.textArrayCounter ++;

		        var str = "click";
		        var str2 = this.textArray[this.textArrayCounter];
		        var speed = this.typeSpeed;

		        if (this.textArray[this.textArrayCounter] === "|") {
		            str = "carriageReturn";
		            str2 = "\n";
		            speed = this.typeSpeed * 10;
		        }
		        this.newString += str2; 
		        this.b = new PIXI.extras.BitmapText(this.newString, {font: "24px AntsyPants", align: "left"})
		        this.b.y = 50;
		        this.b.x = Math.ceil(( this.canvasWidth - this.b.getBounds().width)/2);
		        this.kingCont.addChild(this.b);
		 
		        this.to = setTimeout(this.newLetter, speed)
		        if(this.textArray[this.textArrayCounter] !== " "){
		        	if(str === 'click') {
						this.loader.resources.click.sound.play();
		        	} else {
		        		this.loader.resources.return.sound.play();
		        	}
		        }

		    } else {
		        this.button2.visible = true;
		    }

		},
		startIt (e) {
		    this.newString = "";
		    this.textArrayCounter = 0;
		    this.stage.removeChild(this.b);
		    this.playing = true;
		    this.go();

		},
		animate () {
			this.renderer.render(this.stage);

		},
		resize () {
		    this.canvasWidth = this.utils.returnCanvasWidth();
		    this.renderer.resize(this.canvasWidth, this.canvasHeight);
		    this.halfWidth = this.canvasWidth/2;
		    this.button.x = this.halfWidth-100;
		    this.button2.x = this.halfWidth-150;
		    if (this.b) this.b.x = Math.ceil(( this.canvasWidth - this.b.getBounds().width)/2);
		}

	}

}



