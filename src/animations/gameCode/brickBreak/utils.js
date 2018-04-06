/**
 * Created by edwardwalther on 8/10/14.
 */


function intersectRect(r1, r2) {
    return (a.left <= b.right &&
        b.left <= a.right &&
        a.top <= b.bottom &&
        b.top <= a.bottom)
}

function randomColor(){

    var x=Math.round(0xffffff * Math.random()).toString(16);
    var y=(6-x.length);
    var z='000000';
    var z1 = z.substring(0,y);
    var color= '#' + z1 + x;
    return color;
}

function cosWave(startPoint, differential, speed){
    //place in an onEnterFrame Handler0.0015

    var currentDate = new Date();
    return  startPoint+(Math.cos(currentDate.getTime()*speed) *differential);
}

function randomIntBetween(min, max) {
    max++;
    return Math.floor(Math.random() * (max - min) + min);
};

function randomNumberBetween(min, max) {

    return Math.random() * (max - min) + min;
};

function trace(str){
    $("#test").text(str);
};

function deg2rad(degree) {
    return degree * (Math.PI / 180);
}
function rad2deg(radians){
    return radians * 180 / Math.PI;
}

function backgroundColor(background, border){
    $("#tugtugCanvas").css("background-color", background);
    $("#tugtugCanvas").css("border-top", "1px solid "+border);
    $("#tugtugCanvas").css("border-bottom", "1px solid "+border);
}
Array.prototype.sortOn = function(){
    var dup = this.slice();
    if(!arguments.length) return dup.sort();
    var args = Array.prototype.slice.call(arguments);
    return dup.sort(function(a,b){
        var props = args.slice();
        var prop = props.shift();
        while(a[prop] == b[prop] && props.length) prop = props.shift();
        return a[prop] == b[prop] ? 0 : a[prop] > b[prop] ? 1 : -1;
    });
}

function pointRectangleCollisionDetection(item1, rectangle){

    var point = new createjs.Point(item1.x, item1.y);
    //console.log("target "+item1+" local x = "+item1.x+" global x = "+rectangle.x)
    var rightSide = rectangle.x + rectangle.width;
    var bottom = rectangle.y +rectangle.height

    var radius = item1.radius != undefined?item1.radius:0;




    if(point.x + radius > rectangle.x && point.x - radius <rightSide && point.y +radius > rectangle.y && point.y - radius < bottom){
        return true
    }
    else{
        return false;
    }


}

function rectangleRectangleCollisionDetection(rect1, rect2) {
    return (rect1.x <=(rect2.x + rect2.width) &&
        rect2.x <= (rect1.x + rect1.width) &&
        rect1.y <= (rect2.y + rect2.height) &&
        rect2.y <= (rect1.y + rect1.height))
}

function pointItemCollisionDetection(item1, item2){

    //the item here is a class with two pubic properties:  a shape and the width
    var point = new createjs.Point(item1.x, item1.y);

    if(point.x > target.body.x && point.x < item2.body.x+item2.width&& point.y > item2.body.y && point.y < item2.body.y +item2.height){
        return true
    }
    else{
        return false;
    }


}
String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};


function addTicker(fps){

    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(fps);
}
function singleton(ClassName, thisInstance){
    print('asdf')
    if (window[ClassName].prototype._singletonInstance ) {
        return window[ClassName].prototype._singletonInstance;
    }
    window[ClassName].prototype._singletonInstance = thisInstance;
}

function proxy(method, scope) {
    return function() {
        return method.apply(scope, arguments);
    }
}



function print(str){
    console.log(str);
}
function touchAndCursorEnable(number){
    //this is what enables the cursor to be a pointer
    stage.enableMouseOver(number);

    //this is what enables touch screens to work:
    createjs.Touch.enable(stage);
}

function lineIntersectCircle(A ,B, C, r)
{
    this.intersects = false;

    var a  = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y);
    var b  = 2 * ((B.x - A.x) * (A.x - C.x) +(B.y - A.y) * (A.y - C.y));
    var cc  = C.x * C.x + C.y * C.y + A.x * A.x + A.y * A.y - 2 * (C.x * A.x + C.y * A.y) - r * r;
    var deter  = b * b - 4 * a * cc;
    if (deter <= 0 )
    {
        this.inside = false;
    }
    else
    {
        var e  = Math.sqrt (deter);
        var u1  = ( - b + e ) / (2 * a );
        var u2  = ( - b - e ) / (2 * a );
        if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1))
        {

        }
        else
        {
            this.intersects = true;

        }
    }
}


function centerOnStage(mc){
    mc.body.x = (canvasWidth - mc.body.getBounds().width)/2;
    mc.body.y = (canvasHeight - mc.body.getBounds().height)/2;
}
/*

 function fullScreenChange(){

 if (
 document.fullscreenElement ||
 document.webkitFullscreenElement ||
 document.mozFullScreenElement ||
 document.msFullscreenElement
 ){

 fightScene.fullScreen.visible = true;
 fightScene.endFullScreen.visible =false;
 canvasHeight = 250;
 canvasWidth = 300;
 if (document.exitFullscreen) {
 document.exitFullscreen();
 } else if (document.webkitExitFullscreen) {
 document.webkitExitFullscreen();
 } else if (document.mozCancelFullScreen) {
 document.mozCancelFullScreen();
 } else if (document.msExitFullscreen) {
 document.msExitFullscreen();
 }

 fightScene.endFullScreenFunction();

 }
 else{
 fightScene.fullScreen.visible =false;
 fightScene.endFullScreen.visible =true;
 if (canvas.requestFullscreen) {
 canvas.requestFullscreen();
 } else if (canvas.webkitRequestFullscreen) {
 canvas.webkitRequestFullscreen();
 } else if (canvas.mozRequestFullScreen) {
 canvas.mozRequestFullScreen();
 } else if (canvas.msRequestFullscreen) {
 canvas.msRequestFullscreen();
 }

 canvasWidth = $(document).width();
 canvasHeight = $(window).height();

 fightScene.fullScreenFunction();
 }


 halfWidth = canvasWidth/2;
 halfHeight = canvasHeight/2
 $("#"+canvasID).attr("width", canvasWidth);
 $("#"+canvasID).attr("height", canvasHeight);

 }
 */
