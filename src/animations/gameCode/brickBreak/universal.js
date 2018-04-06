/**
 * Created by edwardwalther on 8/7/14.
 */
var canvas, ctx, canvasWidth, canvasHeight, halfWidth, halfHeight, stage, canvasID;

function init(fpsParam, cH, gameName){

    canvasID = "tugtugCanvas";

    canvas=document.getElementById(canvasID);
    ctx=canvas.getContext("2d");

    if(cH == undefined)
        canvasHeight =300;//$("#"+canvasID).height();
    else
        canvasHeight = cH;

    canvasWidth = $(window).width();
    $("#"+canvasID).attr("width", canvasWidth);

    halfWidth = canvasWidth/2;
    halfHeight = canvasHeight/2;

    stage = new createjs.Stage(canvasID);


    fps = fpsParam == undefined?30:fpsParam;

    addTicker(fps);


    if(gameName == undefined)
        custom();
    else
        gameName();


}

