/**
 * Created by edwardwalther on 8/10/14.
 */


    $(document).ready(function(){init();});



var segment0, segment1, segment2, segment3, speedSlider, thighRangeSlider, thighBaseSlider, calfRangeSlider, callOffsetSlider, gravitySlider, cycle, vx, vy;
cycle = 0;
function custom(){


    vx = 0;
    vy = 0;

    var sliderYs = 60;

    segment0 = new Segment(50, 15, "#FFFFFF");
    segment0.body.x = halfWidth;
    segment0.body.y = 100;

    segment1 = new Segment(50, 10,"#FFFFFF");
    segment1.body.x = segment0.getPin().x;
    segment1.body.y = segment0.getPin().y;

    segment2 = new Segment(50, 15,"#FFFFFF");
    segment2.body.x = halfWidth;
    segment2.body.y = 100;

    segment3 = new Segment(50, 10,"#FFFFFF");
    segment3.body.x = segment2.getPin().x;
    segment3.body.y = segment2.getPin().y;

    speedSlider = new SimpleSlider(0, 0.3, 0.12, 10, sliderYs, "speed");
    thighRangeSlider = new SimpleSlider(0, 90, 45, 70, sliderYs, "thigh range");
    thighBaseSlider = new SimpleSlider(0, 180, 90, 130, sliderYs, "thigh base");
    calfRangeSlider = new SimpleSlider(0, 90, 45, 190, sliderYs, "calf range");
    calfOffsetSlider = new SimpleSlider(-3.14, 3.14, -1.57, 250, sliderYs, "calf offset");
    gravitySlider = new SimpleSlider(0, 1, 0.2, 310, sliderYs, "gravity");

    createjs.Touch.enable(stage);
}

function tick(event){

    doVelocity();

    walk(segment0, segment1, cycle);
    walk(segment2, segment3, cycle + Math.PI);

    cycle += speedSlider.returnValue();

    checkFloor(segment1);
    checkFloor(segment3);
    checkWalls();

    stage.update();

}

    function walk(segA, segB, cyc)
    {
        var foot = segB.getPin();
        var angleA = Math.sin(cyc) * thighRangeSlider.returnValue() + thighBaseSlider.returnValue();

        var angleB = Math.sin(cyc + calfOffsetSlider.returnValue()) *calfRangeSlider.returnValue() + calfRangeSlider.returnValue();


        segA.body.rotation = angleA;

        segB.body.rotation = segA.body.rotation + angleB;
        segB.body.x = segA.getPin().x;
        segB.body.y = segA.getPin().y;



        segB.vx = segB.getPin().x - foot.x;

        segB.vy = segB.getPin().y - foot.y;
    }

function doVelocity()
{
    vy += gravitySlider.returnValue();
    segment0.body.x += vx;
    segment0.body.y += vy;
    segment2.body.x += vx;
    segment2.body.y += vy;

}

function checkFloor(seg)
{
    seg.body.setBounds(seg.body.x, seg.body.y , seg.segmentWidth, 60);
    var bounds = seg.body.getBounds();


    var yMax = seg.body.y +bounds.height;

    if(yMax > canvasHeight)
    {
        var dy = yMax - canvasHeight + 5;
        segment0.body.y -= dy;
        segment1.body.y -= dy;
        segment2.body.y -= dy;
        segment3.body.y -= dy;
        //vx -= seg.vx;
       // vy -= seg.vy;
    }
}
function checkWalls()
{
       var w = canvasWidth + 200;
    if(segment0.body.x > canvasWidth + 100)
    {
        segment0.body.x -= w;
        segment1.body.x -= w;
        segment2.body.x -= w;
        segment3.body.x -= w;
    }
    else if(segment0.body.x < -100)
    {
        segment0.body.x += w;
        segment1.body.x += w;
        segment2.body.x += w;
        segment3.body.x += w;
    }
}

function resizeCanvas(){

    stage.removeAllChildren();

    canvasWidth = $(window).width();
    $("#"+canvasID).attr("width", canvasWidth);
    halfWidth = canvasWidth/2
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    custom();
};