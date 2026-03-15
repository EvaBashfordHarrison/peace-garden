// ------------------------------ Flower class -----------------------------------
class Flower {
  constructor(x, petalMax) { // map the petal max size later 
    this.x = x;
    this.yOffset = 0;
    this.randSway = random(-100,100);
    this.stemMax = random(50,600);
    this.middleSize = 0;
    this.middleMax = random(2,30);
    this.petalSize = 0; // this starts at 0 and is updated with the petal max 
    this.petalMax = petalMax;
    this.petalCount = random(fibonacci); // making sure the petals always fit around a cirle, fibonacci decalred earlier. 
    this.col = random(palette); // predefined palette of blues and greens 

    this.amplitude = random(5,30); // defines the sway animation 
    this.theta = random(TWO_PI); // speed of the sway 
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
