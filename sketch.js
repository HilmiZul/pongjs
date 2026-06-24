let video;
let handPose;
let hands = [];
let pose;
let leftWrist;
let rightWrist;

let player_kiri;
let player_kanan;
let bola;
let wMeja;
let hMeja;
let skorbar = 50;
let gamePlay = false;
let gameOver = false
let gameWin = {
  right: false,
  left: false
}
let poin = 11

function preload() {
  handPose = ml5.handPose({ flipped: true });
}

function setup() {
	//createCanvas(950, 550);
	createCanvas(windowWidth - 50, windowHeight - 150);

  video = createCapture(VIDEO, { flipped: true });
  video.size(width, height);
  video.hide();
  handPose.detectStart(video, modelReady);

	wMeja = width;
	hMeja = height;

	player_kiri = new Paddle("kiri", "red", 0);
	player_kanan = new Paddle("kanan", "yellow", 0);
	bola = new Ball()
}

function modelReady(results) {
  hands = results;
}

function game() {
	// bola
	bola.update();
	bola.bouncing();

	// player kiri
	player_kiri.show()
	player_kiri.gerak();
	player_kiri.nepak(bola);
	player_kiri.goal(bola);
	player_kiri.cekTepi();

  // check if skor = 11 poin sesuai rule pingpong
  if(player_kiri.skor == poin) {
    gameOver = true
    gameWin.left = true
    gameWin.right = false
  }

	// player kanan
	player_kanan.show()
	player_kanan.gerak();
	player_kanan.nepak(bola);
	player_kanan.goal(bola);
	player_kanan.cekTepi();

  // check if skor = 11 poin sesuai rule pingpong
  if(player_kanan.skor == poin) {
    gameOver = true
    gameWin.left = false
    gameWin.right = true
  }
}

function meja() {
	push();
	noFill();
	stroke(255);
	strokeWeight(5);
	rect(0, 0 + skorbar, wMeja, hMeja - skorbar);
	line(wMeja / 2, 0 + skorbar, wMeja / 2, hMeja);
	strokeWeight(3);
	// line(0, hMeja / 2 + skorbar / 2, wMeja, hMeja / 2 + skorbar / 2);
	if (!gamePlay && hands.length > 0) {
		push();
		fill(255);
		noStroke();
		textSize(20);
		textAlign(CENTER, CENTER)
		text("TEKAN SPASI UNTUK MAIN", width / 2, 30);
		pop();
	}
	pop();
}

function skor() {
	push();
	fill(255);
	textSize(25);
	textAlign(CENTER, CENTER)
	text(player_kiri.skor, 30, 30);
	text(player_kanan.skor, width - 40, 30);
	pop();
}


function draw() {
	background(100, 100, 250);

	meja();
	skor();

  bola.show();

  if(hands.length > 0) {
    player_kiri.show();
    player_kanan.show();
  } else {
    push()
    fill(255, 255, 255)
    strokeWeight(2);
    stroke(0, 0, 0)
    textSize(100);
    textAlign(CENTER, CENTER)
    text('Angkat Kedua Tanganmu!', width/2, height/2)
    pop()
  }

	if (gamePlay) {
		game();
	}

  if(gameOver && gameWin.left) {
    noLoop()
    push()
    background(0, 0, 0, 200)
    textSize(60)
    textAlign(CENTER, CENTER)
    text("Selamat Player Kiri Menang!", width / 2, height / 2)
    textSize(50)
    textAlign(CENTER, BOTTOM)
    text("Tekan ENTER untuk Permainan Baru", width / 2, height - 200)
    pop()
  } else if(gameOver && gameWin.right) {
    noLoop()
    push()
    background(0, 0, 0, 200)
    textSize(60)
    textAlign(CENTER, CENTER)
    text("Selamat Player Kanan Menang!", width / 2, height / 2)
    textSize(50)
    textAlign(CENTER, BOTTOM)
    text("Tekan ENTER untuk Permainan Baru", width / 2, height - 200)
    pop()
  }
}

function keyPressed() {
  // DISABLE KEY CONTROL sementara, karena kontrol player dihandle oleh handPose wrist
	// if (key === "w") player_kiri.atas = true;
	// if (key === "s") player_kiri.bawah = true;
	// if (key === "i") player_kanan.atas = true;
	// if (key === "k") player_kanan.bawah = true;

	if (key === " ") gamePlay = true
	if (keyCode === RETURN) {
    gamePlay = false
    gameOver = false
    gameWin.left = false
    gameWin.right = false
    player_kanan.skor = 0
    player_kiri.skor = 0
    bola.reset()
    loop()
  }
	if (keyCode === ESCAPE) gamePlay = false;
}

// DISALBE KEY CONTROL
// function keyReleased() {
// 	player_kiri.atas = false;
// 	player_kiri.bawah = false;
// 	player_kanan.atas = false;
// 	player_kanan.bawah = false;
// }
