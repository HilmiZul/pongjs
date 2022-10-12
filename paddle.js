class Paddle {
  constructor(player, warna, skor) {
    this.player = player;
    this.width = 15;
    this.height = 60;
    this.pos = createVector(0, height / 2);
    this.color = color(warna);
    this.atas = false;
    this.bawah = false;
    this.kecepatan = 7;
    this.skor = skor;
  }

  show() {
    fill(this.color);
    noStroke();
    if (this.player === "kiri") {
      this.pos.x = 0 + this.width;
      rect(
        this.pos.x,
        this.pos.y,
        this.width,
        this.height,
      );
    } else {
      this.pos.x = width - this.width * 2
      rect(
        this.pos.x,
        this.pos.y,
        this.width,
        this.height,
      );
    }
  }

  gerak() {
    if(this.atas) this.pos.y = this.pos.y - this.kecepatan;
    if(this.bawah) this.pos.y = this.pos.y + this.kecepatan;
  }

  nepak(bola) {
    let hit = collideRectCircle(
      this.pos.x, this.pos.y, this.width, this.height,
      bola.pos.x, bola.pos.y, bola.size
    );
    if(hit) bola.kecepatanX = bola.kecepatanX * -1;
  }

  goal(bola) {
    if(this.player === "kiri") {
      if (bola.pos.x > width + bola.size) {
        bola.reset();
        this.skor++;
        gamePlay = false;
      }
    } else {
      if (bola.pos.x < 0 - bola.size) {
        bola.reset();
        bola.kecepatanX *= -1; // reverse servis bola pemain
        this.skor++;
        gamePlay = false;
      }
    }
  }

  cekTepi() {
    if(this.pos.y > height - this.height) this.pos.y = height - this.height;
    if(this.pos.y < 0 + skorbar) this.pos.y = 0 + skorbar;
  }
}