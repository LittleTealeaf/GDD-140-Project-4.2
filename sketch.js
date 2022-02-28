/// <reference path="./libraries/p5.global-mode.d.ts" />

const split = 3;
const base_chance = 1;
const chance_degredation = 0.3;
const min_size = 7;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background(0);
  renderRegion(width / 2, height / 2, width, height,base_chance);
  noLoop();
}

function renderRegion(x, y, w, h, chance) {
  if (w > min_size && h > min_size) {
    //top right position
    var x_tr = x - w / 2;
    var y_tr = y - h / 2;
    //the new width and height for inner areas
    var w_n = w / split;
    var h_n = h / split;

    for (var ix = 0; ix < split; ix++) {
      for (var iy = 0; iy < split; iy++) {
        //Center location of individual rectangles
        var x_t = x_tr + ix * w_n + w_n / 2;
        var y_t = y_tr + iy * h_n + h_n / 2;
        if(sin(x_t * y_t * x * y * w * h * chance) < chance) {
          renderRegion(x_tr + ix * w_n + w_n / 2,y_tr + iy * h_n + h_n / 2,w_n,h_n,chance * chance_degredation);
        } else {
          fillColor(x_t,y_t);
          renderRectangle(x_t,y_t,w_n,h_n);
        }
      }
    }
  } else {
    fillColor(x,y);
    renderRectangle(x,y,w,h);
  }
}

function renderRectangle(x,y,w,h) {
  const iterations = Math.min(Math.max(w,h),100);
  for(var i = iterations; i > 0; i--) {
    var scale = Math.log(iterations / i)%1;
    fill(scale * ((x + y) % 255), scale * ((x * y)%255), scale * ((255 * y / x + 255 * x / y)%255));
    rect(x,y,w * i / iterations, h * i / iterations)
  }
}

function fillColor(x, y) {
  fill(sin(x + y) * 255,cos(x + y) * 255,tan(x + y) * 255);
}

/**
 * Scales a value between 0 and 1
 * @param {number} n 
 */
function sigmoid(n) {
  return 1 / (1 + 2.3**(-n))
}