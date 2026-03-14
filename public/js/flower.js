// ------------------------------ Flower class -----------------------------------
class Flower {
  constructor(x) {
    this.x = x;
    // this.char = char;
    this.yOffset = 0;
    this.randSway = random(-100,100);
    this.stemMax = random(50,600);
    this.middleSize = 0;
    this.middleMax = random(2,30);
    this.petalSize = 0;
    this.petalMax = random(6,120);
    this.petalCount = random(fibonacci);
    this.opacity = 200;
    this.col = random(palette);

    this.amplitude = random(5,30); // defines the sway... 
    this.theta = random(TWO_PI); // speed 
  }

  update() {
    // grow stem
    if (this.yOffset < this.stemMax) {
      this.yOffset += 0.5;
    } 
    // grow middle
    else if (this.middleSize < this.middleMax) {
      this.middleSize += 0.52;
    }
    // grow petals
    else if (this.petalSize < this.petalMax) {
      this.petalSize += 0.1;
    
      // start to sway... 
    } else {
      this.theta += 0.3 
    }
  }

display() {

  let c = color(this.col);
  c.setAlpha(this.opacity);

  stroke("#637961");
  noFill();

  // -------------- STEM
  line(this.x, height, this.x + sin(this.theta) * this.amplitude, height - this.yOffset);
  noStroke();

  // ---------------MIDDLE 
  if (this.yOffset >= this.stemMax) {
    stroke(100);
    ellipse(this.x + sin(this.theta) * this.amplitude, height - this.yOffset, this.middleSize)
  }
  
  // ------------- PETALS
  let angle = 360 / this.petalCount;
  if (this.middleSize >= this.middleMax) {
    for (let i = 0; i < this.petalCount; i++) {
      push();
      fill(c);
      translate(this.x + sin(this.theta) * this.amplitude, height - this.yOffset);
      rotate(i * angle);
      ellipse(0, -this.middleSize / 2 - this.petalSize / 2, this.petalSize / 2,this.petalSize);
      pop();
      }
    }
  }
}
