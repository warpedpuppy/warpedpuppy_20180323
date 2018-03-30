export default function(
    PIXI, 
    ObjectPoolBuilder,
    LevelComplete,
    Background,
    Hero,
    BouncePlatform,
    Level,
    Fruit,
    Score,
    NextLevelScreen, 
    animate, 
    Utils, 
    StoreScore, 
    Mines, 
    Clouds, 
    Drums, 
    TweenLite, 
    TimelineLite,
    Back){
    return {
        gv: this,
        username: "guest",
        bouncePlatform: "",
        app: new PIXI.Application(),
        loader:  PIXI.loader,
        utils: new Utils(),
        start: function () {
            this.totalSoundsAndLoader = 7;

            

            this.speedLimit = this.storeSpeedLimit = 10;
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = this.utils.returnCanvasHeight();
            this.vy = 2;
            this.vx = 0;
            this.bounce = -0.7;
            this.stage = new PIXI.Container();
            this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
            this.renderer.backgroundColor = 0x1a69ff;
            document.getElementById("warpedPuppyCanvas").appendChild(this.renderer.view);

            this.loader
                .add('spritesheet', "/images/bouncePig/bpb.json")
                .add('levelText', "/fonts/games/bouncePig/levelText.xml")
                .add('text', "/fonts/games/bouncePig/text.xml")
                .load(this.Main.bind(this));

            this.webGL = (this.renderer instanceof PIXI.CanvasRenderer) ? false : true;
            this.resizeHandler = this.resizeHandler.bind(this);
            window.onresize = this.resizeHandler;
            this.counter = 0;
        },
        count: function(){
            this.counter ++;
            if(this.counter ==  this.totalSoundsAndLoader){
                this.Main();
            }
        },
        registerSounds: function () {
            // createjs.Sound.alternateExtensions = ["mp3"];
            // createjs.Sound.addEventListener("fileload", count);
            // createjs.Sound.registerSound("/sounds/bouncePig/appleCrunch.mp3", "crunch");
            // createjs.Sound.registerSound("/sounds/bouncePig/boing.mp3", "boing");
            // createjs.Sound.registerSound("/sounds/bouncePig/drumroll.mp3", "drumroll");
            // createjs.Sound.registerSound("/sounds/bouncePig/explosion.mp3", "explosion");
            // createjs.Sound.registerSound("/sounds/bouncePig/click.mp3", "click");
            // createjs.Sound.registerSound("/sounds/bouncePig/pop.mp3", "pop");
        },
        Main: function () {
            console.log("main");
            animate = animate.bind(this);

            this.app.ticker.add(animate(this, PIXI, Utils));

            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.level = Level(PIXI, this);
            
            this.kingCont = new PIXI.ParticleContainer();
            this.stage.addChild(this.kingCont);

            this.clouds = Clouds(this, PIXI, this.utils, TweenLite);
            this.clouds.init();
            this.clouds.addToStage();

             this.drums = Drums(this, PIXI, ObjectPoolBuilder, TweenLite, this.utils);
             this.drums.init();
             this.drums.addToStage();

             this.mines = Mines(this, PIXI, ObjectPoolBuilder, this.utils, TweenLite);
             this.mines.init();
             this.mines.addToStage();

            
             this.fruit = Fruit(this, PIXI, this.utils);
             this.fruit.init();

            this.hero = new Hero(this, PIXI);
            this.hero.init();
            this.heroInstance = this.hero.getHero()
            this.heroInstance.x = this.halfWidth;
            this.heroInstance.y = this.halfHeight;
            this.stage.addChild(this.heroInstance);

            this.bouncePlatform = BouncePlatform(this, PIXI, Utils);
            this.bouncePlatform.init();

            this.background = Background(PIXI, this, this.utils);
            this.background.init();

            this.score = Score(PIXI, this.utils, this, TweenLite);

            this.animateAllow = true;
            this.introScreenOnStage = false;

            // this.nextLevelScreen = NextLevelScreen(this, StoreScore, this.mines, this.clouds, this.drums, PIXI, TweenLite, TimelineLite,this.utils);
            // this.levelComplete = LevelComplete(this, PIXI, TimelineLite, Back, TweenLite, this.utils);
            // this.levelComplete.init();
            // this.bouncePlatform = new BouncePlatform(this, PIXI);
            // this.levelComplete = new LevelComplete();
            // var browserHeight = Utils.returnCanvasHeight();
            // var heightValue = browserHeight - this.canvasHeight;
            // var arr = [["score", 100],["duration", 100],["datestamp", 345345]];
            // var date = new Date().getTime();
            // this.keyString = "";
            // this.stars = new ObjectPoolBuilder("star.png", 20, [3,8],[2,25], undefined, true, true, this, false, 1);
            // this.mouseDown = false;
            // this.background = new Background();
            // var hero = new Hero();
            // hero.x = this.halfWidth;
            // hero.y = this.halfHeight;
            // this.hero = hero;
            // this.stage.addChild(hero);
            // var hitAreaWidth = this.hero.width*0.5;
            // var hitAreaHeight = this.hero.height*0.5;
            // var hitAreaX =this.hero.x - (hitAreaWidth / 2);
            // var hitAreaY =  this.hero.y - (hitAreaHeight / 2);
            // this.rect2 = new PIXI.Rectangle(hitAreaX,hitAreaY,hitAreaWidth, hitAreaHeight);//general hit area
            // this.rect3 = new PIXI.Rectangle(this.hero.x - (this.hero.width / 4), this.hero.y + (this.hero.height/2)-20, this.hero.width/2, 5);//for the cloud walking
           
            // this.bouncePlatform = new BouncePlatform();
             this.swipeText = new PIXI.Sprite.fromFrame("swipeScreen.png");
            // this.swipeText.x = (this.canvasWidth - this.swipeText.width) / 2;
            // this.swipeText.y = (this.canvasHeight - this.swipeText.height);
            // this.level = new Level();
            // this.fruit = new Fruit();
            // this.score = new Score();
            // this.nextLevelScreen = new NextLevelScreen();
            // this.nextLevelScreen.addToStage();
            // this.animate = true;
            // this.introScreenOnStage = true;
            // this.score.decreaseBoolean = false;
            //requestAnimFrame(animate);
        },
        resizeHandler: function () {
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight =  this.utils.returnCanvasHeight();
            this.halfWidth = this.canvasWidth/2;
            this.halfHeight = this.canvasHeight/2;
            this.renderer.resize(this.canvasWidth, this.canvasHeight);
            var browserHeight = this.canvasHeight;
            // this.mines.redBackground.clear();
            // this.mines.redBackground.beginFill(0xFF0000).drawRect(0,0,this.canvasWidth,this.canvasHeight).endFill();
            // this.hero.x = Math.ceil(this.halfWidth);
            // this.hero.y = Math.ceil(this.halfHeight);
            // this.bouncePlatform.dot1.x 
            // = this.bouncePlatform.dot2.x 
            // = this.bouncePlatform.dot1.y 
            // = this.bouncePlatform.dot2.y = 0;
            // var hitAreaWidth = this.hero.width*0.5;
            // var hitAreaHeight = this.hero.height*0.5;
            // var hitAreaX =this.hero.x - (hitAreaWidth / 2);
            // var hitAreaY =  this.hero.y - (hitAreaHeight / 2);
            // this.rect2 = new PIXI.Rectangle(hitAreaX,hitAreaY,hitAreaWidth, hitAreaHeight);//general hit area
            // this.rect3 = new PIXI.Rectangle(this.hero.x - (this.hero.width / 4), this.hero.y + (this.hero.height/2)-20, this.hero.width/2, 5);//for the cloud walking
            // this.background.background.width = this.canvasWidth;
            // this.background.background.height = this.canvasHeight;
            // if(this.score !== undefined)this.score.place();
            // this.swipeText.x = (this.canvasWidth - this.swipeText.width) / 2;
            // this.swipeText.y = (this.canvasHeight - this.swipeText.height);
            // this.nextLevelScreen.resize();
        }
    }
}
