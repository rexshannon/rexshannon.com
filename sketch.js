// size 2560x1440, speed 20k, frameCount%360 for big mess

let speed;
let g;

function setup() {
  createCanvas(windowWidth, windowHeight);
  c = createGraphics(1080, 720, WEBGL);
  g = createGraphics(1080, 720);
  g.background(0);
  grid = make2DArray(1080, 720);
  x = c.width / 2;
  y = c.height / 2;
  dir = ANTUP;
  // speed = createSlider(1, 20000, 2000); 
  // speed = random(15000);
  speed = 3000
  g.colorMode(HSB);
  g.noFill();
  textAlign(LEFT, CENTER);
  textSize(12);
  rectMode(CENTER);
  if (width < 500) {
    textSize(6);
  }
}

function whiteRule() {
  turnRight();
  grid[x][y] = 1;
  grid[x][y-1] = 0;
  grid[x][y+1] = 0;
  grid[x][y+4] = 0;
  grid[x][y+5] = 0;
  moveForward();
  turnLeft();
}

function blackRule() {
  turnLeft();
  grid[x][y] = 0;
  moveForward();
}

function draw() {
  g.strokeWeight(1);
  for (let n = 0; n < speed; n++) {
    let state = grid[x][y];
    if (state == 0) {
      whiteRule();
    } else if (state == 1) {
      blackRule();
    }

    g.stroke(frameCount/2%360, 80, 80);
    if (grid[x][y] == 1) {
      g.stroke(color(0));
    }
    g.point(x, y);
    moveForward();
  }

  c.background(0);
  c.texture(g);

  c.push();
  c.rotateX(PI/2);
  c.rotateY(frameCount/400+noise(300)*4);
  c.rotateZ(frameCount/400+noise(320)*4);

  c.torus(500, 460,100,100);

  c.pop();
  image(c, 0,0, width, height);
  push();
  textAlign(CENTER);
  textSize(60);
  textStyle('bold');
  text('CPT-415', width/2, 80);
  textSize(20);
  text('Rex Shannon', width/2, 150);
  pop();
  fill(255);
  text(desc, width/2, height/2, width*4/5, height);
}

function turnRight() {
  dir++;
  if (dir > ANTLEFT) {
    dir = ANTUP;
  }
}

function turnLeft() {
  dir--;
  if (dir < ANTUP) {
    dir = ANTLEFT;
  }
}

function moveForward() {
  if (dir == ANTUP) {
    y--;
  } else if (dir == ANTRIGHT) {
    x++;
  } else if (dir == ANTDOWN) {
    y++;
  } else if (dir == ANTLEFT) {
    x--;
  }

  if (x > c.width - 1) {
    x = 0;
  } else if (x < 0) {
    x = c.width - 1;
  }
  if (y > c.height - 1) {
    y = 0;
  } else if (y < 0) {
    y = c.height - 1;
  }
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

let grid;
let x;
let y;
let dir;

let ANTUP = 0;
let ANTRIGHT = 1;
let ANTDOWN = 2;
let ANTLEFT = 3;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}

let desc = `CPT-415 is a novel born from the internet. It delves into the dark hearts of incels, the homosocial intimacies of gamers, and the chaotic residue of the online world that lives on in our heads. CPT-415 seeks to answer the ultimate question posed by the internet age: What is real?

 
The novel’s protagonist is Marco, a 20-year-old schizophrenic. Marco believes the makers of Call of Duty are using their first-person shooter video game to secretly train 8 million boys to be super soldiers. The only way for him to prevent World War 3 is to destroy his disc in the “lava” of California’s Mt. Diablo. After some hikers find Marco unconscious in a cave on the mountain, Marco’s family sends him to Pugweenee Wilderness Recovery Ranch For Troubled Boys And Young Men in Idaho, where he befriends Tristan, a suicidal hypochondriac with a panic disorder, and meets Mark, an incel who brought a gun to school. When Marco’s brother and Tristan’s sister visit Pugweenee, Tristan dies, and nobody knows whether it was by his own hand or Marco’s.

 
CPT-415 trawls the dark corners of the internet and reproduces the fucked up language of its overconfident incognitos: Marco and Tristan sext over World of Warcraft chat; Tristan exchanges insults with a stranger in a League of Legends lobby; incels post depraved theories on degenerate message boards. CPT-415’s dark humor and layered complexity evoke the chaotic experience of the online world: the novel teems with Joycean puzzles, parafictional trapdoors, and intentional elisions that ask the reader to supply her own meaning. 

 
The novel probes the internet-addled minds of the mentally ill—especially the schizophrenia of Marco, whose chapters of fractured, memory-laden phantasmagoria are the heart of the novel—but also the minds of panickers, the suicidal, the homicidal, the broken boys like Mark that live on 4chan. A Vasily Grossman-esque chapter on Mark haunting the hallways of his school with a gun in his backpack is a sad exposé of the hate-filled incel’s torturous heart. 


CPT-415 will resonate with an audience that lives online, that feels uneasy believing anything to be authentic, that has not fully felt the magnitude of the horde of empty young white boys growing up in the blue of their computer screens. Chapters that feature Tristan’s sister Blake, an undergrad who wants to be a writer but hates writers, will speak to an audience tired of its own cynicism. The novel’s exploration of male friendship, especially the bond between Marco and Tristan, will touch the legion boys who bonded over shared internet and gaming addictions.`