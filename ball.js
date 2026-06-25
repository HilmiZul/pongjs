class Ball {
  constructor() {
    this.size = 40;
    this.pos = createVector(width / 2, height / 2 + scoreBar / 2);
    this.moveX = random(15, 19);
    this.moveY = random(4, 6);
    this.color = color(250, 255, 50);
  }

  show() {
    fill(this.color);
    noStroke();
    circle(
      this.pos.x,
      this.pos.y,
      this.size
    );
  }

  update() {
    if (gamePlay) {
      this.pos.x = this.pos.x + this.moveX;
      this.pos.y = this.pos.y + this.moveY;
    }
  }

  bouncing() {
    if (this.pos.y > height - this.size / 2 || this.pos.y < 0 + this.size / 2 + scoreBar) {
      this.moveY = this.moveY * -1;
    }
  }

  reset() {
    this.pos = createVector(width / 2, height / 2 + scoreBar / 2);
    this.moveX = random(15, 19);
    this.moveY = random(4, 6);
  }
}
