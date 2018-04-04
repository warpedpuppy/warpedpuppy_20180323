/**
 * Created by edwardwalther on 8/10/14.
 */
$(document).ready(function(){init();});



var segments, numSegments, gravity, bounce, ball, i;
function custom(){

    numSegments = 6;
    gravity = 0.5;
    bounce = -0.9;

    ball = new Ball(10, "#FF0000");
    ball.vx = 10;

    segments = new Array();

    for(var i = 0; i < numSegments; i++)
    {
        var segment = new Segment(50, 10);
        segments.push(segment);

    }

    segment.body.x = canvasWidth / 2;
    segment.body.y = canvasHeight;


}

function tick(event){

    moveBall();
    var target = reach(segments[0], ball.body.x, ball.body.y);

    for( i = 1; i < numSegments; i++)
    {
        var segment = segments[i];
        target = reach(segment, target.x, target.y);

    }
    for( i = numSegments - 1; i > 0; i--)
    {
        var segmentA = segments[i];
        var segmentB = segments[i - 1];
        position(segmentB, segmentA);

    }

    checkHit();
    stage.update();

}
function reach(segment, xpos, ypos)
{
    var dx = xpos - segment.body.x;
    var dy = ypos - segment.body.y;
    var angle = Math.atan2(dy, dx);
    segment.body.rotation = angle * 180 / Math.PI;



    var w = segment.getPin().x - segment.body.x;
    var h = segment.getPin().y - segment.body.y;
    var tx = xpos - w;
    var ty = ypos - h;
    return new createjs.Point(tx, ty);
}
function position(segmentA, segmentB)
{
        segmentA.body.x = segmentB.getPin().x;
        segmentA.body.y = segmentB.getPin().y;

}

function moveBall()
{
    ball.vy += gravity;
    ball.body.x += ball.vx;
    ball.body.y += ball.vy;
    if(ball.body.x + ball.radius > canvasWidth)
    {
        ball.body.x = canvasWidth - ball.radius;
        ball.vx *= bounce;
    }
    else if(ball.body.x - ball.radius < 0)
    {
        ball.body.x = ball.radius;
        ball.vx *= bounce;
    }
    if(ball.body.y + ball.radius > canvasHeight)
    {
        ball.body.y = canvasHeight - ball.radius;
        ball.vy *= bounce;
    }
    else if(ball.body.y - ball.radius < 0)
    {
        ball.body.y = ball.radius;
        ball.vy *= bounce;
    }
}

function checkHit()
{
        var segment = segments[0];
        var dx = segment.getPin().x - ball.body.x;
        var dy = segment.getPin().y - ball.body.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < ball.radius)
        {
            ball.vx += Math.random() * 2 - 1;
            ball.vy -= 1;
        }
}
function resizeCanvas(){

    stage.removeAllChildren();

    canvasWidth = $(window).width();
    $("#"+canvasID).attr("width", canvasWidth);
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    custom();
};