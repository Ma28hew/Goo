let cnv = document.getElementById("theCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 650;

let x = 30;
let y = 600;
let leftMove = false;
let rightMove = false;
let downMove = false;
let upMove = false;
let speedY = 5.5;
let speedX = 5.5;
let playerColor = "green"
let h = 50;
let w = 50;
let gravity = 0.05;
let gravityspeed = 0;
let maxgravityspeed = 5;
let hitBottom = false;

requestAnimationFrame(draw);


function draw() {
    if (rightMove) {
        x += speedX;
    }
    if (upMove) {
        y -= speedY + 3.01;
    }
    if (leftMove) {
        x -= speedX;
    }



    // Gravity
    if (gravityspeed > maxgravityspeed) {
        gravityspeed = gravityspeed
    } else {
        gravityspeed += gravity;
    }
    y += speedY + gravityspeed;

    // Border Stop
    if (y < 0) {
        y = 0;
    } else if (cnv.height <= y + 50) {
        y = cnv.height - h;
    }
    if (x < 0) {
        x = 0;
    } else if (cnv.width < x + 50) {
        x = cnv.width - w;
    }


    if (y + h === cnv.height) {
        hitBottom = true;
    } else if (x > 250 && x + 50 < 420 && y + 50 > 580) {
        hitBottom = true;
        y = 530;
    } else {
        hitBottom = false;
    }
    if (hitBottom) {
        gravityspeed = 0;
    }

    // Platform Stop
    if (x + 50 > 300 && y + 50 > 579 && x < 300) {
        x = 250;
    }
    if (x + 50 > 370 && y + 50 > 579 && x < 370) {
        x = 370;
    }





    console.log(hitBottom, gravityspeed)

    // DRAW CANVAS
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    ctx.fillStyle = "blue"
    ctx.fillRect(300, 580, 70, 70);

    // DRAW PLAYER
    ctx.fillStyle = playerColor;
    ctx.fillRect(x, y, w, h);
    requestAnimationFrame(draw);
}

// Event Listeners & Handlers
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

//console.log(event)
function keydownHandler(event) {

    if (event.code === "KeyD") {
        rightMove = true;
    } else if (event.code === "KeyW") {
        upMove = true;
    } else if (event.code === "KeyS") {
        downMove = true;
        h = 34;
        y = y + h;
    } else if (event.code === "KeyA") {
        leftMove = true;
    }
}

function keyupHandler(event) {
    if (event.code === "KeyD") {
        rightMove = false;
    } else if (event.code === "KeyW") {
        upMove = false;
    } else if (event.code === "KeyS") {
        downMove = false;
        h = 50;
    } else if (event.code === "KeyA") {
        leftMove = false;
    }
}