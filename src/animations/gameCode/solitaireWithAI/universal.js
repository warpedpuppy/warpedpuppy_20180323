/**
 * Created by edwardwalther on 8/7/14.
 */

$(document).ready(function(){

    init(60, 650, custom);

});




var gv;

function init(fpsParam, cH, gameName){


    gv = {};
    gv.canvasID = "tugtugCanvas";

    gv.canvas=document.getElementById(gv.canvasID);
    gv.ctx=gv.canvas.getContext("2d");

    if(cH == undefined)
        gv.canvasHeight =300;//$("#"+canvasID).height();
    else
        gv.canvasHeight = cH;

    gv.canvasWidth = $(window).width();
    gv.halfWidth = gv.canvasWidth/2;
    gv.halfHeight = gv.canvasHeight/2;



   // $("#"+gv.canvasID).attr("width", gv.halfWidth);
   // $("#ai").attr("width", gv.halfWidth);
   // $("#ai").attr("height", gv.halfWidth);




    gv.stage = new createjs.Stage(gv.canvasID);



    fps = fpsParam == undefined?30:fpsParam;

    addTicker(fps);


    if(gameName == undefined)
        custom();
    else
        gameName();


}

