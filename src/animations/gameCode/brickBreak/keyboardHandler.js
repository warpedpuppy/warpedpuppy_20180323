/**
 * Created by edwardwalther on 10/6/14.
 */
function handleKeyDown(event) {
    event.preventDefault();

  

    switch(event.keyCode) {
        case 39:
            //right
            tugtug.paddle.vx = tugtug.paddle.speed;
            tugtug.paddle.moveLeft = false;
            tugtug.paddle.moveRight= true;
            tugtug.paddle.peterOut = false;

            break;
        case 37:
            //left
            tugtug.paddle.vx = tugtug.paddle.speed;
            tugtug.paddle.moveLeft = true;
            tugtug.paddle.moveRight= false;
            tugtug.paddle.peterOut = false;
            break;
        case 13:
            tugtug.startButton.classRef.startGame();
            

    }
}

function handleKeyUp(event) {
    switch(event.keyCode) {
        case 39:
            //right
            tugtug.paddle.moveRight= false;
            tugtug.paddle.peterOut = true;
            break;
        case 37:
            //left
            tugtug.paddle.peterOut = true;
            tugtug.paddle.moveLeft = false;
            break;

    }
}