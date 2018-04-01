/**
 * Created by edwardwalther on 3/20/15.
 */


function ObjectPoolBuilder(bitmapString, objQ, speeds, lifeSpan, rotateRange, pixi, spriteSheet, gv, loop, startScale){

    this.lifeSpan = lifeSpan;
    this.loop = loop;
    this.gv = gv;
    this.objQ = objQ;
    this.bitmapString = bitmapString;
    this.op = [];
    this.go = false;
    this.pixi = pixi;
    this.spriteSheet = spriteSheet;
    this.speeds = speeds;
    this.startScale = (startScale !== undefined)?startScale:0;
    if(rotateRange !== undefined)this.rotateRange = rotateRange;

    this.scaleIncrease = 0.5;
    this.buildPool();


}

ObjectPoolBuilder.prototype.singleObject = function(){

    var so;

    if(!this.pixi){
        so = new createjs.Bitmap(gv.assetLoader.loader.getResult(this.bitmapString));
        var bounds = so.getBounds();
        so.regX = bounds.width/2;
        so.regY = bounds.height/2;
    }

    else{
        if(this.spriteSheet === true){

            so = new PIXI.Sprite.fromFrame(this.bitmapString);
            so.anchor.x =so.anchor.y = 0.5;
            so.radius = so.width/2;
        }

    }


    so.vx = 0;
    so.vy = 0;
    so.speed = 0;
    so.angle = 0;
    so.rotateRange = (this.rotateRange !== undefined)?randomNumberBetween(this.rotateRange[0], this.rotateRange[1]):undefined;


    if(Math.floor(Math.random()*2) < 1)so.rotateRange *=-1;
    so.storeSpeed = 0;
    so.storeScale = 0;




    return so;
};

ObjectPoolBuilder.prototype.buildPool = function(){


    var instance;
    this.op.length = 0;
    this.op = [];
    for(var i =0; i < this.objQ; i ++){
        instance =  this.singleObject();
        instance.angle =  Math.round(Math.random() * 360);
        instance.speed = instance.storeSpeed = randomNumberBetween(this.speeds[0], this.speeds[1]);
        instance.vx = Math.cos(instance.angle) * instance.speed;

        instance.vy = Math.sin(instance.angle) * instance.speed;


        instance.scale.x =  instance.scale.y =this.startScale ;

        instance.storeScale = 1;//Math.random()*.75+.05;




        this.op.push(instance);

    }



};

ObjectPoolBuilder.prototype.startPool = function(xPos, yPos, addTo, index){
    var instance;

    this.addTo = addTo;


    for(var i =0; i < this.objQ; i ++){

        instance = this.op[i];
        this.restore(instance);
        instance.vx = Math.cos(instance.angle);// * instance.speed;

        instance.vy = Math.sin(instance.angle);// * instance.speed;
        instance.startX = instance.x = xPos;
        instance.startY = instance.y = yPos;
        instance.age = 0;
        instance.lifeSpan = randomIntBetween(this.lifeSpan[0], this.lifeSpan[1]);



        if(index === undefined)
            addTo.addChild(instance);
        else
            addTo.addChildAt(instance, index);

    }
    this.go = true;
};

ObjectPoolBuilder.prototype.addSpeed = function($target)
{
    $target.speed += 0.025;
    $target.vx = Math.cos($target.angle) * ($target.speed);
    $target.vy = Math.sin($target.angle) * ($target.speed);
};

ObjectPoolBuilder.prototype.restore = function($target)
{
    $target.y = $target.startY;
    $target.x = $target.startX;

    $target.visible = true;

    $target.speed =  $target.storeSpeed;

    $target.scale.x = $target.scale.y = this.startScale;


    $target.alpha =1;
};


ObjectPoolBuilder.prototype.tickIt = function(){

    if(this.go === true){


    var instance;
    for(var i =0; i < this.objQ; i ++){
        instance = this.op[i];

       // if(i == 0)trace(instance.age)
        if(instance.parent !== undefined){
            instance.x += instance.vx;
            instance.y += instance.vy;


            if(instance.rotateRange !== undefined)instance.rotation += instance.rotateRange;

            if(instance.scale.x < 1){

                instance.scale.x += 0.01;
                instance.scale.y += 0.01;
                instance.age ++;
                instance.alpha -= 0.005;
            }



            this.addSpeed(instance);

                if(instance.age >= instance.lifeSpan){
               // if((instance.y < -500 || instance.y > this.gv.canvasHeight) || (instance.x < -this.gv.canvasWidth || instance.x > this.gv.canvasWidth)) {
                    this.restore(instance);
                    //if(this.loop === true)
                        //this.restore(instance);
                   // else
                        instance.parent.removeChild(instance);
                    instance.age = 0;
                }

           // trace(instance.age)



        }




    }
    }
};


