export default function SolitaireCode (PIXI, Utils, loader_data) {
	return {
		app: new PIXI.Application(),
		utils: new Utils(),
		stage: new PIXI.Container(),
    	canvasHeight: 400,
		init: function () {
			this.resize = this.resize.bind(this)
	        window.onresize = this.resize;
	        this.canvasWidth = this.utils.returnCanvasWidth();
	        this.halfHeight = this.canvasHeight / 2;
	        this.halfWidth = this.canvasWidth / 2;
	        this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
	        this.renderer.backgroundColor = 0x400175;
	        document.getElementById("tugtugCanvas").appendChild(this.renderer.view);
	        this.app.ticker.add(this.animate.bind(this));
	        this.Main = this.Main.bind(this);
            if(!this.loader.resources.instructions){
                this.loader
                 .add('l1', '/bmps/lady_bug/l1.png')
				 .add('l2', '/bmps/lady_bug/l2.png')
				 .add('l3', '/bmps/lady_bug/l3.png')
				 .add('l4', '/bmps/lady_bug/l4.png')
				 .add('l5', '/bmps/lady_bug/l5.png')
				 .add('startOver', '/bmps/lady_bug/startOver_btn.png')
				 .add('instructions', '/bmps/lady_bug/instructions_mc.png')
				 .add('brickWall', '/bmps/lady_bug/brickWall.png')
				 .load(this.Main)
				 .onComplete.add(() => {
                     loader_data('off');
                 });
            } else {
                this.Main();
                loader_data('off');
            }
		},
		Main: function () {

		},
		stop: function () {

		},
		animate: function () {
			this.renderer.render(this.stage);
		},
		resize: function () {
			this.canvasWidth = this.utils.returnCanvasWidth();
			this.halfWidth = this.canvasWidth / 2;
			this.renderer.resize(this.canvasWidth, this.canvasHeight);
		},
		Card: function (str1, suit, value, width, height) {

		    var cont = new PIXI.Container();
		    cont.width = width;
		    cont.height = height;
		    cont.storeX;
		    cont.storeY;
		    cont.value = value;
		    cont.suit = suit;
		    cont.color = (suit == "spades" || suit == "clubs")?"black":"red";
		    cont.pile;

		    var arr = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];

		    cont.name = arr[cont.value];

		    var background = new PIXI.Graphics;
		    background.setStrokeStyle(1).beginStroke("#000000").beginFill("#FFFFFF").drawRoundRect(0,0,width,height, 5).endStroke().endFill();;
		    cont.addChild(background);
		    cont.background = background;

		    var suitString = suit.substr(0, suit.length-1)
		    var icon = new PIXI.Sprite(PIXI.loader.resources.suitString);
		    icon.x = width - icon.getBounds().width-5;
		    icon.y = 5;
		    cont.addChild(icon);

		    var text1 = new PIXI.Text(str1, "bold 10px Verdana", "#000000");
		    text1.x = text1.y = 5;
		    cont.addChild(text1);
		    cont.text1 = text1;


		    var text2 = new PIXI.Text(suit, "bold 10px Verdana", "#000000");
		    text2.x = 5
		    text2.y = text1.getMeasuredHeight()+5;
		    cont.addChild(text2);
		    cont.text2 = text2;

		    var cardBack = new PIXI.Sprite(PIXI.loader.resources.suitString.cardBack);
		    cont.addChild(cardBack);
		    cont.cardBack = cardBack;


		    cont.mouseChildren = false;
		    cont.cursor = 'pointer';
		    return cont;
		}
	}
}