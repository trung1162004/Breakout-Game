var myHome = document.getElementById("myHome");
var context = myHome.getContext("2d");


context.font = "20px Arial";
context.fillStyle = "black";
context.fillText("Bắt đầu", 215, 350);

myHome.addEventListener("click", start =>{
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