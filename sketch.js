let skulls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
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
  textStyle(NORMAL);
  textSize(30);
  fill('white');
  text('...a novel...', width/2, height/2)
  
  createSkull();
}

function createSkull() {
  if (skulls.length >= 20) {
    skulls[0].remove()
    skulls.shift();
  }
  s = createImg("assets/skull.gif?" + random(), 'skull');
  s.position(width, height/2 - 50);
  s.size(100, 100);
  skulls.push(s);
  setTimeout(createSkull, 2800);
}

function draw() {
  for (let skull of skulls) {
    if (skull.x > -100) {
      skull.position(skull.x - 1, skull.y)
    }
  }
}
