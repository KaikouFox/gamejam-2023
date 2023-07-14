let player;
let balk;
let img;
var col = 255;
let temple;

function preload() {
  img = loadImage('player.jpg');
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  player = new Player(innerWidth/2-150, innerHeight/2-197, 300/20, 394/20, 10, 2, 2);
  balk = new TimeBalk(innerWidth/16, 20, innerWidth-innerWidth/8, 50, 1, 0.1, 1.0001);
  temple = new Temple()
  frameRate(60);
}

function draw() {
  background(255)
  temple.draw()
  player.update()
  balk.update()
}

function collision(obj1,obj2) {
  return obj1.x < obj2.x + obj2.w &&
    obj1.x + obj1.w > obj2.x &&
    obj1.y < obj2.y + obj2.h &&
    obj1.y + obj1.h > obj2.y
}

class Player{
  constructor(x, y, w, h, sx, sy){
    this.inv = {
      "wood": 0,
      "stone": 0,
      "animal skin": 0,
      "hay": 0,
      "blood": 0,
    };
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

  update() {
    if (balk.w-balk.x/2 > balk.ss) {this.move();}
    this.draw();
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
  itemCollect() {

  }
  doRitual() {
    if (keyIsDown(81)) {

    }
  }
  update() {
    this.move();
    this.draw();
    }
}

class TimeBalk {
  constructor(x, y, w, h, ss, s, a) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ss = ss;
    this.s = s;
    this.a = a;
  }

  update() {
    this.draw()
    if (this.s != 0) {this.changeSpeed()}
    this.checkForDeath();
  }

  draw() {
    fill(0)
    rect(this.x, this.y, this.w, this.h)
    fill(255,0,0)
    rect(this.x/4 + this.x, this.y+this.y/2, this.w-this.x/2-this.ss, this.h-this.y)
  }

  changeSpeed() {
    this.ss = this.ss + this.s;
  }

  accelerate() {
    this.s += this.s * this.a;
  }

  checkForDeath() {
    if (this.w-this.x/2 <= this.ss) {
      this.ss = this.w-this.x/2
    }
  }
}

class Item {
  constructor(type,x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
  }
}

class Temple {
  constructor() {
    this.x = innerWidth/2-50;
    this.y = innerHeight/2-50;
    this.w = 100;
    this.h = 100;
  }

  draw() {
    noFill()
    rect(this.x, this.y, this.w, this.h)
  }
}
