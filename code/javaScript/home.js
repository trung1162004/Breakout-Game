var myHome = document.getElementById("myHome");
var context = myHome.getContext("2d");


context.font = "20px Arial";
context.fillStyle = "black";
context.fillText("START", 215, 350);

myHome.addEventListener("click", start => {
    let rect = myHome.getBoundingClientRect();
    let x = start.clientX - rect.left;
    let y = start.clientY - rect.top;

    if (x >= 215 && x <= 290 && y >= 330 && y <= 350) {
        window.location.href = "/code/game/index.html";
    }
});
const nenSound = document.getElementById("nenSound");
nenSound.loop = true;
nenSound.play();

let high = localStorage.getItem("highScore") || 0;
context.fillText("High Score: " + high, 10, 25);


let playerName = localStorage.getItem("playerName") || "Enter Name";
function nameStart() {
    localStorage.setItem("playerName", playerName);
    context.clearRect(387, 5, 150, 25);
    context.fillText("Player: " + playerName, 320, 25);

}

document.addEventListener("keydown", function (e) {
    if (e.key === "Backspace") {
        playerName = playerName.slice(0, -1); // Xóa ký tự cuối
    } else if (e.key.length === 1  && playerName.length < 11) { // Chỉ lấy ký tự thường
        playerName += e.key;
    }
    nameStart();
});

nameStart();