export default function Hero () {
    return {
        cont: new PIXI.DisplayObjectContainer(),
        fallingTextures: [PIXI.Texture.fromFrame("heroFalling0001.png"), PIXI.Texture.fromFrame("heroFalling0002.png")],
        chewingTextures: [PIXI.Texture.fromFrame("heroChewing0001.png"), PIXI.Texture.fromFrame("heroChewing0002.png")],
        flyingTextures: [PIXI.Texture.fromFrame("heroFlying0001.png"), PIXI.Texture.fromFrame("heroFlying0002.png")],
        standingTextures: [PIXI.Texture.fromFrame("heroStanding0001.png"), PIXI.Texture.fromFrame("heroStanding0002.png")],
        glidingTextures: [PIXI.Texture.fromFrame("heroGliding.png"), PIXI.Texture.fromFrame("heroGliding0001.png"), PIXI.Texture.fromFrame("heroGliding0002.png")],
        hero: new PIXI.MovieClip(fallingTextures),
        glideHero: new PIXI.MovieClip(glidingTextures),
        chewingHero: new PIXI.MovieClip(chewingTextures),
        flyingHero: new PIXI.MovieClip(flyingTextures),
        standingHero:  new PIXI.MovieClip(standingTextures),
        activeMC,
        init: function () {
            cont.introVY = 2;
            hero.anchor.x = hero.anchor.y = 0.5;
            hero.animationSpeed = 0.05;
            hero.play();
            cont.addChild(hero);
            activeMC = hero;
            glideHero.anchor.x = glideHero.anchor.y = 0.5;
            glideHero.animationSpeed = 0.05;
            chewingHero.onComplete = returnToHero;
            chewingHero.anchor.x = chewingHero.anchor.y = 0.5;
            chewingHero.animationSpeed = 0.05;
            flyingHero.anchor.x = flyingHero.anchor.y = 0.5;
            flyingHero.animationSpeed = 0.5;
            standingHero.anchor.x = standingHero.anchor.y = 0.5;
            standingHero.animationSpeed = 0.0175;
            this.addContProps();
        },
        bounce: function () {
            if(activeMC != glideHero){
                activeMC.stop();
                cont.removeChild(activeMC);
                cont.addChild(glideHero);
                glideHero.play();
                activeMC = glideHero;
            }

        },
        returnToHero: function () {
            gv.hero.hero();
        },
        addContProps: function () {
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

            }
        }
    }
}