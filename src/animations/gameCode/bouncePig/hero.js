export default function Hero (gv, PIXI) {
    return {
        cont: new PIXI.Container(),
        fallingTextures: [PIXI.Texture.fromFrame("heroFalling0001.png"), PIXI.Texture.fromFrame("heroFalling0002.png")],
        chewingTextures: [PIXI.Texture.fromFrame("heroChewing0001.png"), PIXI.Texture.fromFrame("heroChewing0002.png")],
        flyingTextures: [PIXI.Texture.fromFrame("heroFlying0001.png"), PIXI.Texture.fromFrame("heroFlying0002.png")],
        standingTextures: [PIXI.Texture.fromFrame("heroStanding0001.png"), PIXI.Texture.fromFrame("heroStanding0002.png")],
        glidingTextures: [PIXI.Texture.fromFrame("heroGliding.png"), PIXI.Texture.fromFrame("heroGliding0001.png"), PIXI.Texture.fromFrame("heroGliding0002.png")],
        activeMC: "",
        init: function () {
            this.hero = new PIXI.MovieClip(this.fallingTextures);
            this.glideHero = new PIXI.MovieClip(this.glidingTextures);
            this.chewingHero = new PIXI.MovieClip(this.chewingTextures);
            this.flyingHero = new PIXI.MovieClip(this.flyingTextures);
            this.standingHero = new PIXI.MovieClip(this.standingTextures);
            this.cont.introVY = 2;
            this.hero.anchor.x = this.hero.anchor.y = 0.5;
            this.hero.animationSpeed = 0.05;
            this.hero.play();
            this.cont.addChild(this.hero);
            this.activeMC = this.hero;
            this.glideHero.anchor.x = this.glideHero.anchor.y = 0.5;
            this.glideHero.animationSpeed = 0.05;
            this.chewingHero.onComplete = this.returnToHero;
            this.chewingHero.anchor.x = this.chewingHero.anchor.y = 0.5;
            this.chewingHero.animationSpeed = 0.05;
            this.flyingHero.anchor.x = this.flyingHero.anchor.y = 0.5;
            this.flyingHero.animationSpeed = 0.5;
            this.standingHero.anchor.x = this.standingHero.anchor.y = 0.5;
            this.standingHero.animationSpeed = 0.0175;
            this.addContProps();
        },
        bounce: function () {
            if(this.activeMC != this.glideHero){
                this.activeMC.stop();
                this.cont.removeChild(this.activeMC);
                this.cont.addChild(this.glideHero);
                this.glideHero.play();
                this.activeMC = this.glideHero;
            }

        },
        getHero: function () {
            return this.hero;
        },
        returnToHero: function () {
            gv.hero.hero();
        },
        addContProps: function () {
            this.cont.chewCounter = 0;
            this.cont.chew = function () {

                this.activeMC.stop();
                this.cont.removeChild(this.activeMC);
                this.cont.addChild(this.chewingHero);
                this.chewingHero.play();

                this.activeMC = this.chewingHero;
            };
            this.cont.fly = function () {

                this.activeMC.stop();
                this.cont.removeChild(this.activeMC);
                this.cont.addChild(this.flyingHero);
                this.flyingHero.play();

                this.activeMC = this.flyingHero;
            };
            this.cont.stand = function () {

                this.activeMC.stop();
                this.cont.removeChild(this.activeMC);
                this.cont.addChild(this.standingHero);
                this.standingHero.play();

                this.activeMC = this.standingHero;
            };
            this.cont.hero = function () {

                this.cont.chewCounter ++;

                if(this.cont.chewCounter >5){
                    this.cont.chewCounter = 0;
                    this.activeMC.stop();
                    this.cont.removeChild(this.activeMC);
                    this.cont.addChild(this.hero);
                    this.hero.play();
                    this.activeMC = this.hero;
                }
                else{
                    this.cont.chew();
                }

            }
        }
    }
}