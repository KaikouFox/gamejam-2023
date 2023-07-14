let player;
let img;
var col = 255;


function preload() {
  img = loadImage('player.jpg');
}

function setup() {
  createCanvas(1920, 1080);
  player = new Player(500, 500, 300/20, 394/20, 2, 2);
}

function draw() {
  //clear();
  background(255);
  player.update();
}

class Player{
  constructor(x, y, w, h, sx, sy){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sx = sx;
    this.sy = sy;
  }

  draw() {
    image(img, this.x, this.y, this.w, this.h);
  }
  move() {
    if (keyIsDown(65)) {
      this.x -= this.sx;
    }

    if (keyIsDown(68)) {
      this.x += this.sx;
    }

    if (keyIsDown(87)) {
      this.y -= this.sy;
    }

    if (keyIsDown(83)) {
      this.y += this.sy;
    }
  }
  update() {
    this.move();
    this.draw();
    }
}
