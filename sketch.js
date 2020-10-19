let skulls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
}

let x = 100;
let y = 100;

function draw() {
  background(0, 0, 255);
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(128)
  fill('red');
  text('CPT-415', width/2, height/5);
  textStyle(NORMAL);
  textSize(64);
  fill('white');
  text('REX SHANNON', width/2, height/5 + 100);
  textSize(20);
  text('...a novel...', width/2, height/2)
  
  for (let skull of skulls) {
    skull.position(skull.x + 1, height/2 - 50)
  }
  if (skulls.length > 40) {
    skulls[0].remove()
    skulls.shift();
  }
  if ((frameCount % 160) == 0) {
    s = createImg("assets/skull.gif?" + random(), 'skull');
    s.position(-200, height/2 - 50);
    s.size(100, 100);
    skulls.push(s);
    x = random(width);
    y = random(height);
  }
  fill(['white', 'white', 'red', 'red'][frameCount%4]);
  text('s∞n', x, y);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}