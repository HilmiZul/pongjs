let player_kiri;
let player_kanan;
let bola;
let wMeja;
let hMeja;
let skorbar = 50;
let gamePlay = false;

function setup() {
	createCanvas(750, 400);

	wMeja = width;
	hMeja = height;

	player_kiri = new Paddle("kiri", "red", 0);
	player_kanan = new Paddle("kanan", "yellow", 0);
	bola = new Ball()
}

function game() {
	// bola
	bola.update();
	bola.bouncing();

	// player kiri
	player_kiri.gerak();
	player_kiri.nepak(bola);
	player_kiri.goal(bola);
	player_kiri.cekTepi();

	// player kanan
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
	if (!gamePlay) {
		push();
		fill(255);
		noStroke();
		textSize(20);
		textAlign(CENTER, CENTER)
		text("TEKAN ENTER", width / 2, 30);
		pop();
	}
	pop();
}

function skor() {
	push();
	fill(255);
	textSize(20);
	textAlign(CENTER, CENTER)
	text(player_kiri.skor, 30, 30);
	text(player_kanan.skor, width - 40, 30);
	pop();
}

function draw() {
	background(100, 100, 250);

	meja();

	bola.show();
	player_kiri.show();
	player_kanan.show();

	skor();

	if (gamePlay) {
		game();
	}
}

function keyPressed() {
	if (key === "w") player_kiri.atas = true;
	if (key === "s") player_kiri.bawah = true;
	if (key === "i") player_kanan.atas = true;
	if (key === "k") player_kanan.bawah = true;
	if (keyCode === RETURN) gamePlay = true;
	if (keyCode === ESCAPE) gamePlay = false;
}

function keyReleased() {
	player_kiri.atas = false;
	player_kiri.bawah = false;
	player_kanan.atas = false;
	player_kanan.bawah = false;
}