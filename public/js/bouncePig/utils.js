/**
 * Created by edwardwalther on 8/10/14.
 */


function distributeAroundRadial(array, radius, addTo, spiral, itemQ){

    var arrayQ = (itemQ === undefined)?array.length:itemQ;
    var increase = (Math.PI * 2)/arrayQ;
    var  angle = 0;

    for( var i = 0; i < arrayQ; i++ ) {

        var item = array[i];
        item.rotation = 0;

        item.x =  radius * Math.cos( angle ) ;
        item.y =  radius * Math.sin( angle ) ;
        angle += increase;
        addTo.addChild(item);
        if(spiral === true)radius +=3;

    }


}


function playSound(str){

    createjs.Sound.play(str);
}

function returnText(str, big) {

    if(big === undefined)
        return new PIXI.BitmapText(str, {font: "30px SpeedballNo2SW", align: "left"});
    else
        return new PIXI.BitmapText(str, {font: "64px bigText", align: "left"});
}

function removeFromStage(item){
    item.parent.removeChild(item);
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}






function intersectRect(r1, r2) {
    return (a.left <= b.right &&
        b.left <= a.right &&
        a.top <= b.bottom &&
        b.top <= a.bottom);
}

function randomColor(){

    var x=Math.round(0xffffff * Math.random()).toString(16);
    var y=(6-x.length);
    var z='000000';
    var z1 = z.substring(0,y);
    var color= '#' + z1 + x;
    return color;
}

function moveToTop(displayObject){
    displayObject.parent.setChildIndex(displayObject, displayObject.children.length() -1 );
}

function center(displayObject, str){
    if(str === undefined){
        displayObject.x = (gv.canvasWidth-displayObject.width)/2;
        displayObject.y = (gv.canvasHeight-displayObject.height)/2;
    }
    else if (str == "x"){
        displayObject.x = (gv.canvasWidth-displayObject.width)/2;
    }
    else if (str == "y"){
        displayObject.y = (gv.canvasHeight-displayObject.height)/2;
    }
}

function makeInvisible(item){
    item.visible = false;
}



function cosWave(startPoint, differential, speed){
    //place in an onEnterFrame Handler0.0015

    var currentDate = new Date();
    return  startPoint+(Math.cos(currentDate.getTime()*speed) *differential);
}

function randomIntBetween(min, max) {
    max++;
    return Math.floor(Math.random() * (max - min) + min);
}

function randomNumberBetween(min, max) {

    return Math.random() * (max - min) + min;
}

function trace(str, inPage){

    if(inPage === undefined){
        console.log(str);
    }
    else{
        $("#test").text(str);
    }

}

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
};
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function pointRectangleCollisionDetection(item1, rectangle){

    var point = new createjs.Point(item1.x, item1.y);
    //console.log("target "+item1+" local x = "+item1.x+" global x = "+rectangle.x)
    var rightSide = rectangle.x + rectangle.width;
    var bottom = rectangle.y +rectangle.height;

    var radius = item1.radius !== undefined?item1.radius:0;




    if(point.x + radius > rectangle.x && point.x - radius <rightSide && point.y +radius > rectangle.y && point.y - radius < bottom){
        return true;
    }
    else{
        return false;
    }


}




function rectangleRectangleCollisionDetection(rect1, rect2) {
    return (rect1.x <=(rect2.x + rect2.width) &&
        rect2.x <= (rect1.x + rect1.width) &&
        rect1.y <= (rect2.y + rect2.height) &&
        rect2.y <= (rect1.y + rect1.height));
}

function pointItemCollisionDetection(item1, item2){

    //the item here is a class with two pubic properties:  a shape and the width
    var point = new createjs.Point(item1.x, item1.y);

    if(point.x > target.body.x && point.x < item2.body.x+item2.width&& point.y > item2.body.y && point.y < item2.body.y +item2.height){
        return true;
    }
    else{
        return false;
    }


}
String.prototype.capitalize = function() {

    return this.charAt(0).toUpperCase()+this.substr(1);
    //return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};


function addTicker(fps){

    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(fps);
}
function singleton(ClassName, thisInstance){

    if (window[ClassName].prototype._singletonInstance ) {
        return window[ClassName].prototype._singletonInstance;
    }
    window[ClassName].prototype._singletonInstance = thisInstance;
}

function proxy(method, scope) {

    return function() {
        return method.apply(scope, arguments);
    };
}


/*
function print(str){
    console.log(str);
}*/

function returnSprite(str){
    return new createjs.Sprite(gv.spriteSheet, str);
}
function touchAndCursorEnableNew(number){


        //this is what enables the cursor to be a pointer
        gv.stage.enableMouseOver(number);
        //this is what enables touch screens to work:
        createjs.Touch.enable(gv.stage);




}
Array.prototype.move = function (old_index, new_index) {

   // print("move")
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};

function formatDate(date, fmt) {
    function pad(value) {
        return (value.toString().length < 2) ? '0' + value : value;
    }
    return fmt.replace(/%([a-zA-Z])/g, function (_, fmtCode) {
        switch (fmtCode) {
            case 'Y':
                return date.getUTCFullYear();
            case 'M':
                return pad(date.getUTCMonth() + 1);
            case 'd':
                return pad(date.getUTCDate());
            case 'H':
                return pad(date.getUTCHours());
            case 'm':
                return pad(date.getUTCMinutes());
            case 's':
                return pad(date.getUTCSeconds());
            default:
                throw new Error('Unsupported format code: ' + fmtCode);
        }
    });
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

    return this.intersects;
}

function distanceAndAngle(point1, point2){
    var xs = 0;
    var ys = 0;

    xs = point2.x - point1.x;
    ys = point2.y - point1.y;
    var angle = Math.atan2(ys, xs);

    ys = ys * ys;
    xs = xs * xs;
    var distance = Math.sqrt( xs + ys );

    return [distance, angle];

}
function randomHex(){
    return "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
}
function centerOnStage(mc){
    mc.body.x = (canvasWidth - mc.body.getBounds().width)/2;
    mc.body.y = (canvasHeight - mc.body.getBounds().height)/2;
}
