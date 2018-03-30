/**
 * Created by edwardwalther on 3/19/15.
 */

var gv = {};
var username = "guest";

function start(){

    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.addEventListener("fileload", count);
    createjs.Sound.registerSound("/sounds/bouncePig/appleCrunch.mp3", "crunch");
    createjs.Sound.registerSound("/sounds/bouncePig/boing.mp3", "boing");

    createjs.Sound.registerSound("/sounds/bouncePig/drumroll.mp3", "drumroll");
    createjs.Sound.registerSound("/sounds/bouncePig/explosion.mp3", "explosion");

    createjs.Sound.registerSound("/sounds/bouncePig/click.mp3", "click");
    createjs.Sound.registerSound("/sounds/bouncePig/pop.mp3", "pop");


    gv.totalSoundsAndLoader = 7;
    gv.animate = true;

    gv.canvasWidth = $(window).width();
    gv.canvasHeight =  $(window).height();






    gv.halfHeight = gv.canvasHeight / 2;
    gv.halfWidth = gv.canvasWidth / 2;


    gv.speedLimit = gv.storeSpeedLimit = 10;
    gv.vy = 2;
    gv.vx = 0;
    gv.bounce = -0.7;

    gv.stage = new PIXI.Stage(0x1a69ff, true);
    gv.renderer = PIXI.autoDetectRenderer(gv.canvasWidth, gv.canvasHeight);


    document.getElementById("warpedPuppyCanvas").appendChild(gv.renderer.view);


    var spriteSheetLoader = new PIXI.AssetLoader(["/images/bouncePig/bpb.json",  "/fonts/games/bouncePig/levelText.xml", "/fonts/games/bouncePig/text.xml"]);


    spriteSheetLoader.onComplete = count;
    spriteSheetLoader.load();

    gv.webGL = (gv.renderer instanceof PIXI.CanvasRenderer) ? false : true;

    window.onresize = resizeHandler;


    gv.counter = 0;

}

function count(){

    gv.counter ++;
    if(gv.counter ==  gv.totalSoundsAndLoader)Main();

}


    function Main() {

        gv.levelComplete = new LevelComplete();


        var browserHeight = $(window).height();
        var heightValue = browserHeight - gv.canvasHeight;

        var arr = [["score", 100],["duration", 100],["datestamp", 345345]];
        var date = new Date().getTime();
        gv.keyString = "";

       /* if(username != 'guest') {
            $.post("../../../snippets/score.php", {
                gameName: "bouncePig",
                start: 'true',
                username: username,
                data: arr,
                token: token
            }, function (data) {
                // $( "#sendDataResult" ).html( data );
                gv.keyString = data;
            });
        }*/


        gv.stars = new ObjectPoolBuilder("star.png", 20, [3,8],[2,25], undefined, true, true, gv, false, 1);

        gv.mouseDown = false;






        gv.background = new Background();



        var hero = new Hero();
        hero.x = gv.halfWidth;
        hero.y = gv.halfHeight;
        gv.hero = hero;
        gv.stage.addChild(hero);


        var hitAreaWidth = gv.hero.width*0.5;
        var hitAreaHeight = gv.hero.height*0.5;
        var hitAreaX =gv.hero.x - (hitAreaWidth / 2);
        var hitAreaY =  gv.hero.y - (hitAreaHeight / 2);

        gv.rect2 = new PIXI.Rectangle(hitAreaX,hitAreaY,hitAreaWidth, hitAreaHeight);//general hit area
        gv.rect3 = new PIXI.Rectangle(gv.hero.x - (gv.hero.width / 4), gv.hero.y + (gv.hero.height/2)-20, gv.hero.width/2, 5);//for the cloud walking


       /* var g = new PIXI.Graphics();
        g.beginFill(0x000000).drawRect(gv.rect2.x, gv.rect2.y, gv.rect2.width, gv.rect2.height).endFill();
        gv.stage.addChild(g);*/




        gv.kingCont = new PIXI.SpriteBatch();
        gv.stage.addChild(gv.kingCont);





        gv.bouncePlatform = new BouncePlatform();







        gv.swipeText = new PIXI.Sprite.fromFrame("swipeScreen.png");
        gv.swipeText.x = (gv.canvasWidth - gv.swipeText.width) / 2;
        gv.swipeText.y = (gv.canvasHeight - gv.swipeText.height);


        gv.level = new Level();


        gv.fruit = new Fruit();
        gv.score = new Score();

        gv.nextLevelScreen = new NextLevelScreen();
        gv.nextLevelScreen.addToStage();

        gv.animate = true;
        gv.introScreenOnStage = true;
        gv.score.decreaseBoolean = false;




        requestAnimFrame(animate);


    }





function resizeHandler(){

    gv.canvasWidth = $(window).width();
    gv.canvasHeight =  $(window).height();
    gv.halfWidth = gv.canvasWidth/2;
    gv.halfHeight = gv.canvasHeight/2;
    gv.renderer.resize(gv.canvasWidth, gv.canvasHeight);



    var browserHeight = $(window).height();

    gv.mines.redBackground.clear();
    gv.mines.redBackground.beginFill(0xFF0000).drawRect(0,0,gv.canvasWidth,gv.canvasHeight).endFill();

    gv.hero.x = Math.ceil(gv.halfWidth);
    gv.hero.y = Math.ceil(gv.halfHeight);

    gv.bouncePlatform.dot1.x = gv.bouncePlatform.dot2.x = gv.bouncePlatform.dot1.y = gv.bouncePlatform.dot2.y = 0;
    var hitAreaWidth = gv.hero.width*0.5;
    var hitAreaHeight = gv.hero.height*0.5;
    var hitAreaX =gv.hero.x - (hitAreaWidth / 2);
    var hitAreaY =  gv.hero.y - (hitAreaHeight / 2);

    gv.rect2 = new PIXI.Rectangle(hitAreaX,hitAreaY,hitAreaWidth, hitAreaHeight);//general hit area
    gv.rect3 = new PIXI.Rectangle(gv.hero.x - (gv.hero.width / 4), gv.hero.y + (gv.hero.height/2)-20, gv.hero.width/2, 5);//for the cloud walking

    gv.background.background.width = gv.canvasWidth;
    gv.background.background.height = gv.canvasHeight;
    if(gv.score !== undefined)gv.score.place();

    gv.swipeText.x = (gv.canvasWidth - gv.swipeText.width) / 2;
    gv.swipeText.y = (gv.canvasHeight - gv.swipeText.height);

    gv.nextLevelScreen.resize();
 /*






    gv.background.resize();
    gv.nextLevelScreen.resize();*/
}




