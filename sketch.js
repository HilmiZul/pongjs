let video;
let handPose;
let hands = [];
let leftWrist;
let rightWrist;

let player_kiri;
let player_kanan;
let ball;
let tableWidth;
let tableHeight;
let scoreBar = 50;
let gamePlay = false;
let gameOver = false
let gameWin = {
  right: false,
  left: false
}
let point = 11
let countDownToStart = 3

let soundPing;
let soundTok;
let soundCongrats;


function preload() {
  handPose = ml5.handPose({ flipped: true });
  soundPing = loadSound("./assets/audio/ping.m4a")
  soundTok = loadSound("./assets/audio/tok.m4a")
  soundCongrats = loadSound("./assets/audio/congrats.m4a")
}

function setup() {
	createCanvas(windowWidth - 50, windowHeight - 150);

  video = createCapture(VIDEO, { flipped: true });
  video.size(width, height);
  video.hide();
  handPose.detectStart(video, modelReady);

	tableWidth = width;
	tableHeight = height;

	player_kiri = new Paddle("kiri", 0);
	player_kanan = new Paddle("kanan", 0);
	ball = new Ball()
}

function modelReady(results) {
  hands = results;
}

function game() {
	// a ball
	ball.update();
	ball.bouncing();

	// player kiri
	player_kiri.show()
	player_kiri.block(ball);
	player_kiri.goal(ball);

  // check if skor = 11 point sesuai rule pingpong
  if(player_kiri.score == point) {
    player_kanan.isGoal = false
    player_kiri.isGoal = false
    gameOver = true
    gameWin.left = true
    gameWin.right = false
    soundPing.stop()
    soundCongrats.play()
  }

	// player kanan
	player_kanan.show()
	player_kanan.block(ball);
	player_kanan.goal(ball);

  // check if skor = 11 point sesuai rule pingpong
  if(player_kanan.score == point) {
    player_kanan.isGoal = false
    player_kiri.isGoal = false
    gameOver = true
    gameWin.left = false
    gameWin.right = true
    soundPing.stop()
    soundCongrats.play()
  }
}

function meja() {
	push();
	noFill();
	stroke(255);
	strokeWeight(5);
	rect(0, 0 + scoreBar, tableWidth, tableHeight - scoreBar);
	line(tableWidth / 2, 0 + scoreBar, tableWidth / 2, tableHeight);
	strokeWeight(3);
	// line(0, tableHeight / 2 + scoreBar / 2, tableWidth, tableHeight / 2 + scoreBar / 2);
	pop();
}

function displayScore() {
	push();
	fill(255);
  noStroke()
	textSize(35);
	textAlign(CENTER, CENTER)
	text(player_kiri.score, 30, 25);
	text(player_kanan.score, width - 40, 25);
	pop();
}


function draw() {
	background(100, 100, 250);

	meja();
	displayScore();

  ball.show();

  if(hands.length > 0) {
    player_kiri.show();
    player_kanan.show();

    if(countDownToStart < 0) {
      gamePlay = true
    } else {
      push()
      background(0, 0, 0, 200)

      push()
      fill(250, 100, 100)
      stroke(255)
      strokeWeight(5)
      rectMode(CENTER)
      rect(width/2, height/2, 400, 350, 30)
      pop()

      fill(255, 255, 255)
      noStroke()
      textAlign(CENTER, CENTER)

      if(player_kanan.isGoal) {
        textSize(70)
        text(`⬅️`, width/2, height/2 - 100)
      } else if(player_kiri.isGoal) {
        textSize(70)
        text(`➡️`, width/2, height/2 - 100)
      }
      textSize(50);
      text('Ready in...', width/2, height/2)
      text(countDownToStart, width/2, height/2 + 100)
      pop()
      if (frameCount % 60 == 0) {
        countDownToStart--
      }
    }
  } else {
    gamePlay = false
    countDownToStart = 3
    push()
    background(0, 0, 0, 200)

    push()
    fill(250, 100, 100)
    stroke(255)
    strokeWeight(5)
    rectMode(CENTER)
    rect(width/2, height/2, 600, 200, 30)
    pop()

    fill(255, 255, 255)
    noStroke()
    textSize(50);
    textAlign(CENTER, CENTER)
    text('Put both hands up! 🙌🏻', width/2, height/2)
    pop()
  }

	if (gamePlay) {
		game();
	}

  if(gameOver && gameWin.left) {
    noLoop()
    push()
    background(0, 0, 0, 200)

    push()
    fill(100, 100, 250)
    stroke(255)
    strokeWeight(5)
    rectMode(CENTER)
    rect(width/2, height/2, 700, 300, 30)
    pop()

    fill(255)
    noStroke()
    textSize(50)
    textAlign(CENTER, CENTER)
    text("🎉 LEFT PLAYER WINS! 👏🏻", width / 2, height / 2 - 50)
    textSize(50)
    textAlign(CENTER, BOTTOM)
    text("Press ENTER", width / 2, height - 300)
    pop()
  } else if(gameOver && gameWin.right) {
    noLoop()
    push()
    background(0, 0, 0, 200)

    push()
    fill(100, 100, 250)
    stroke(255)
    strokeWeight(5)
    rectMode(CENTER)
    rect(width/2, height/2, 700, 300, 30)
    pop()

    fill(255)
    noStroke()
    textSize(50)
    textAlign(CENTER, CENTER)
    text("🎉 RIGHT PLAYER WINS! 👏🏻", width / 2, height / 2 - 50)
    textSize(50)
    textAlign(CENTER, BOTTOM)
    text("Press ENTER", width / 2, height - 300)
    pop()
  }
}

function keyPressed() {
	if (keyCode === RETURN) {
    gamePlay = false
    gameOver = false
    gameWin.left = false
    gameWin.right = false
    player_kanan.score = 0
    player_kiri.score = 0
    ball.reset()
    loop()
  }
}
