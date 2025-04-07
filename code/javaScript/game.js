var myCanvas = document.getElementById("myCanvas");
var context = myCanvas.getContext("2d");


/*------------------Block----------------------*/
let block = [];

function createBlock() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 7; col++) {
            let x = col * 70 + 10;
            let y = row * 40 + 40;
            block.push({
                x: x,
                y: y,
                width: 60,
                height: 30
            });
        }
    }
}

function startBlock() {
    for (let i = 0; i < block.length; i++) {
        let b = block[i];
        context.fillStyle = "yellow";
        context.fillRect(b.x, b.y, b.width, b.height);
    }
}
/*--------------------End Block------------------*/


/*--------------------Ball---------------------------*/
let ball = {
    x: 150,
    y: 300,
    dx: 1,
    dy: 1,
    img: new Image(),
    ready: false
};
ball.img.src = '/img/book13.jpg';
ball.img.onload = function () {
    ball.ready = true;
};
function startBall() {
    if (ball.ready) {
        context.drawImage(ball.img, ball.x, ball.y, 25, 25);
        ball.x += ball.dx;
        ball.y += ball.dy;
        if (ball.x + ball.dx > 500 - 25 || ball.x + ball.dx < 0) {
            ball.dx = -ball.dx;
        }
        if (ball.y + ball.dy > 600 - 25 || ball.y + ball.dy < 0) {
            ball.dy = -ball.dy;
        }

    }

}

/*-------------------End Ball-------------------------*/


/*--------------------Paddle---------------------*/

let paddle = {
    x: 300,
    y: 500
};

function startPaddle() {
    context.fillStyle = 'red';
    context.fillRect(paddle.x, paddle.y, 70, 20);
    if (
        ball.x < paddle.x + 70 && ball.x + 25 > paddle.x &&
        ball.y < paddle.y + 20 && ball.y + 25 > paddle.y
    ) {
        ball.dy = -ball.dy;
    }
}

document.addEventListener("keydown", key => {
    switch (key.code) {
        case "ArrowLeft":
            if (paddle.x > 0)
                paddle.x -= 10;
            break;
        case "ArrowRight":
            if (paddle.x + 70 < 500)
                paddle.x += 10;
            break;
        default:
            break;
    }

});


/*-------------------End Paddle---------------*/
let score = 0;

function checkBlock(ball, block) {
    for (let i = 0; i < block.length; i++) {
        let b = block[i];
        if (ball.x < b.x + b.width && ball.x + 25 > b.x &&
            ball.y < b.y + b.height && ball.y + 25 > b.y
        ) {

            ball.dy = -ball.dy;

            // Xóa block khỏi mảng
            block.splice(i, 1);
            score += 10;
            break;
        }
    }
}

function render() {
    context.clearRect(0, 0, 500, 600);
    startBall();

    startPaddle();

    startBlock();

    checkBlock(ball, block);

    context.font = "20px Arial";
    context.fillStyle = "black";
    context.fillText("Điểm: " + score, 10, 25);

    if (ball.y > 600 - 26) {
        context.font = "30px Arial";
        context.fillStyle = "red";
        context.fillText("Game Over!", 170, 300);
        return;
    }
    requestAnimationFrame(render);


}
createBlock();
render();

