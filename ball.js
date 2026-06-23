class Ball {
  constructor() {
    this.size = 40;
    this.pos = createVector(width / 2, height / 2 + skorbar / 2);
    this.kecepatanX = random(15, 19);
    this.kecepatanY = random(4, 6);
    this.warna = color(250, 255, 50);
  }

  show() {
    fill(this.warna);
    noStroke();
    ellipse(
      this.pos.x,
      this.pos.y,
      this.size
    );
  }

  update() {
    if (gamePlay) {
      this.pos.x = this.pos.x + this.kecepatanX;
      this.pos.y = this.pos.y + this.kecepatanY;
    }
  }

  bouncing() {
    if (this.pos.y > height - this.size / 2 || this.pos.y < 0 + this.size / 2 + skorbar) {
      this.kecepatanY = this.kecepatanY * -1;
    }
  }

  reset() {
    this.pos = createVector(width / 2, height / 2 + skorbar / 2);
    this.kecepatanX = random(15, 19);
    this.kecepatanY = random(4, 6);
  }
}
