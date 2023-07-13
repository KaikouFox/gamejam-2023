let player;
let img;

function preload() {
  img = loadImage('player.jpg');
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  player = new Player(innerWidth/2-150, innerHeight/2-197, 300/1, 394/1, 10, 5, 5)
}

function draw() {
  background(255)
  player.update()
}

class Player{
  constructor(x, y, w, h, r, sx, sy){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
    this.sx = sx;
    this.sy = sy;
  }

  draw() {
    image(img, this.x, this.y, this.w, this.h);
  }

  update() {
    this.move()
    this.draw()
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
}
