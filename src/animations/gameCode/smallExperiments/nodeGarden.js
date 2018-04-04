/**
 * Created by edwardwalther on 8/10/14.
 */

var particles, numParticles, minDist, springAmount, line, lines;

function custom(){

    backgroundColor("#000000", "#FFFFFF");

    numParticles = 50;
    minDist = 100;
    springAmount = .001;

    particles = new Array();



    lines = new Array();

    for(var i = 0; i < numParticles; i++)
    {
        var particle = new Ball(3, "#FFFFFF");
        particle.body.x = Math.random() * canvasWidth;
        particle.body.y = Math.random() * canvasHeight;
        particle.vx = Math.random() * 6 - 3;
        particle.vy = Math.random() * 6 - 3;
        particles.push(particle);

        line = new createjs.Shape();
        lines.push(line);
        stage.addChild(line);
    }

}




function tick(event){

    //graphics.clear();
    for(var i = 0; i < numParticles; i++)
    {
        lines[i].graphics.clear();
        var particle = particles[i];
        particle.body.x += particle.vx;
        particle.body.y += particle.vy;
        if(particle.body.x > canvasWidth)
        {
            particle.body.x = 0;
        }
        else if(particle.body.x < 0)
        {
            particle.body.x = canvasWidth;
        }
        if(particle.body.y > canvasHeight)
        {
            particle.body.y = 0;
        }
        else if(particle.body.y < 0)
        {
            particle.body.y = canvasHeight;
        }
    }

    for(i=0; i < numParticles - 1; i++)
    {
        var partA = particles[i];
        for(var j = i + 1; j < numParticles; j++)
        {
            var partB = particles[j];
            spring(partA, partB, i);
        }
    }


    stage.update();

}

function spring(partA, partB, index)
{
    var dx = partB.body.x - partA.body.x;
    var dy = partB.body.y - partA.body.y;
    var dist = Math.sqrt(dx * dx + dy * dy);

    if(dist < minDist)
    {
        var line = lines[index];
        line.graphics.clear();
        line.graphics.setStrokeStyle(1);
        line.graphics.beginStroke("#FFFFFF");
        line.graphics.moveTo(partA.body.x, partA.body.y);
        line.graphics.lineTo(partB.body.x, partB.body.y);
        line.alpha = 1 - dist / minDist;
        line.graphics.endStroke();



        var ax = dx * springAmount;
        var ay = dy * springAmount;
        partA.vx += ax;
        partA.vy += ay;
        partB.vx -= ax;
        partB.vy -= ay;
}
}



function resizeCanvas(){

    stage.removeAllChildren();

    canvasWidth = $(window).width();
    $("#"+canvasID).attr("width", canvasWidth);
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    custom();
};