class Paddle {
  constructor(player, warna, skor) {
    this.player = player;
    this.width = 30;
    this.height = 130;
    this.pos = createVector(0, height / 2);
    this.color = color(warna);
    this.atas = false;
    this.bawah = false;
    this.kecepatan = 8;
    this.skor = skor;
  }

  show() {
    fill(this.color);
    noStroke();

    for (let i = 0; i < hands.length; i++) {
      let hand = hands[i];
      for (let j = 0; j < hand.keypoints.length; j++) {

        // tangan kiri
        if(hand.handedness == 'Left' && this.player === 'kiri') {
          fill(213, 0, 0);
          leftWrist = hand.keypoints[0];
          this.pos.x = 0 + this.width;
          // this.pos.y = leftWrist.y
          this.pos.y = lerp(this.pos.y, leftWrist.y, 0.02)
          stroke(0)
          strokeWeight(2)
          rect(
            this.pos.x,
            this.pos.y,
            this.width,
            this.height,
          );
        }

        // tangan kanan
        if(hand.handedness == 'Right' && this.player === 'kanan'){
          fill(0, 213, 0);
          rightWrist = hand.keypoints[0];
          this.pos.x = width - this.width * 2
          // this.pos.y = rightWrist.y
          this.pos.y = lerp(this.pos.y, rightWrist.y, 0.02)
          stroke(0)
          strokeWeight(2)
          rect(
            this.pos.x,
            this.pos.y,
            this.width,
            this.height,
          );
        }
      }
    }

    // ml5 versi 0.1.x
    // if (poses.length > 0) {
    //   pose = poses[0].pose;
    //   leftWrist = pose.leftWrist;
    //   rightWrist = pose.rightWrist;
    //
    //   if (this.player === "kiri") {
    //     // ellipse(leftWrist.x, leftWrist.y, 50, 50)
    //     this.pos.x = 0 + this.width;
    //     this.pos.y = leftWrist.y
    //     rect(
    //       this.pos.x,
    //       leftWrist.y,
    //       this.width,
    //       this.height,
    //       );    
    //   } else {
    //     // ellipse(rightWrist.x, rightWrist.y, 50, 50)
    //     this.pos.x = width - this.width * 2
    //     this.pos.y = rightWrist.y
    //     rect(
    //       this.pos.x,
    //       rightWrist.y,
    //       this.width,
    //       this.height,
    //     );
    //   }
    // }
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
