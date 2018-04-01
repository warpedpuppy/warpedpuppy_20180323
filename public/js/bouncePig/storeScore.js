/**
 * Created by edwardwalther on 7/20/15.
 */


function StoreScore(){

    //if only one game per page hit, make this true
    this.oneGamePerPageHit = true;

    this.startTime = new Date().getTime();

}

StoreScore.prototype.sendScore = function(){

    if(username !== undefined && username !== 'guest') {

        if(this.oneGamePerPageHit === false)  this.startTime = new Date().getTime();

        var date = new Date().getTime();
        var duration = date - this.startTime;
        var uniqueKey = username+this.startTime.toString();
        //var arr = [["score", gv.score.score] ["level", gv.level.level],["duration", duration]];

        var arr = new Array(new Array("username",username),new Array("uniqueKey",uniqueKey),new Array("score", gv.score.score),new Array("level", gv.level.level),new Array("duration", duration),new Array("datestamp", date));

        $.post("../../../snippets/score.php", {
            gameName: "bouncePig",
            username: username,
            uniqueKey: uniqueKey,
            data: arr,
            token: token
        }, function (data) {

             alert(data);
        });
    }




};