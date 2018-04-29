
export default function ObjectPoolBuilder(PIXI, bitmapString, objQ, speeds, lifeSpan, rotateRange, pixi, spriteSheet, gv, loop, startScale, Utils){
    return {
        op: [],
        go: false,
        scaleIncrease: 0.5,
        pixi: true,
        init: function () {
            this.buildPool()
            this.startScale = (startScale !== undefined)?startScale:10;
            if(rotateRange !== undefined)this.rotateRange = rotateRange; 
        },
        singleObject: function () {
            var so;
            so = new PIXI.Sprite.fromFrame(bitmapString);
            so.anchor.x =so.anchor.y = 0.5;
            so.radius = so.width/2;
            
            so.vx = 0;
            so.vy = 0;
            so.speed = 0;
            so.angle = 0;
            so.rotateRange = (this.rotateRange !== undefined)?gv.utils.randomNumberBetween(this.rotateRange[0], this.rotateRange[1]):undefined;
            if(Math.floor(Math.random()*2) < 1)so.rotateRange *=-1;
            so.storeSpeed = 0;
            so.storeScale = 0;
            return so;
        },
        buildPool: function () {
            var instance;
            this.op.length = 0;
            this.op = [];
            for(var i =0; i < objQ; i ++){
                instance =  this.singleObject();
                instance.angle =  Math.round(Math.random() * 360);
                instance.speed = instance.storeSpeed = gv.utils.randomNumberBetween(speeds[0], speeds[1]);
                instance.vx = Math.cos(instance.angle) * instance.speed;
                instance.vy = Math.sin(instance.angle) * instance.speed;
                instance.scale.x =  instance.scale.y = 1;//this.startScale ;
                instance.storeScale = 1;//Math.random()*.75+.05;
                // instance.x = instance.y = 100;
                this.op.push(instance);
            }
        },
        startPool: function (xPos, yPos, addTo, index) {
            var instance;
            this.addTo = addTo;
             console.log(gv.stage.children.length)
            for(var i = 0; i < objQ; i ++){
                instance = this.op[i];
                instance.x = instance.y = 100;
                // console.log(instance)
                instance.scale.x = instance.scale.y = 100;
                this.restore(instance);
                // instance.vx = Math.cos(instance.angle);// * instance.speed;
                // instance.vy = Math.sin(instance.angle);// * instance.speed;
                // instance.startX = instance.x = xPos;
                // instance.startY = instance.y = yPos;
                // instance.age = 0;
                // instance.lifeSpan = gv.utils.randomIntBetween(lifeSpan[0], lifeSpan[1]);
                // if(index === undefined)
                //     addTo.addChild(instance);
                // else
                //     addTo.addChildAt(instance, index);

                gv.stage.addChild(instance)

            }
            console.log(gv.stage.children.length)
            this.go = true;
        },
        addSpeed: function ($target) {
            $target.speed += 0.025;
            $target.vx = Math.cos($target.angle) * ($target.speed);
            $target.vy = Math.sin($target.angle) * ($target.speed);
        },
        restore: function ($target) {
            $target.y = $target.startY;
            $target.x = $target.startX;
            $target.visible = true;
            $target.speed =  $target.storeSpeed;
            $target.scale.x = $target.scale.y = this.startScale;
            $target.alpha =1;
        },
        tickIt: function () {
            // if(this.go === true){
            // let instance;
            // for (let i =0; i < objQ; i ++) {
            //     instance = this.op[i];
            //     if(instance.parent !== undefined){
            //         instance.x += instance.vx;
            //         instance.y += instance.vy;
            //         if(instance.rotateRange !== undefined)instance.rotation += instance.rotateRange;
            //         if(instance.scale.x < 1){
            //             instance.scale.x += 0.01;
            //             instance.scale.y += 0.01;
            //             instance.age ++;
            //             instance.alpha -= 0.005;
            //         }
            //         this.addSpeed(instance);
            //         if (instance.age >= instance.lifeSpan) {
            //             this.restore(instance);
            //             instance.parent.removeChild(instance);
            //             instance.age = 0;
            //         }
            //     }
            //   }
            // }
      }
    }
}