/**
 * Created by edwardwalther on 7/11/15.
 */

function Hero() {

    var cont = new PIXI.DisplayObjectContainer();
    var fallingTextures = [PIXI.Texture.fromFrame("heroFalling0001.png"), PIXI.Texture.fromFrame("heroFalling0002.png")];
    var chewingTextures = [PIXI.Texture.fromFrame("heroChewing0001.png"), PIXI.Texture.fromFrame("heroChewing0002.png")];
    var flyingTextures = [PIXI.Texture.fromFrame("heroFlying0001.png"), PIXI.Texture.fromFrame("heroFlying0002.png")];
    var standingTextures = [PIXI.Texture.fromFrame("heroStanding0001.png"), PIXI.Texture.fromFrame("heroStanding0002.png")];
    var glidingTextures = [PIXI.Texture.fromFrame("heroGliding.png"), PIXI.Texture.fromFrame("heroGliding0001.png"), PIXI.Texture.fromFrame("heroGliding0002.png")];


    cont.introVY = 2;
    var hero = new PIXI.MovieClip(fallingTextures);

    hero.anchor.x = hero.anchor.y = 0.5;
    hero.animationSpeed = 0.05;
    hero.play();
    cont.addChild(hero);
    var activeMC = hero;

    var glideHero = new PIXI.MovieClip(glidingTextures);

    glideHero.anchor.x = glideHero.anchor.y = 0.5;
    glideHero.animationSpeed = 0.05;

    var chewingHero = new PIXI.MovieClip(chewingTextures);
    //chewingHero.loop = false;
    chewingHero.onComplete = returnToHero;

    chewingHero.anchor.x = chewingHero.anchor.y = 0.5;
    chewingHero.animationSpeed = 0.05;

    var flyingHero = new PIXI.MovieClip(flyingTextures);
    flyingHero.anchor.x = flyingHero.anchor.y = 0.5;
    flyingHero.animationSpeed = 0.5;

    var standingHero = new PIXI.MovieClip(standingTextures);
    standingHero.anchor.x = standingHero.anchor.y = 0.5;
    standingHero.animationSpeed = 0.0175;


    cont.bounce = function () {
        if(activeMC != glideHero){
            activeMC.stop();
            cont.removeChild(activeMC);
            cont.addChild(glideHero);
            glideHero.play();
            activeMC = glideHero;
        }

    };
    cont.chewCounter = 0;
    cont.chew = function () {

        activeMC.stop();
        cont.removeChild(activeMC);
        cont.addChild(chewingHero);
        chewingHero.play();

        activeMC = chewingHero;
    };
    cont.fly = function () {

        activeMC.stop();
        cont.removeChild(activeMC);
        cont.addChild(flyingHero);
        flyingHero.play();

        activeMC = flyingHero;
    };
    cont.stand = function () {

        activeMC.stop();
        cont.removeChild(activeMC);
        cont.addChild(standingHero);
        standingHero.play();

        activeMC = standingHero;
    };
    cont.hero = function () {

        cont.chewCounter ++;

        if(cont.chewCounter >5){
            cont.chewCounter = 0;
            activeMC.stop();
            cont.removeChild(activeMC);
            cont.addChild(hero);
            hero.play();
            activeMC = hero;
        }
        else{
            cont.chew();
        }

    };



    return cont;
}

function returnToHero(){
    gv.hero.hero();
}