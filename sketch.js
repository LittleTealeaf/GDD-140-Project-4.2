/// <reference path="./libraries/p5.global-mode.d.ts" />

//How many times it'll split each iteration
const split = 2;
//The minimum size (to prevent it from going infinitely)
const min_size = 1;

function setup() {
  //Create canvas as large as screen
  createCanvas(windowWidth - 20, windowHeight - 20);
  noStroke();
}

function draw() {
  background(0);
  //Renders the whole screen as one spot
  renderRegion(width / 2, height / 2, width, height);
  //Prevents loop
  noLoop();
  
}

function renderRegion(x, y, w, h) {
  //As long as w and h are above minimum size
  if (w > min_size && h > min_size) {
    //top right position
    var x_tr = x - w / 2;
    var y_tr = y - h / 2;
    //the new width and height for inner areas
    var w_n = w / split;
    var h_n = h / split;

    //Cycle through each of the four quadrants
    for (var ix = 0; ix < split; ix++) {
      for (var iy = 0; iy < split; iy++) {
        //Center location of individual rectangles
        var x_t = x_tr + ix * w_n + w_n / 2;
        var y_t = y_tr + iy * h_n + h_n / 2;
        

        /*
        If the distance to the center is less than the diagonal length of the area
        I have absolutely no idea how I came up with this, I was experimenting and it looked cool
        I think it basically says "if the center is within the area or something"
        */
        if(dist(x_t,y_t,width/2,height/2) < dist(0,0,w,h)) {
          //Recursively call the inner area
          renderRegion(x_tr + ix * w_n + w_n / 2,y_tr + iy * h_n + h_n / 2,w_n,h_n);
        } else {
          //Just render the object itself
          renderObject(x_t,y_t,w_n,h_n);
        }
      }
    }
  } else {
    //Render the object here if it's at the minimum size
    renderObject(x,y,w,h);
  }
}

/**
 * Renders a single object, or circle
 * @param {number} x x location
 * @param {number} y y location
 * @param {number} w width
 * @param {number} h height
 */
function renderObject(x,y,w,h) {
  /*
  Number of iterations, or "ellipses" we will render to create the shiny effect
  hard capped at the width or height
  */
  const iterations = Math.min(Math.max(w,h),1000);
  for(var i = iterations; i > 0; i--) {
    //Fill so that the outer iterations are darker and the inner iterations are lighter
    fill((0.1 + 1 * (1 - i / iterations)) * 255);

    //Render the ellipse with the varied width and height
    ellipse(x,y,w * i / iterations, h * i / iterations);
  }
}