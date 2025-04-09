var myCanvas = document.getElementById("myCanvas");
var context = myCanvas.getContext("2d");


/*------------------Block----------------------*/
let block = [];
let imgBlock = [
    "/img/block1.png",
    "/img/block2.png",
    "/img/block3.png",
    "/img/block4.png",
    "/img/block5.png",
    "/img/block6.png",
    "/img/block7.png",
    "/img/block8.png",
    "/img/block9.png"
];
function createBlock() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 7; col++) {
            let x = col * 70 + 10;
            let y = row * 40 + 70;
            let img = new Image();
            let newBlock = {
                x: x,
                y: y,
                width: 60,
                height: 40,
                img: img,
                ready: false
            };
            img.onload = function () {
                newBlock.ready = true;
            };
            img.src = imgBlock[Math.floor(Math.random() * imgBlock.length)];
            block.push(newBlock);
        }
    }
}

function startBlock() {
    for (let i = 0; i < block.length; i++) {
        let b = block[i];
        if (b.ready) {
            context.drawImage(b.img, b.x, b.y, b.width, b.height);
        }
    }
}
/*--------------------End Block------------------*/


/*--------------------Ball---------------------------*/
let ball = {
    x: 150,
    y: 300,
    dx: 1.4,
    dy: 1.5,
    img: new Image(),
    ready: false
};
ball.img.src = '/img/ball.png';
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
            const vachamSound = document.getElementById("vachamSound");
            vachamSound.currentTime = 0;
            vachamSound.play();
        }
        if (ball.y + ball.dy > 600 - 25 || ball.y + ball.dy < 0) {
            ball.dy = -ball.dy;
            const vachamSound = document.getElementById("vachamSound");
            vachamSound.currentTime = 0;
            vachamSound.play();
        }

    }

}

/*-------------------End Ball-------------------------*/


/*--------------------Paddle---------------------*/

let paddle = {
    x: 300,
    y: 500,
    img: new Image(),
    ready: false
};

paddle.img.src = '/img/paddle.png';
paddle.img.onload = function () {
    paddle.ready = true;
};

function startPaddle() {
    if (paddle.ready) {
        context.drawImage(paddle.img, paddle.x, paddle.y, 70, 20);
        if (
            ball.x < paddle.x + 70 && ball.x + 25 > paddle.x &&
            ball.y < paddle.y + 20 && ball.y + 25 > paddle.y
        ) {
            ball.dy = -ball.dy;
            const vachamSound = document.getElementById("vachamSound");
            vachamSound.currentTime = 0;
            vachamSound.play();
        }
    }
}

document.addEventListener("keydown", key => {
    switch (key.code) {
        case "ArrowLeft":
            if (paddle.x > 0)
                paddle.x -= 20;

            break;
        case "ArrowRight":
            if (paddle.x + 70 < 500)
                paddle.x += 20;
            break;
        default:
            break;
    }

});


/*-------------------End Paddle---------------*/
let score = parseInt(localStorage.getItem("score")) || 0;
// Tăng level
let level = parseInt(localStorage.getItem("level")) || 1;
let speedIncrease = level * 0.3;
ball.dx = ball.dx > 0 ? 1.4 + speedIncrease : -1.4 - speedIncrease;
ball.dy = ball.dy > 0 ? 1.5 + speedIncrease : -1.5 - speedIncrease;


function checkBlock(ball, block) {
    for (let i = 0; i < block.length; i++) {
        let b = block[i];
        if (ball.x < b.x + b.width && ball.x + 25 > b.x &&
            ball.y < b.y + b.height && ball.y + 25 > b.y
        ) {

            ball.dy = -ball.dy;
            const eatSound = document.getElementById("eatSound");
            eatSound.currentTime = 0;
            eatSound.play();
            // Xóa block khỏi mảng
            block.splice(i, 1);
            score += 10;
            localStorage.setItem("score", score);
            let highScore = localStorage.getItem("highScore") || 0;
            if (score > highScore) {
                localStorage.setItem("highScore", score);
            }
            break;
        }
    }

}

function render() {
    context.clearRect(0, 0, 500, 600);
    startBall();

    startPaddle();

    checkBlock(ball, block);

    startBlock();

    context.font = "20px Arial";
    context.fillStyle = "black";
    context.fillText("Sroce: " + score, 10, 55);

    let high = localStorage.getItem("highScore") || 0;
    context.fillText("High Score: " + high, 10, 25);

    context.fillText("Level: " + level, 400, 55);

    context.font = "20px Arial";
    context.fillStyle = "black";
    context.fillText("Home", 430, 25);

    if (ball.y + 25 > 570) {
        context.font = "30px Arial";
        context.fillStyle = "red";
        context.fillText("Game Over!", 170, 300);
        const gameoverSound = document.getElementById("gameoverSound");
        gameoverSound.currentTime = 0;
        gameoverSound.play();
        localStorage.setItem("level", 1);
        localStorage.setItem("score", 0);
        context.font = "20px Arial";
        context.fillStyle = "black";
        context.fillText("Replay", 220, 330);
        myCanvas.addEventListener("click", function nextClick(e) {
            let rect = myCanvas.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            if (x >= 220 && x <= 300 && y >= 310 && y <= 335) {
                window.location.href = "/code/game/index.html";
            }
        });
        return;
    } else
        if (block.length === 0) {
            context.font = "30px Arial";
            context.fillStyle = "red";
            context.fillText("You Win!", 190, 300);
            const youwinSound = document.getElementById("youwinSound");
            youwinSound.currentTime = 0;
            youwinSound.play();

            context.font = "20px Arial";
            context.fillStyle = "black";
            context.fillText("Next->", 220, 330);
            myCanvas.addEventListener("click", function nextClick(e) {
                let rect = myCanvas.getBoundingClientRect();
                let x = e.clientX - rect.left;
                let y = e.clientY - rect.top;

                if (x >= 220 && x <= 300 && y >= 310 && y <= 335) {
                    let currentLevel = parseInt(localStorage.getItem("level")) || 1;
                    if (currentLevel < 10) {
                        localStorage.setItem("level", currentLevel + 1);
                        window.location.href = `/code/level/level${currentLevel + 1}.html`;
                    } else {
                        context.font = "20px Arial";
                        context.fillStyle = "green";
                        context.fillText("Completed all levels", 160, 370);
                    }

                }
            });

            return;
        }


    requestAnimationFrame(render);


}
createBlock();
render();
myCanvas.addEventListener("click", out => {
    let rect = myCanvas.getBoundingClientRect();
    let x = out.clientX - rect.left;
    let y = out.clientY - rect.top;
    if (x >= 430 && x <= 490 && y >= 5 && y <= 25) {
        window.location.href = "/code/home/index.html";
    }
});

