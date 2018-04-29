export default function animate (gv) {

    
    return function () {
        let A,B;

        if( gv.animateAllow === true 
            && gv.introScreenOnStage === false ) {
                var clouds = gv.clouds.clouds;
                var drums = gv.drums.drums;
                var fruits = gv.fruit.fruits;
                var dot1 = gv.bouncePlatform.dot1;
                var dot2 = gv.bouncePlatform.dot2;
                var line =  gv.bouncePlatform.line;
                var mines = gv.mines.mines;
                var C = new gv.PIXI.Point(gv.heroInstance.x, gv.heroInstance.y);
                var bounce = -0.7;
                var testing = false;
                gv.background.tickIt();
                gv.bouncePlatform.tickIt();
                gv.stars.tickIt();
                gv.drums.miniExplosion.tickIt();
                gv.mines.redBigs.tickIt();
                gv.mines.redLittles.tickIt();
                if (gv.mouseDown !== true) {
                    dot1.y -= gv.vy;
                    dot2.y -= gv.vy;
                    line.y -= gv.vy;
                    dot1.x -= gv.vx;
                    dot2.x -= gv.vx;
                    line.x -= gv.vx;
                    if ((dot1.y < 0 && dot2.y < 0) || (dot1.y > gv.canvasHeight && dot2.y > gv.canvasHeight)) {
                        gv.swipeText.visible = true;
                    }
                }

            for (var i = 0; i < gv.loopingQ; i++) {
                if (mines[i] && gv.mines.onStage === true) {
                    var mine = mines[i];
                    mine.rotation +=mine.rot;
                    mine.y -= gv.vy;
                    mine.x -= gv.vx;

                    if (mine.y < -mine.h) mine.y = gv.canvasHeight;
                    if (mine.y > gv.canvasHeight) mine.y = -mine.h;

                    if (mine.x > gv.canvasWidth + mine.w) mine.x = -mine.w;
                    if (mine.x < -mine.w) mine.x = gv.canvasWidth + mine.w;
                    var mineRect = new gv.PIXI.Rectangle(mine.x + mine.rect.x, mine.y + mine.rect.y, mine.rect.width, mine.rect.height);
                    if (gv.vy > 0 && gv.utils.rectangleRectangleCollisionDetection(mineRect, gv.rect2) ) {
                            gv.fruit.reset();
                            gv.fruit.addToStage();
                            gv.vy *= bounce;
                            gv.mines.explode(mine);
                            gv.speedLimit = gv.storeSpeedLimit;
                            gv.hero.bounce();
                    }
                }
                if (clouds[i] && gv.clouds.onStage === true) {
                   
                    var cloud = clouds[i];

                    cloud.y -= gv.vy;
                    cloud.x -= gv.vx;

                    if (cloud.y < -cloud.h) cloud.y = gv.canvasHeight;
                    if (cloud.y > gv.canvasHeight) cloud.y = -cloud.h;
                    if (cloud.x > gv.canvasWidth + cloud.w) cloud.x = -cloud.w;
                    if (cloud.x < -cloud.w) cloud.x = gv.canvasWidth + cloud.w;


                    //CLOUD COLLISION DETECTION
                    var boxPoint = cloud.toGlobal(new gv.PIXI.Point(cloud.box.x, cloud.box.y));
                    var cloudRect = new gv.PIXI.Rectangle(boxPoint.x, boxPoint.y, cloud.w, 20);
                    if (testing === false && gv.vy >0  && gv.utils.rectangleRectangleCollisionDetection(cloudRect, gv.rect3 ) ) {
                        gv.vy *= bounce;
                        cloud.y += gv.rect3.height;
                        gv.speedLimit = gv.storeSpeedLimit;
                        gv.hero.bounce();
                    }

                }

            if (drums[i] && drums[i].visible === true &&  drums[i].alpha === 1 && gv.drums.onStage === true) {
                var drum = drums[i];
                drum.y -= gv.vy;
                drum.x -= gv.vx;
                if (drum.y < -drum.h) drum.y = gv.canvasHeight;
                if (drum.y > gv.canvasHeight+drum.h) drum.y = -drum.h;
                if (drum.x > gv.canvasWidth + drum.w) drum.x = -drum.w;
                if (drum.x < -drum.w) drum.x = gv.canvasWidth + drum.w;
                 A = drum.toGlobal(drum.point1);
                 B =  drum.toGlobal(drum.point2);
                if (testing === false &&  gv.vy > 0 && gv.speedLimit === gv.storeSpeedLimit && gv.utils.lineIntersectCircle(A, B, C, 20)) {
                    gv.hero.bounce();
                    gv.speedLimit = 75;
                    if (drum.side === "right") {
                        gv.vx =-10;
                        gv.heroInstance.scale.x = 1;
                    } else {
                        gv.vx = 10;
                        gv.heroInstance.scale.x = -1;
                    }
                    gv.vy *= -10;
                    gv.swipeText.visible = false;
                    gv.drums.drumRoll(drum);
                }
            }
            if (fruits[i]) {
                var fruit = fruits[i];
                fruit.rotation = gv.utils.cosWave(0, gv.utils.deg2rad(45), fruit.rotQ);
                fruit.y -= gv.vy;
                fruit.x -= gv.vx;
                if (fruit.y > gv.canvasHeight + fruit.height) fruit.y = -fruit.height;
                if (fruit.y < -fruit.height) fruit.y = gv.canvasHeight + fruit.width;

                if (fruit.x > gv.canvasWidth + fruit.width) fruit.x = -fruit.width;
                if (fruit.x < -fruit.width) fruit.x = gv.canvasWidth + fruit.width;

                var rect1 = new gv.PIXI.Rectangle(fruit.x - (fruit.width / 2), fruit.y, fruit.width, fruit.height);

                if (testing === false 
                    && gv.speedLimit === gv.storeSpeedLimit 
                    && gv.utils.rectangleRectangleCollisionDetection(rect1, gv.rect2)) {
                    gv.fruit.eat(fruit);
                    gv.hero.chew();
                    console.log('start start')
                    gv.stars.startPool(gv.hero.x, gv.hero.y, gv.kingCont);
                }
            }
        }

        if (gv.vy < gv.speedLimit)gv.vy += 0.25;
        if (gv.speedLimit !== gv.storeSpeedLimit) {
            gv.swipeText.visible = false;
            if (gv.vy > 0) {
                if (gv.speedLimit > gv.storeSpeedLimit) {
                    gv.speedLimit -= 0.5;
                } else {
                    gv.speedLimit = gv.storeSpeedLimit;
                }
            }
        } else if (gv.speedLimit === gv.storeSpeedLimit && gv.vy >0) {
            if(gv.vy > gv.speedLimit){
                gv.vy -= 0.5;
            }
            if(gv.vx > gv.speedLimit){
                gv.vx -= 0.5;
            }
            else if(gv.vx < -gv.speedLimit){
                gv.vx += 0.5;
            }
            if(gv.vx <= gv.speedLimit && gv.vy <= gv.speedLimit){
                gv.drums.show();
            }
        }

        //BOUNCING PLATFORM COLLISION DETECTION
        A = new gv.PIXI.Point(dot1.x, dot1.y);
        B = new gv.PIXI.Point(dot2.x, dot2.y);
        if (gv.mouseDown !== true && gv.utils.lineIntersectCircle(A, B, C, 20)) {
            if ((dot1.x > dot2.x && dot1.y < dot2.y) || (dot1.y > dot2.y && dot1.x < dot2.x)) {
                gv.vx = -2;
                gv.heroInstance.scale.x = 1;
            } else if ((dot1.x > dot2.x && dot1.y > dot2.y) || (dot1.y < dot2.y && dot1.x < dot2.x)) {
                gv.vx = 2;
                gv.heroInstance.scale.x = -1;
            }
            //gv.utils.playSound("boing");
            gv.vy *= -1.5;
            gv.hero.bounce();
            gv.swipeText.visible = false;
            gv.speedLimit = gv.storeSpeedLimit;
        }
        gv.renderer.render(gv.stage);
    } else if( gv.animateAllow === true && gv.introScreenOnStage === true ) {
        //THIS IF FOR THE NEXT LEVEL SCREENS
        if(gv.bouncePlatform.line.alpha === 1){
            gv.stars.tickIt();
            gv.background.tickIt();
            gv.bouncePlatform.tickIt();
            gv.nextLevelScreen.tickIt();
            gv.hero.y += gv.hero.introVY;
            gv.hero.introVY += 0.15;
            if(gv.hero.y > gv.halfHeight-130){
                gv.hero.y  = gv.halfHeight-140;
                // gv.utils.playSound("boing");

                gv.hero.introVY *= -0.85;
                gv.hero.bounce();
            }
        }
        gv.renderer.render(gv.stage);
    } else if( gv.animateAllow === true && gv.introScreenOnStage === false ) {
        gv.stars.tickIt();
        gv.mines.redBigs.tickIt();
        gv.mines.redLittles.tickIt();
        gv.renderer.render(gv.stage);
    }
    // requestAnimFrame(animate);
    gv.renderer.render(gv.stage);
}

}