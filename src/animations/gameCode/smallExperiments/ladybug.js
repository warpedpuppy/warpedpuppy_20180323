export default function Ladybug (PIXI, Utils, TweenMax) {
return {
        utils: new Utils(),
        canvasHeight: 400,
		boardWidthHeight: 19,
		tileWidth: 27,
		idNo:  0,
		tileArray: [],
		resume: false,
		blueArray: [0,19,38,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,37,21,40,42,43,44,46,46,48,49,50,51,52,53,54,55,56,75,65,61,57,76,78,79,80,83,82,84,86,85,94,92,90,89,88,87,95,97,101,109,111,113,114,116,117,118,119,120,122,123,124,125,126,128,129,130,132,151,147,145,137,133,152,153,154,156,158,159,160,161,162,164,166,168,170,189,187,185,183,181,177,175,171,190,191,192,194,196,198,200,202,204,206,208,209,213,217,219,221,225,227,228,230,231,232,233,234,235,236,238,239,240,241,242,243,244,245,246,265,257,255,247,266,267,269,268,270,272,274,276,278,279,280,281,282,284,303,301,297,293,291,289,285,304,306,307,308,310,312,313,314,315,316,320,322,339,318,337,329,323,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360],
		forwardMotion: .15,
		pathArray: [],
		pathArrayCounter: 0,
		go: {},
		tileWidthHeight: 25,
        stage: new PIXI.Container(),
        app: new PIXI.Application(),
        loader:  PIXI.loader,
        init: function () {
            this.resize = this.resize.bind(this);
            this.drag = this.drag.bind(this);
            this.xDrag = this.xDrag.bind(this);
            this.startOver = this.startOver.bind(this);
            window.onresize = this.resize;
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = 400;
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
            this.renderer.backgroundColor = 0xFFFFFF;
            document.getElementById("tugtugCanvas").appendChild(this.renderer.view);
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
        Main: function () {
        	this.app.ticker.add(this.animate.bind(this));
        	let t1 = PIXI.loader.resources.l1.texture;
			let t2 = PIXI.loader.resources.l2.texture;
			let t3 = PIXI.loader.resources.l3.texture;
			let t4 = PIXI.loader.resources.l4.texture;
			let t5 = PIXI.loader.resources.l5.texture;
			this.walking = [t1,t2,t3,t4,t5];
			this.body = new PIXI.extras.AnimatedSprite(this.walking);
			this.startOver_btn = new PIXI.Sprite(PIXI.loader.resources.startOver.texture);
			this.startOver_btn.interactive = true;
			this.startOver_btn.buttonMode = true;
			this.startOver_btn.anchor.x = this.startOver_btn.anchor.y = 0.5;
			this.instructions_mc = new PIXI.Sprite(PIXI.loader.resources.instructions.texture);
			this.instructions_mc.x = 550;
			this.instructions_mc.y = 0;
			// createjs.Sound.alternateExtensions = ["mp3"];
			// createjs.Sound.registerSound("/sounds/bouncePig/appleCrunch.mp3", "crunch");
			// createjs.Sound.registerSound("/sounds/bouncePig/click.mp3", "click");
			this.animateBoolean = true;
			this.next();
        },
        stop: function () {
        	 this.renderer.destroy();
        	 this.loader.destroy();
        	 this.app.ticker.destroy();
        },
        next: function  () {

			this.startOver_btn.visible = false;
			this.stageShell = new PIXI.Container();
			this.stageShell.scale.x = this.stageShell.scale.y = 0.5;
			this.stage.addChildAt(this.stageShell, 0);
			this.makeMaze();
			this.startOver_btn.mousedown =  this.startOver_btn.touchdown =this.startOver;

			this.stageShell.addChild(this.instructions_mc);
			this.stageShell.x = (this.canvasWidth - this.stageShell.width)/2; 
			this.stageShell.y = (this.canvasHeight - this.stageShell.height)/2; 
			this.startOver_btn.x = (this.stageShell.width); 
			this.startOver_btn.y = (this.stageShell.height); 
			this.stageShell.addChild(this.startOver_btn);
			this.avatarCreate();
		},
		animate: function () {
			if(this.animateBoolean === true){
				if(this.dragBoolean === true){
					let mousePosition = this.renderer.plugins.interaction.mouse.global;
					this.avatar.x = mousePosition.x ;
					this.avatar.y = mousePosition.y;
				}
				this.renderer.render(this.stage);
			}
		},
		LadyBug: function () {
			let body = this.body;
			body.anchor.x = body.anchor.y = 0.5;
			body.animationSpeed = .25
			body.play();
			body.width = body.getBounds().width;
			body.height = body.getBounds().height;
			return body;
		},
		avatarCreate: function () {
			let avatar = this.avatar = this.LadyBug();
			avatar.x = 775;
			avatar.y = 300;
			avatar.interactive = true;
			avatar.mousedown = avatar.touchdown = this.drag;
			avatar.buttonMode = true;
			avatar.xPos = avatar.x;
			avatar.yPos = avatar.y;
			this.stageShell.addChild(avatar);
		},
		drag: function (e) {
			var mc = this.avatar;
			this.stage.addChild(mc)
			mc.mousedown = mc.touchdown = null;
			mc.mouseup = mc.touchup = this.xDrag;
			this.dragBoolean = true;
			TweenMax.to(mc.scale, 0.25, {x:1, y:1});
			TweenMax.to(this.instructions_mc,0.25, {alpha:0});
			//createjs.Sound.play("click");
		},
		xDrag: function  (e) {
			var mc = this.avatar;
			this.stageShell.addChild(mc)
			mc.mouseup = mc.touchup = null;
			this.dragBoolean = false
			new TweenMax(mc.scale, 0.25, {x:0.5, y:0.5});
			var tile1XY = this.boardShell.toGlobal(new PIXI.Point(this.tileArray[1].x,this.tileArray[1].y))
			var rect1 = new PIXI.Rectangle(tile1XY.x-50,tile1XY.y-50,this.tileWidthHeight+100, this.tileWidthHeight+100);
			var tile341XY = this.boardShell.toGlobal(new PIXI.Point(this.tileArray[341].x,this.tileArray[341].y))
			var rect2 = new PIXI.Rectangle(tile341XY.x-50,tile341XY.y-50,this.tileWidthHeight+100, this.tileWidthHeight+100);

			if (this.utils.pixiPointRectangleCollisionDetection(new PIXI.Point(mc.x, mc.y), rect1)) {
				new TweenMax(mc, .2, {scaleX:1, scaleY:1});
				this.stage.removeChild(this.avatar);
				this.boardShell.addChild(this.avatar);
				mc.x = this.tileArray[1].x; mc.y = this.tileArray[1].y;
				this.determinePath(1,341)
			} else if (this.utils.pixiPointRectangleCollisionDetection(new PIXI.Point(mc.x, mc.y),rect2)) {
				new TweenMax(mc, .2, {scaleX:1, scaleY:1});
				this.stage.removeChild(this.avatar);
				this.boardShell.addChild(this.avatar);
				mc.x = this.tileArray[341].x; mc.y = this.tileArray[341].y;
				this.determinePath(341,1)
			} else {
				new TweenMax(this.avatar, .2, {scaleX:2, scaleY:2});
				new TweenMax(this.instructions_mc, 1, {alpha:1});
				mc.x = mc.xPos;
				mc.y = mc.yPos;
				this.avatar.mousedown = this.avatar.touchdown = this.drag;
			};
		},
		Tile: function () {
			var cont = new PIXI.Container();
			var cover_mc = new PIXI.Graphics();
			cover_mc.beginFill(0x2E2C7C).drawRect(0,0,this.tileWidthHeight,this.tileWidthHeight).endFill();
			cont.cover_mc = cover_mc;


			var red_mc = new PIXI.Sprite(PIXI.loader.resources.brickWall.texture);
			red_mc.width = red_mc.height = this.tileWidthHeight;
			cont.red_mc = red_mc;

			var id_dt = new PIXI.Text('0',{fontFamily : '24px Arial', fill : 0xff1010, align : 'center'});
			cont.id_dt = id_dt;

			cont.addChild(cover_mc);
			cont.addChild(red_mc);
			cont.addChild(id_dt);
			return cont;
		},
		makeMaze: function () {
			let boardShell = this.boardShell = new PIXI.Container();
			this.stageShell.addChild(boardShell);
			boardShell.x = 0;//-1*(this.boardWidthHeight/2)*this.tileWidth;
			boardShell.y = 0;//-1*(this.boardWidthHeight/2)*this.tileWidth;
			let idNo = this.idNo;
			for (let i = 0 ; i < this.boardWidthHeight; i++) {
				for (let j = 0 ; j < this.boardWidthHeight; j++) {
					let tile = this.Tile();
					tile.width = tile.height = this.tileWidth;
					tile.idNo = idNo;
					tile.x =(this.tileWidth*j);
					tile.y = (this.tileWidth*i);;
					boardShell.addChild(tile);
					tile.red_mc.alpha = 0;
					for (let k = 0; k < this.blueArray.length; k++) {
						if (idNo === this.blueArray[k]) {
							tile.cover_mc.alpha = 1;
							break;
						} else {
							tile.cover_mc.alpha = 0;
						}
						
					}
					tile.id_dt.text = "";
					this.tileArray.push(tile);
					idNo++;
				}
			}
		},
		startOver: function () {

			this.avatar.rotation = 0;
			this.avatar.play();
			this.startOver_btn.visible = false;
			this.boardShell.removeChild(this.avatar);
			this.stageShell.addChild(this.avatar);
			TweenMax.to(this.avatar.scale, 0.2, {x:1, y:1});
			TweenMax.to(this.instructions_mc, 1, {alpha:1});
			this.avatar.x = this.avatar.xPos;
			this.avatar.y = this.avatar.yPos;
			this.pathArray.length = 0;

			this.pathArrayCounter = 0;
			this.idNo = 0;

			for (var i = 0; i < this.tileArray.length; i++) {
				this.tileArray[i].red_mc.alpha = 0;
			}

			this.avatar.mousedown = this.avatar.touchdown =this.drag;


		},
		whatIsIt: function (mc) {
			var returnString;
			if (!mc) {
				returnString = "nothing";
			} else if (mc.cover_mc.alpha === 1 || mc.red_mc.alpha === 1) {
				returnString = "wall";
			} else {
				returnString = "path";
			};
			return returnString;
		},
		resize: function () {
			this.canvasWidth = this.utils.returnCanvasWidth();
			this.canvasHeight =  400;
			this.halfWidth = this.canvasWidth/2;
			this.halfHeight = this.canvasHeight/2;
			this.renderer.resize(this.canvasWidth, this.canvasHeight);
			this.stageShell.x = (this.canvasWidth - this.stageShell.width)/2; 
			this.stageShell.y = (this.canvasHeight - this.stageShell.height)/2; 
        },
		determinePath: function (mc, endTile) {
				var timerPause = this.forwardMotion * 1000;
				setTimeout(nextTile.bind(this),timerPause)
				function nextTile()
				{
					new TweenMax(this.avatar, 
						this.forwardMotion, 
						{y:this.tileArray[mc].y+(this.avatar.height/2),
							x:this.tileArray[mc].x+(this.avatar.width/2)});
					var shellObject = {};
				
					var upTile = mc - this.boardWidthHeight;
					var downTile = mc + this.boardWidthHeight;
					var rightTile = mc + 1;
					var leftTile = mc - 1;
					var upString = this.whatIsIt(this.tileArray[upTile]);
					var downString = this.whatIsIt(this.tileArray[downTile]);
					var rightString = this.whatIsIt(this.tileArray[rightTile]);
					var leftString = this.whatIsIt(this.tileArray[leftTile]);
					
					var threePaths = false;
					var pathCounter = 0;
					if(upString === 'path'){pathCounter ++;}
					if(downString === 'path'){pathCounter ++;}
					if(rightString === 'path'){pathCounter ++;}
					if(leftString === 'path'){pathCounter ++;}
					if(pathCounter === 3){threePaths = true;};
					shellObject = ({id:mc, up:upString, down:downString, right:rightString, left:leftString, threePaths:threePaths});
					this.pathArray.push(shellObject);
					if (this.resume === true) {
						this.pathArrayCounter = this.pathArray.length -1;
						this.resume = false;
					}
					
					/*
					console.log(pathArray[pathArrayCounter]['id']+" "+pathArray[pathArrayCounter]['up']+" "+pathArray[pathArrayCounter]['down']+" "+pathArray[pathArrayCounter]['right']+" "+pathArray[pathArrayCounter]['left']+" "+pathArray[pathArrayCounter]['threePaths']);
					*/
					
					
					if (this.pathArrayCounter === 0) {
						if (this.pathArray[this.pathArrayCounter]['up'] === 'path') {
								TweenMax.to(this.avatar, .2, {shortRotation:{rotation:0}});
								this.pathArray[this.pathArrayCounter]['route'] = 'up';
								this.pathArrayCounter ++;
								this.determinePath(upTile, endTile);
							} else if (this.pathArray[this.pathArrayCounter]['down'] === 'path') {
								this.avatar.rotation = this.utils.deg2rad(180);
								TweenMax.to(this.avatar, .2, {rotation:this.utils.deg2rad(180)});
								this.pathArray[this.pathArrayCounter]['route'] = 'down';
								this.pathArrayCounter ++;
								this.determinePath(downTile, endTile);
							} else if (this.pathArray[this.pathArrayCounter]['right'] === 'path') {
								TweenMax.to(this.avatar, .2, {shortRotation:{rotation:this.utils.deg2rad(90)}});
									this.pathArray[this.pathArrayCounter]['route'] = 'right';
									this.pathArrayCounter ++;
									this.determinePath(rightTile, endTile);
							} else if(this.pathArray[this.pathArrayCounter]['left'] === 'path') {
								TweenMax.to(this.avatar, .2, {shortRotation:{rotation:this.utils.deg2rad(270)}});
									this.pathArray[this.pathArrayCounter]['route'] = 'left';
									this.pathArrayCounter ++;
									this.determinePath(leftTile, endTile);
							}
					} else {
						if (this.pathArray[this.pathArrayCounter]['up'] === 'path' && this.pathArray[this.pathArrayCounter-1]['id'] !== upTile ) {
							TweenMax.to(this.avatar, .3, {rotation:0});
								this.pathArray[this.pathArrayCounter]['route'] = 'up';
								this.pathArrayCounter ++;
								this.determinePath(upTile, endTile);
						} else if(this.pathArray[this.pathArrayCounter]['down'] === 'path' && this.pathArray[this.pathArrayCounter-1]['id'] !== downTile) {
							TweenMax.to(this.avatar, .3, {rotation:this.utils.deg2rad(180)});
							this.pathArray[this.pathArrayCounter]['route'] = 'down';
							this.pathArrayCounter ++;
							this.determinePath(downTile, endTile);
						} else if(this.pathArray[this.pathArrayCounter]['right'] === 'path' && this.pathArray[this.pathArrayCounter-1]['id'] !== rightTile ) {
							TweenMax.to(this.avatar, .3, {rotation:this.utils.deg2rad(90)});
							this.pathArray[this.pathArrayCounter]['route'] = 'right';
							this.pathArrayCounter ++;
							this.determinePath(rightTile, endTile);
						} else if(this.pathArray[this.pathArrayCounter]['left'] === 'path' && this.pathArray[this.pathArrayCounter-1]['id'] !== leftTile) {
							TweenMax.to(this.avatar, .3, {rotation:this.utils.deg2rad(270)});
							this.pathArray[this.pathArrayCounter]['route'] = 'left';
							this.pathArrayCounter ++;
							this.determinePath(leftTile, endTile);
						} else {
							//console.log("done.");
							if (mc === endTile) {
								//console.log("congrats");
								this.avatar.stop();
								this.stageShell.setChildIndex(this.startOver_btn, this.stageShell.children.length -1)
								this.startOver_btn.visible = true;
							} else {
								//console.log("wrong path, try again.");
								this.countDown = this.pathArray.length-1;


								function backwards() {
									if (this.pathArray[this.countDown]["threePaths"] === true) {
										var tileNumber =  this.pathArray[this.countDown]["id"];
										var newUpTile = tileNumber-this.boardWidthHeight;
										var newDownTile = tileNumber+this.boardWidthHeight;
										var newRightTile = tileNumber+1;
										var newLeftTile = tileNumber-1;

										if(this.pathArray[this.countDown]["route"] === 'down'){this.tileArray[newDownTile].red_mc.alpha = 1;}
										else if(this.pathArray[this.countDown]["route"] === 'up'){this.tileArray[newUpTile].red_mc.alpha = 1;}
										else if(this.pathArray[this.countDown]["route"] === 'right'){this.tileArray[newRightTile].red_mc.alpha = 1;}
										else if(this.pathArray[this.countDown]["route"] === 'left'){this.tileArray[newLeftTile].red_mc.alpha = 1;};
										//createjs.Sound.play("crunch");
										var startHere= this.pathArray[this.countDown]["id"];
										this.tileArray[this.pathArray[this.countDown]["id"]].cover_mc.alpha = 0;
									
										this.pathArray.splice(this.countDown, 1);
										this.resume = true;
										this.determinePath(startHere, endTile);
										
									} else {
										new TweenMax(this.avatar, .1, {y:this.tileArray[this.pathArray[this.countDown]["id"]].y+(this.avatar.height/2),x:this.tileArray[this.pathArray[this.countDown]["id"]].x+(this.avatar.width/2)});
										if (this.pathArray[this.countDown]["route"] === 'down') {
											TweenMax.to(this.avatar, .3, {rotation:0});
										} else if(this.pathArray[this.countDown]["route"] === 'up') {
											TweenMax.to(this.avatar, .3, {rotation:this.utils.deg2rad(180)});
										} else if (this.pathArray[this.countDown]["route"] === 'right') {
											TweenMax.to(this.avatar, .3, {rotation:this.utils.deg2rad(270)});
										} else if (this.pathArray[this.countDown]["route"] === 'left') {
											TweenMax.to(this.avatar, .3, {rotation:this.utils.deg2rad(90)});
										}
										this.pathArrayCounter --;
										this.pathArray.splice(this.countDown, 1);
										this.countDown --;
										setTimeout(backwards.bind(this), 100)
									}
								};
								setTimeout(backwards.bind(this), 100);
							}
						}
				}
		}
	}
}
			

}





