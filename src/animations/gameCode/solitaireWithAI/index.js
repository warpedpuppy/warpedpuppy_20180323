export default function SolitaireCode (PIXI, Utils, loader_data) {
	return {
		app: new PIXI.Application(),
		utils: new Utils(),
		stage: new PIXI.Container(),
    	canvasHeight: 400,
    	loader:  PIXI.loader,
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
                 .add('cardBack', '/bmps/card/cardBack.png')
				 .add('club', '/bmps/card/club.png')
				 .add('diamond', '/bmps/card/diamond.png')
				 .add('heart', '/bmps/card/heart.png')
				 .add('spade', '/bmps/card/spade.png')
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
			let value = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
		    let suits = ["hearts", "spades", "diamonds", "clubs"];
		    let storeCards = [];
		    let storeSlots = [];
		    let i, j, card;
		    for(i = 0; i < 4; i++){
		       // storeSlots.push(new Slot(width, height))
		        for(j = 0; j < 13; j++){
		            card = this.Card(value[j], suits[i], j, 75, 100);
		            card.x = j * 100 ;
		            card.y = i * 75;
		            storeCards.push(card);
		            this.stage.addChild(card);
		        }
		    }
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

		    const cont = new PIXI.Container();
		    cont.width = width;
		    cont.height = height;
		    cont.storeX;
		    cont.storeY;
		    cont.value = value;
		    cont.suit = suit;
		    cont.color = (suit == "spades" || suit == "clubs")?"black":"red";
		    cont.pile;

		    const arr = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];

		    cont.name = arr[cont.value];

		    const background = new PIXI.Graphics();
		    background.beginFill(0xFFFFFF).drawRoundedRect(0,0,width,height, 5).endFill();
		    cont.addChild(background);
		    cont.background = background;

		    const suitString = suit.substr(0, suit.length-1)
		    console.log(suitString)
		    console.log(PIXI.loader.resources)
		    var icon = new PIXI.Sprite(PIXI.loader.resources[suitString].texture);
		    icon.x = width - icon.getBounds().width-5;
		    icon.y = 5;
		    cont.addChild(icon);

		    let text1 = new PIXI.Text(str1,{fontFamily : 'Arial', fontSize: 10, fill : 0xff1010, align : 'center'});
		    //const text1 = new PIXI.Text(str1, "bold 10px Verdana", "#000000");
		    text1.x = text1.y = 5;
		    cont.addChild(text1);
		    cont.text1 = text1;

		    let text2 = new PIXI.Text(suit,{fontFamily : 'Arial', fontSize: 10, fill : 0xff1010, align : 'center'});
		    //const text2 = new PIXI.Text(suit, "bold 10px Verdana", "#000000");
		    text2.x = 5
		    text2.y = text1.height +5;
		    cont.addChild(text2);
		    cont.text2 = text2;
		    console.log(PIXI.loader.resources)
		    let cardBack = new PIXI.Sprite(PIXI.loader.resources.cardBack.texture);
		    cont.addChild(cardBack);
		    cont.cardBack = cardBack;


		    cont.mouseChildren = false;
		    cont.cursor = 'pointer';
		    return cont;
		}
	}
}