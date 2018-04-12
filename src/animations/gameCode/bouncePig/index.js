export default function(
    PIXI, 
    ObjectPoolBuilder,
    LevelComplete,
    Background,
    Hero,
    BouncePlatform,
    Level,
    Fruit,
    animate, 
    Utils, 
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
        PIXI: PIXI,
        start: function () {
            this.totalSoundsAndLoader = 7;
            this.utils = new Utils(this, PIXI);
            this.PIXI = PIXI;
            this.TweenLite = TweenLite;
            this.TimelineLite = TimelineLite;
            this.Back = Back;
            this.ObjectPoolBuilder = ObjectPoolBuilder;
            this.Mines = Mines;
            this.speedLimit = this.storeSpeedLimit = 10;
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = 400;
            this.vy = 2;
            this.vx = 0;
            this.bounce = -0.7;
            this.stage = new PIXI.Container();
            this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
            this.renderer.backgroundColor = 0x1a69ff;
            this.animate = animate.bind(this);
            this.app.ticker.add(animate(this));
            document.getElementById("tugtugCanvas").appendChild(this.renderer.view);
            if(!this.loader.resources.gamesheet){
                 this.loader
                    .add('gamesheet', "/images/bouncePig/bpb.json")
                    .add('levelText', "/fonts/games/bouncePig/levelText.xml")
                    .add('text', "/fonts/games/bouncePig/text.xml")
                    .load(this.Main.bind(this));
            } else {
                this.Main.bind(this)
                this.Main();
            }
           
            this.webGL = (this.renderer instanceof PIXI.CanvasRenderer) ? false : true;
            this.resizeHandler = this.resizeHandler.bind(this);
            window.onresize = this.resizeHandler;
            //let that = this;
            //window.addEventListener("orientationchange", () => that.resizeHandler() );


            this.counter = 0;
        },
        stop: function () {
            this.loader.destroy();
            this.app.ticker.destroy();
            this.renderer.destroy();
        },
        Main: function () {
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.level = Level(this);
            this.level.init();
            
            this.kingCont = new PIXI.particles.ParticleContainer();
            this.stage.addChild(this.kingCont);

            this.clouds = Clouds(this);
            this.clouds.init();
            this.clouds.addToStage();
            this.cloudsOnStage = true;

             this.drums = Drums(this);
             this.drums.init();
             this.drums.addToStage();

             this.mines = Mines(this);
             this.mines.init();
             this.mines.addToStage();

             this.fruit = Fruit(this);
             this.fruit.init();

            this.hero = new Hero(this);
            this.hero.init();
            this.heroInstance = this.hero.getHero()
            this.heroInstance.x = Math.ceil(this.halfWidth);
            this.heroInstance.y = Math.ceil(this.halfHeight);
            this.stage.addChild(this.heroInstance);

            this.bouncePlatform = BouncePlatform(this);
            this.bouncePlatform.init();

            this.background = Background(this);
            this.background.init();


            this.animateAllow = true;
            this.introScreenOnStage = false;

            this.loopingQ = 10;
            var hitAreaWidth = this.heroInstance.width*0.5;
            var hitAreaHeight = this.heroInstance.height*0.5;
            var hitAreaX =this.heroInstance.x - (hitAreaWidth / 2);
            var hitAreaY =  this.heroInstance.y - (hitAreaHeight / 2);

            this.rect2 = new PIXI.Rectangle(hitAreaX,hitAreaY,hitAreaWidth, hitAreaHeight);
            this.rect3 = new PIXI.Rectangle(
            this.heroInstance.x - (this.heroInstance.width / 4),
            this.heroInstance.y + (this.heroInstance.height/2)-20,this.hero.width/2, 5);

            this.swipeText = new PIXI.Sprite.fromFrame("swipeScreen.png");

            this.stars = new ObjectPoolBuilder(PIXI, "star.png", 80, [3,8],[2,25], undefined, true, true, this, false, 1);
            this.stars.init();

           
            this.stage.addChild(this.swipeText);
            this.swipeText.x = (this.canvasWidth - this.swipeText.width) / 2;
            this.swipeText.y = (this.canvasHeight - this.swipeText.height)-10;
            
          
        },
        resizeHandler: function () {
            console.log('change');
            this.delay = this.delay.bind(this);
            if(!this.timeout) {
                setTimeout(this.delay, 250)
            }
            
        },
        delay: function () {
            clearTimeout(this.timeout);
            this.timeout = null;
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight =  400;
            this.halfWidth = this.canvasWidth/2;
            this.halfHeight = this.canvasHeight/2;
            this.renderer.resize(this.canvasWidth, this.canvasHeight);
            this.background.resize();
            this.heroInstance.x = this.halfWidth;
            this.drums.resize();
            this.clouds.resize();
            this.level.resize();
            this.swipeText.x = (this.canvasWidth - this.swipeText.width) / 2;
            this.heroInstance.y = this.halfHeight;
            this.mines.resize();
 
        }
    }
}
