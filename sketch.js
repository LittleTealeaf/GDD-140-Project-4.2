/// <reference path="./libraries/p5.global-mode.d.ts" />

const split = 5;
const base_chance = 0.8;
const chance_degredation = 0.5;
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
          renderObject(x_t,y_t,w_n,h_n);
        }
      }
    }
  } else {
    fillColor(x,y);
    renderObject(x,y,w,h);
  }
}

function renderObject(x,y,w,h) {
  const iterations = Math.min(Math.max(w,h),1000);
  const r = sin(x + y + w + h) * 255;
  const g = sin(r + x + y + w + h) * 255;
  const b = sin(r + g + x + y + w + h) * 255;
  for(var i = iterations; i > 0; i--) {
    var scale = 0.1 + 1 * (1 - i / iterations);
    // fill(scale * (sin(x * y) * 255), scale * (cos(x * y) * 255), scale * (sin(x * y) * cos(x * y) * 255));
    fill(r * scale,g * scale,b * scale);
    ellipse(x,y,w * i / iterations, h * i / iterations);
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