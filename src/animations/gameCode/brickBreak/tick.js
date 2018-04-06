/**
 * Created by edwardwalther on 10/6/14.
 */
function tick(event){

    if(tugtug.gamePlay == true){


        tugtug.ball.x += tugtug.ball.vx;
        tugtug.ball.y += tugtug.ball.vy;
        if(tugtug.ball.y-tugtug.ball.radius < 0)tugtug.ball.vy*=-1;
        if(tugtug.ball.x+tugtug.ball.radius > tugtug.setting.width || tugtug.ball.x - tugtug.ball.radius < 0)tugtug.ball.vx*=-1;

        if(tugtug.ball.y +tugtug.ball.radius > tugtug.setting.height){
            tugtug.ball.classRef.reset();
            tugtug.lives.classRef.loseLife();
        }


        var rect = new createjs.Rectangle(tugtug.paddle.x, tugtug.paddle.y, tugtug.paddle.width, tugtug.paddle.height)



        if(pointRectangleCollisionDetection(tugtug.ball, rect)){


            tugtug.paddle.classRef.hit(tugtug.ball.x,tugtug.paddle.x)
            tugtug.setting.classRef.spinWheels();
        }

    }


    if(tugtug.paddle.moveRight ){
        tugtug.paddle.vx = -Math.abs(tugtug.paddle.vx);
    }
    else if(tugtug.paddle.moveLeft){
        tugtug.paddle.vx = Math.abs(tugtug.paddle.vx);
    }

    if(!tugtug.paddle.moveLeft && !tugtug.paddle.moveRight) {


        if (tugtug.paddle.peterOut && Math.abs(tugtug.paddle.vx) > 1) {

            tugtug.paddle.vx *= .9;


        }
        else if (tugtug.paddle.peterOut && Math.abs(tugtug.paddle.vx) < 1) {
            tugtug.paddle.peterOut = false;
            tugtug.paddle.vx = 0;
        };
    };

    if(tugtug.paddle.x > (tugtug.setting.width-tugtug.paddle.width))tugtug.paddle.x = (tugtug.setting.width-tugtug.paddle.width);
    if(tugtug.paddle.x < 0 )tugtug.paddle.x =0;


   tugtug.paddle.x -= tugtug.paddle.vx;



    counter = 0;
    var b, index, ta, totalBlocks;










    for(var i = 0; i < 5; i ++) {


        for (var j = 0; j < 10; j++) {

            if(tugtug.gamePlay == true) {
                rectangle = new createjs.Rectangle(tugtug.bricks.hitBlocks[counter].x, tugtug.bricks.hitBlocks[counter].y, 50, 5)


                if (tugtug.bricks.hitBlocks[counter].visible && pointRectangleCollisionDetection(ball, rectangle)) {
                    tugtug.bricks.hitBlocks[counter].visible = false;
                    tugtug.ball.vx *= -1;
                    tugtug.ball.vy *= -1;
                    tugtug.ball.y += 5;
                    tugtug.score.classRef.increase();
                }


                counter ++;
            };



            if(i %2 == 0){

                tugtug.bricks.rows[i][j].body.x += tugtug.bricks.movement;


                if(tugtug.bricks.rows[i][j].body.x > tugtug.setting.width){
                    b = tugtug.bricks.rows[i][j].body;
                    b.x = tugtug.bricks.rows[i][0].body.x - (tugtug.bricks.rows[i][j].blockWidth + tugtug.bricks.spacer);
                    b.alpha = 0;
                    TweenLite.to(b,.25, {alpha:1});
                    index = tugtug.bricks.rows[i].length -1;
                    ta = tugtug.bricks.rows[i].splice(index ,1);
                    tugtug.bricks.rows[i].unshift(ta[0]);

                }
            }
            else{
                tugtug.bricks.rows[i][j].body.x -=tugtug.bricks.movement;

                if(tugtug.bricks.rows[i][j].body.x < -tugtug.bricks.rows[i][j].blockWidth){
                    b = tugtug.bricks.rows[i][j].body;
                    totalBlocks = tugtug.bricks.rows[i].length -1;
                    b.alpha = 0;
                    TweenLite.to(b,.25, {alpha: 1});
                    b.x = tugtug.bricks.rows[i][totalBlocks].body.x + tugtug.bricks.rows[i][totalBlocks].blockWidth + tugtug.bricks.spacer;
                    ta = tugtug.bricks.rows[i].splice(0 ,1);
                    tugtug.bricks.rows[i].push(ta[0]);

                }
            }

        }
    };

    stage.update();



}
