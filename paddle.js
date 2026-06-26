class Paddle {
  constructor(player, playerScore) {
    this.player = player;
    this.width = 30;
    this.height = 130;
    this.pos = createVector(0, height / 2);
    this.color = color(0, 213, 0);
    this.move = 8;
    this.score = playerScore;
    this.isGoal = false
  }

  show() {
    fill(this.color);
    noStroke();

    // initialize and detect hands.
    // the X Y wrist position will replace the default this.pos
    for (let i = 0; i < hands.length; i++) {
      let hand = hands[i];
      for (let j = 0; j < hand.keypoints.length; j++) {

        // tangan kiri
        if(hand.handedness == 'Left' && this.player === 'kiri') {
          leftWrist = hand.keypoints[0];
          this.pos.x = 0 + this.width;
          this.pos.y = lerp(this.pos.y, leftWrist.y, 0.01)
          rect(
            this.pos.x,
            this.pos.y,
            this.width,
            this.height,
          );
        }

        // tangan kanan
        if(hand.handedness == 'Right' && this.player === 'kanan'){
          rightWrist = hand.keypoints[0];
          this.pos.x = width - this.width * 2
          this.pos.y = lerp(this.pos.y, rightWrist.y, 0.01)
          rect(
            this.pos.x,
            this.pos.y,
            this.width,
            this.height,
          );
        }
      }
    }
  }

  // this func will handle collide between Paddle and the ball
  block(theBall) {
    let hit = collideRectCircle(
      this.pos.x, this.pos.y, this.width, this.height,
      theBall.pos.x, theBall.pos.y, theBall.size
    );
    if(hit) {
      soundTok.play()
      theBall.moveX = theBall.moveX * -1;
    }
  }

  // scoring based on player (left or right)
  // reset ball position and direction
  goal(theBall) {
    if(this.player === "kiri") {
      if (theBall.pos.x > width + theBall.size) {
        theBall.reset();
        this.score++;
        this.isGoal = true
        gamePlay = false;
        soundPing.play()
        countDownToStart = 3
      } else {
        this.isGoal = false
      }
    } else {
      if (theBall.pos.x < 0 - theBall.size) {
        theBall.reset();
        theBall.moveX *= -1; // reverse servis bola pemain
        this.score++;
        this.isGoal = true
        gamePlay = false;
        soundPing.play()
        countDownToStart = 3
      } else {
        this.isGoal = false
      }
    }
  }

  checkEdge() {
    if(this.pos.y > height - this.height) {
      this.pos.y = height - this.height;
    }

    if(this.pos.y < 0 + scoreBar) {
      this.pos.y = 0 + scoreBar;
    }
  }
}
