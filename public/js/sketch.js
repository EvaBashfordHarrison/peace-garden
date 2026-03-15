let customFont;

// empty array for flowers 
let flowers = [];
let fibonacci = [3,5,8,13,21];

// empty array for color palette
let palette = [];

// buttons 
let select; 

// text settings 
let textXMotion = 1;

let url;
let peace;

///// csv things 
let peaceCounts = [];

let data;
let countries;
let army;
let peaceCount;

let selectedCountry;
let index;
let armyValue;
let peaceValue;


function preload() {
  data = loadTable('/data/military.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  customFont = loadFont('fonts/RobotoMono-VariableFont_wght.ttf');

  // CSV setup 
  let numRows = data.getRowCount();
  countries = data.getColumn('Country');
  army = data.getColumn('Per 1,000 capita(total)');

  console.log(countries[3]);
  console.log(army[3])
  console.log(numRows);

  let m = max(army);
  console.log("highest number:" + m)

  // dropdown list 
  select = createSelect();
  select.position(20, 58); // Relative to the top-left of the page
  select.style('z-index', '10'); // High z-index ensures it sits ON TOP of canvas
  for (let i = 0; i < countries.length; i++) { // push list of countries 
    select.option(countries[i]);
  }
  // WHEN SELECTED --> 
  select.changed(updateVisual); // when selected... 

  palette = [ /// of the colours 
    color("#bcdc2b"),  
    color("#3edfac"),  
    color("#2b6c52"),  
    color("#b2eca8"),  
    color("#0e70cb"),  
  ]
}


function draw() {
  background(240);

  if (selectedCountry === undefined && armyValue === undefined) {
    drawHeaderText = 'Choose a country to begin'
  } else {
    drawHeaderText = `${selectedCountry} HAS ${armyValue} PER 1000 CAPITA.`;   
  }

  // ------- HEADER TEXT 
  tickerText(textXMotion, drawHeaderText);
  textXMotion += 1;
  if (textXMotion > width) {
    textXMotion = -700;
  }

  // ------- flowers draw; 
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].update();
    flowers[i].display();
  }
  fill(50, 90);
  textSize(10);
  noStroke();
  // footer text for reference 
  text('Data reference from: Abhijit Dahatonde | Updated 3 years ago. Reference: https://www.kaggle.com/datasets/abhijitdahatonde/global-armed-forces-dataset?', 20, height-30);
}

function updateVisual() {
  selectedCountry = select.value();
  index = countries.indexOf(selectedCountry);
  armyValue = float(trim(army[index])); 
  peaceValue = (1000 - armyValue) / 10;
  console.log(selectedCountry);
  drawFlowers(peaceValue);
  console.log(armyValue);
  console.log("peace percentage is: "+ peaceValue);
}

function drawFlowers(value) {
  flowers = [];

  for (let i = 0; i < peaceValue; i++) {
    let xPos = random(100, width - 100);
    let size = map(peaceValue, 60,100, 10,120);
    // flowers.push(new Flower(x, petalMax));

    flowers.push(new Flower(xPos, size));
  }
}


function tickerText(xPos, updateHeaderText) {
  fill(50);
  textFont(customFont);
  noStroke();
  textSize(16); 

  text(updateHeaderText, xPos, 30);
  textSize(12);
  if (peaceValue === undefined) {
    text('choose a country to assess the peace', 300, 73)
    textSize(24);
    text('Welcome to a visualisation of militia around the world. \nEach garden represents a percentage of the selected country that is not prepared for war.', 20, 140, width - 150);
  } else {
    text(`Peace Value is ${peaceValue}`, 300,73);
  }

  // CREATE PIE GRAPH OF PEACE (peace pie?)
  let lines = 20;
  let glyphAngle = 360/lines;
  let radius = 15;
  let armyValPercentage = armyValue / 5;
  push();
  translate(275,68);
  for (let i = 0; i < lines; i++) {
    let angle = i * glyphAngle; 
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;
    if (angle < armyValPercentage) {
      strokeWeight(1);
      stroke(50)
    } else {
      strokeWeight(1);
      stroke(200);
    }
    line(0,0,x,y)
  }
  pop();

  stroke(100);
  strokeWeight(1);
  line(0, 45, width, 45); // line 1
  line(0, 90, width, 90); // line 2 
}
