let player;
let balk;
let img;
let img2;
let templeImg
var col = 255;
var item;
var items = [];
var itemTypes = ["wood","stone","animal_skin","hay","blood","plant","water","fles"];
let temple;
var bos = [];
var time = [];

function preload() {
  console.log(innerWidth)
  console.log(innerHeight)
  img = loadImage('player.png');
  templeImg = loadImage('temple.png')
  wood = loadImage('wood.png');
  stone = loadImage('granite.png')
  animal_skin = loadImage('leather.png');
  hay = loadImage('hay.png');
  blood = loadImage('blood.png');
  plant = loadImage('plant.png');
  water = loadImage('water.png');
  fles  = loadImage('wine.png');
  boom = loadImage('boom.png')
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  player = new Player(innerWidth/2-150, innerHeight/2-197, 32/1.5, 32/1.5, 2, 2);
  balk = new TimeBalk(innerWidth/16, 20, innerWidth-innerWidth/8, 50, 1, 0.25, 1.0001);
  temple = new Temple()
  frameRate(60);
  setInterval(Spawn_random_items,random(1000,2000));
  setInterval(timer)
  for (i=0;i<9;i++) {
    oak = new Boom(Math.floor(Math.random()*innerWidth),Math.floor(Math.random()*innerHeight)+50)
    bos.push(oak);
  }
}

function timer() {
  time++;
  return time;
}

function draw() {
  background(255)
  temple.draw()
  player.update()
  balk.update()
  for (var i = 0; i < items.length; i++){
    item = items[i];
    item.update()
  }
  for (i=0;i<9;i++) {
    oak=bos[i];
    oak.draw();
  }
}

function collision(obj1,obj2) {
  return obj1.x < obj2.x + obj2.w &&
    obj1.x + obj1.w > obj2.x &&
    obj1.y < obj2.y + obj2.h &&
    obj1.y + obj1.h > obj2.y
}
function Spawn_random_items(){
    item = new Item(itemTypes[Math.floor(Math.random()*7)],Math.floor(Math.random()*innerWidth),Math.floor(Math.random()*innerHeight)+50);
    items.push(item);
  }

function ritual(items, add) {
  items = items.split("-");
  for (i = 0; i < items.length; i++) {
    player.inv[items[i]] -= 1
    console.log(player.inv)
  }
  if (balk.ss < 0) {
    balk.ss = 0
  } else {
    balk.ss -= add;
  }
}

function keyReleased() {
  if (key == "p" && collision(player, temple) && player.inv["plant"] > 0 && player.inv["water"] > 0 && player.inv["fles"]) {
    ritual("plant-water", 30)
  } else if (key == "k" && collision(player, temple) && player.inv["animal_skin"] > 0 && player.inv["blood"] > 0) {
    ritual("animal_skin-blood", 50)
  } else if (key == "l" && collision(player, temple) && player.inv["wood"] > 0 && player.inv["stone"] > 0 && player.inv["blood"] > 0) {
    ritual("animal wood-stone-blood", 50)
  }  else if (key == "o" && collision(player, temple) && player.inv["wood"] > 0 && player.inv["animal_skin"] > 0 && player.inv[""]) {
    ritual("animal skin-blood", 50)
  } else if (key == "i" && collision(player, temple) && player.inv["wood"] > 0 && player.inv["stone"] > 2) {
    ritual("animal skin-blood", 50)
  }
  return false;
}

class Player{
  constructor(x, y, w, h, sx, sy){
    this.inv = {
      "wood": 0,
      "stone": 0,
      "animal_skin": 0,
      "hay":  0,
      "blood": 0,
      "plant": 0,
      "water": 0,
      "fles": true,
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
    if (ui == true) {
    let keys = Object.keys(this.inv);
    textSize(32);
    fill(0);
    for (var i = 0; i < 8; i++) {
      var t = keys[i]+": "+this.inv[keys[i]]
      text(t.toString(), 10, 100 + i * 32)
    }
    text("Rituals:", 10, 100 + 32 * 9)
    text("Give drink: water + plant Key: p", 10, 100 + 32 * 10)
    text("Give dead animals: skin + blood Key: k", 10, 100 + 32 * 11)
    text("Give totem: wood + stone + blood Key: l", 10, 100 + 32 * 12)
    text("Give doll: wood + skin + hay Key: o", 10, 100 + 32 * 13)
    text("Make fire: wood + stone (at least 3) Key: i", 10, 100 + 32 * 14)
  }
  }

  update() {
    if (balk.w-balk.x/2 > balk.ss) {this.move();}
    this.draw();
  }

  move() {
    if (keyIsDown(65) && this.x > 0) {
      this.x -= this.sx;
      console.log(this.x)
    }

    if (keyIsDown(68) && this.x < innerWidth) {
      this.x += this.sx;
      console.log(this.x)
    }

    if (keyIsDown(87) && this.y > 0) {
      this.y -= this.sy;
      console.log(this.y)
    }

    if (keyIsDown(83) && this.y < innerHeight) {
      this.y += this.sy;
      console.log(this.y)
    }
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
      textSize(128);
      fill(255, 0, 0);
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      text("You DIED", innerWidth/2, innerHeight/2);
    }
  }
}

class Item {
  constructor(type,x, y) {
    this.type = type;
    if (type=="wood") {
      this.ap = wood;
    }
    else if (type=="stone") {
      this.ap = stone;
    }
    else if (type=="animal_skin") {
      this.ap = animal_skin;
    }
    else if (type=="hay") {
      this.ap = hay;
    }
    else if (type=="blood") {
      this.ap = blood;
    }
    else if (type=="plant") {
      this.ap = plant;
    }
    else if (type=="water") {
      this.ap = water;
    }
    else if (type=="fles") {
      this.ap = fles;
    }
    this.x = x;
    this.y = y;
    this.w = 512/20;
    this.h = 512/20;
  }

  draw() {
    image(this.ap, this.x, this.y, this.w, this.h);
  }
  itemCollect() {
      if (collision(player,item)){
        for (var i = 0; i < items.length; i++){
          item = items[i];
          if (item.x == this.x && item.y == this.y){
            player.inv[item.type]++;
            items.splice(i, 1)
            console.log(player.inv);
        }
      }
    }
  }
  update() {
    this.draw()
    this.itemCollect()
  }
}

class Temple {
  constructor() {
    this.x = innerWidth/2-50;
    this.y = innerHeight/2-50;
    this.w = 100;
    this.h = 84.375;
  }

  draw() {
    noFill()
    image(templeImg, this.x, this.y, this.w, this.h);
  }
}

class Boom {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.w = 512/10;
    this.h = 512/10;
  }
  draw() {
    image(boom, this.x, this.y, this.w, this.h);
  }
}
