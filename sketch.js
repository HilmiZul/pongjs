let video;
let poseNet;
let poses = [];
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


function setup() {
	//createCanvas(950, 550);
	createCanvas(windowWidth - 50, windowHeight - 150);

	//video = createCapture(VIDEO);
  //video.size(width, height);

  //poseNet = ml5.poseNet(video, modelReady);
  //poseNet.on("pose", function (results) {
   // poses = results;
  //});

  //video.hide();

	wMeja = width;
	hMeja = height;

	player_kiri = new Paddle("kiri", "red", 0);
	player_kanan = new Paddle("kanan", "yellow", 0);
	bola = new Ball()
}

//function modelReady() {
//  select("#status").html("");
//}

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

	// player kanan
	player_kanan.show()
	player_kanan.gerak();
	player_kanan.nepak(bola);
	player_kanan.goal(bola);
	player_kanan.cekTepi();
}

function meja() {
	push();
	noFill();
	stroke(255);
	strokeWeight(5);
	rect(0, 0 + skorbar, wMeja, hMeja - skorbar);
	line(wMeja / 2, 0 + skorbar, wMeja / 2, hMeja);
	strokeWeight(3);
	line(0, hMeja / 2 + skorbar / 2, wMeja, hMeja / 2 + skorbar / 2);
	if (!gamePlay) {
		push();
		fill(255);
		noStroke();
		textSize(20);
		textAlign(CENTER, CENTER)
		text("TEKAN SPASI", width / 2, 30);
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
	//image(video, 0, 0, width, height)
	// translate(width, 0)

	meja();
	skor();

	bola.show();
	player_kiri.show();
	player_kanan.show();


	if (gamePlay) {
		game();
	}
}

function keyPressed() {
	if (key === "w") player_kiri.atas = true;
	if (key === "s") player_kiri.bawah = true;
	if (key === "i") player_kanan.atas = true;
	if (key === "k") player_kanan.bawah = true;
	if (key === " ") gamePlay = true;
	if (keyCode === ESCAPE) gamePlay = false;
}

function keyReleased() {
	player_kiri.atas = false;
	player_kiri.bawah = false;
	player_kanan.atas = false;
	player_kanan.bawah = false;
}
