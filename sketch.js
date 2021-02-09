let skulls = [];

let points = [];

let good = 0;
let bad = 0;
let other = 0;

let priest;

let imageLink1;
let imageLink2;
let img1;
let img2;

let happy;
let sad;

let hm = [];

function preload() {
  img1 = loadImage('image1.jpeg');
  img2 = loadImage('image2.jpeg');
  happy = loadImage('happy.jpeg');
  sad = loadImage('sad.jpeg');
  
  for (let i = 0; i < 20; i++) {
    hm.push(createAudio('hm_trimmed.mov'));
  }
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  cursor("assets/cursor.png");
  imageLink1 = new imageLink(0, img1, 'https://aqreview.org/come-up-here/');
  imageLink2 = new imageLink(100, img2, 'https://muse.jhu.edu/article/780831');
  // priest = createImg("assets/hitmarker.png", 't');
  // priest.position(1,1)
  happy.resize(100,100);
  sad.resize(100,100);
}
  
class imageLink {
  constructor(t, img, link) {
    this.t = t;
    this.link = link;
    this.img = img;
  }
  
  draw() {
    this.x = noise(frameCount/500 + this.t)*(width-this.img.width);
    this.y = noise(frameCount/500 + this.t+200)*(height-this.img.height);
    image(this.img, this.x, this.y);
  }
  
  // check(x, y) {
  //   let w = this.img.width;
  //   let h = this.img.height;
  //   if (this.x < x && x < this.x+w && this.y < y && y < this.y+h) {
  //     window.open(this.link);
  //   }
  // }
}

let x = 100;
let y = 100;

function draw() {
  background(0, 0, 255);
  if ((good + bad) < 25) {
    drawTitle();
    drawSkulls();
    fill(['white', 'white', 'red', 'red'][floor(frameCount/10)%4]);
    // text('s∞n', x, y);
  } else {
    background(0);
    textSize(64);
    if (good > bad) {
      fill(0,255,0)
      text('Good.', width/2, height/2 - 100);
    } else {
      fill(255,0,0);
      text('Bad.', width/2, height/2 - 100);
    }
    textSize(24);
    text('rexjshannon@gmail.com', width/2, height/2 + 200);
  }
  drawCounter();
  
  image(happy, 50, height-150);
  image(sad, 175, height-150);
  
  for (let i = 0; i < 5; i++) {
    text('rexjshannon@gmail.com', (i*width/5 + frameCount)%width, height-30);
  }
  imageLink1.draw();
  imageLink2.draw();
}

function drawTitle() {
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
}

function drawSkulls() {
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
}

function drawCounter() {
  push();
  text(good + bad+other, width*7/8, height*7/8);
  pop();
}

function mousePressed() {
  hm[(good+bad+other)%10].play();
  if (random() > 0.5 && (good + bad) < 25) {
    good++;
  } else if (good + bad < 25) {
    bad++;
  } else {
    other++;
  }
  let w = imageLink1.img.width;
  let h = imageLink1.img.height;
    if (imageLink1.x < mouseX && mouseX < imageLink1.x+w &&
        imageLink1.y < mouseY && mouseY < imageLink1.y+h) {
      window.open(imageLink1.link);
    }
  w = imageLink2.img.width;
  h = imageLink2.img.height;
  if (imageLink2.x < mouseX && mouseX < imageLink2.x+w &&
        imageLink2.y < mouseY && mouseY < imageLink2.y+h) {
      window.open(imageLink2.link);
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}
