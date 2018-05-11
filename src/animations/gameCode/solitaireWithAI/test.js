/**
 * Created by edwardwalther on 8/10/14.
 */


function custom() {

    var manifest = [
        {id: "cardBack", src: "/images/exercises/cards/cardBack.png"},
        {id: "club", src: "/images/exercises/cards/club.png"},
        {id: "diamond", src: "/images/exercises/cards/diamond.png"},
        {id: "heart", src: "/images/exercises/cards/heart.png"},
        {id: "spade", src: "/images/exercises/cards/spade.png"}
    ];



    gv.assetLoader = new AssetLoaderClass();
    gv.assetLoader.loadItems(manifest, proxy(assetsLoaded, this));

}


function assetsLoaded(){

    touchAndCursorEnableNew(10);
    speed = 50;
    gv.cards = [];
    gv.slots = [];
    gv.flipPile = [];
    gv.flippedPile = [];
    gv.flipPileDragCard;
    gv.pile13 = [];
    gv.pileXYs = [];

    gv.totalCards = 13;


    gv.piles = [[],[],[],[]];

    gv.cardCont = new createjs.Container();



    var cardWidth = 75;
    var cardHeight = 100;
    gv.stage.addChild(gv.cardCont);
    generateCards(cardWidth, cardHeight);
    deal();

    gv.ai = new AI(speed);



    $(".radio").css("display", "inline");
    $("#reset").css("display", "none");
    $("#reset").click(function(){resizeCanvas();});
    $("#start").css("display", "block");
    $("#start").click(function(){start();});


    $("input[name=radio]:radio").change(function () {

        var value =$(this).attr("value")

        if(value == "check0"){
            gv.ai.changeSpeed(2000);

        }
        else if(value == "check1"){
            gv.ai.changeSpeed(1000);

        }
        else if(value == "check2"){
            gv.ai.changeSpeed(500);


        }
        else if(value == "check3"){
            gv.ai.changeSpeed(50);


        }

    });
    window.onresize = function(){ resizeCanvas(); }






}

function start(){



    $("#reset").css("display", "block");
    $("#start").css("display", "none");
    $(".radio").css("display", "none");
    gv.ai.start();

}




function resizeCanvas(){
    $("#ai").html("");
    gv.ai.str = "<li>thinking</li>";
    gv.ai.stop();
    gv.cardCont.removeAllChildren();


    gv.canvasWidth = $(window).width();


    gv.halfWidth = gv.canvasWidth/2

    gv.flipPile = [];
    gv.flippedPile = [];
    gv.flipPileDragCard;
    gv.pile13 = [];
    gv.pileXYs = [];


    gv.piles = [[],[],[],[]];

    deal();


    $(".radio").css("display", "inline");
    $("#reset").css("display", "none");
    $("#start").css("display", "block");



};




function tick(event){

    gv.stage.update();



}
