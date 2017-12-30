// cube

// import math

// springs-triangle-code.js -- springs as code

var myParticles = [];
var basePoints = 4
var numSets = 4
var lastParticleGrabbed = 0
var margin = 20
var webScale = 1
var dotScale = 1/.8
var xOffSet = 200
// var gridSize = 4

var springConstant = 0.1;
var restLength = 100;
var color1 = [110, 16, 250]
// The index in the particle array, of the one the user has clicked.
var whichParticleIsGrabbed = -1;

//-------------------------
function setup() {
    createCanvas(800, 300);
    createParticles(); 
}

//-------------------------
function createParticles(){
    for(i = 0; i < basePoints *2; i ++){
        if(i < basePoints){
            var newParticle = new Particle("basePoint"); 
        }else{
           var newParticle = new Particle("edgePoint");  
        }
    

        if(i == 0){
            newParticle.set(200 + xOffSet, 250);
        }else if(i == 1){
            newParticle.set(150 + xOffSet, 200);
        }else if(i == 2){
            newParticle.set(150 + xOffSet, 150);
        }else if(i == 3){
            newParticle.set(200 + xOffSet, 150);
        }else if(i == 4){
            newParticle.set(150 + xOffSet, 200);
        }else if(i == 5){
            newParticle.set(50 + xOffSet, 200);
        }else if(i == 6){
            newParticle.set(50 + xOffSet, 150);
        }else if(i == 7){
            newParticle.set(150 + xOffSet, 150);
        }

        // newParticle.set((50*i + 200),(50*i + 100));
    
      newParticle.bHardBoundaries = true;  
    
      myParticles.push(newParticle);

    }

}


function mousePressed() {
    // If the mouse is pressed, 
    // find the closest particle, and store its index.
    whichParticleIsGrabbed = -1;
    var maxDist = 9999;
    for (var i=0; i<myParticles.length; i++) {
        var dx = mouseX - myParticles[i].px;
        var dy = mouseY - myParticles[i].py;
        var dh = sqrt(dx*dx + dy*dy);
        if (dh < maxDist) {
            maxDist = dh;
            whichParticleIsGrabbed = i;
            lastParticleGrabbed = i;
        }
    }
}
 
 
function draw() {
    background (255);
    // box(200, 200, 200);
 
    for (var i=0; i<myParticles.length; i++) {
        myParticles[i].addForce(0, 0.1); // gravity!
        myParticles[i].update(); // update all locations
    }
 
    if (mouseIsPressed && (whichParticleIsGrabbed > -1)) {
        // If the user is grabbing a particle, peg it to the mouse.
        myParticles[whichParticleIsGrabbed].px = mouseX;
        myParticles[whichParticleIsGrabbed].py = mouseY;
    }
    
    // Springs and their forces are represented here by the code
    // itself.
    // Advantage: You can read exactly what computation is done.
    // Disadvantage: Irregular forces and connections could require
    //    a lot of special cases in the code.
 
    // Spring connections are from every p[i] to p[(i+1) % n]

    fill(color1[0], color1[1], color1[2], 100)
    strokeWeight(0)

    makeRect(2, 3, 7, 1);

    makeTriangle(7, 1, 4)

    makeRect(6, 7, 4, 5);
  
    fill(color1[0], color1[1], color1[2], 50)
  
    makeRect(7, 3, 0, 4)
  
    makeRect(7, 1, 2, 6)
  
    

    for (var i = 0; i < basePoints; i++) {
        var a = myParticles[i];
        var b = myParticles[(i + 1) % basePoints];
        var c = myParticles[i + basePoints];

        fill(255);
        strokeWeight(1)

        springCalculateDraw(a, b, 1);

        springCalculateDraw(a, c, 1);

    }



    for(var i = basePoints; i < basePoints +3; i ++){
        var a = myParticles[i];
        var b = myParticles[(i + 1)];
        var c = myParticles[i - basePoints + 1]
        springCalculateDraw(a, b, 1);

        // springCalculateDraw(a, c, 1/sqrt(2));
    }




    springCalculateDraw(myParticles[0], myParticles[2], 1/sqrt(2));

    springCalculateDraw(myParticles[4], myParticles[3], 1/sqrt(2));
    // springCalculateDraw(myParticles[5], myParticles[7], 1/sqrt(2));

    springCalculateDraw(myParticles[6], myParticles[4], 1/sqrt(2));
    // springCalculateDraw(myParticles[3], myParticles[4], 1/sqrt(2));
    springCalculateDraw(myParticles[2], myParticles[5], 1/sqrt(2));
    // springCalculateDraw(myParticles[5], myParticles[2], 1/sqrt(2));

    springCalculateDraw(myParticles[7], myParticles[2], 2.5);

    springCalculateDraw(myParticles[4], myParticles[1], 2.5);

    springCalculateDraw(myParticles[6], myParticles[3], .8);
    springCalculateDraw(myParticles[5], myParticles[0], .8);

    springCalculateDraw(myParticles[6], myParticles[0], .6);
    springCalculateDraw(myParticles[5], myParticles[3], .6);

    // springCalculateDraw(myParticles[1], myParticles[7], .8);
    // springCalculateDraw(myParticles[2], myParticles[4], .8);
   

    springCalculateDraw(myParticles[7], myParticles[4], 1);



    for (var i=0; i<myParticles.length; i++) {
        myParticles[i].render(i); // render all particles
    }
    
    fill(255); 
    noStroke(); 
    // text("Grab a point", 5,20); 

    strokeWeight(1);
    // fill(250, 255, 255, 75)
    // stroke(255)

}

function makeRect(a, b, c, d){
    beginShape();
    vertex(myParticles[a].px, myParticles[a].py) 
    vertex(myParticles[b].px, myParticles[b].py)
    vertex(myParticles[c].px, myParticles[c].py)
    vertex(myParticles[d].px, myParticles[d].py)
    endShape(CLOSE);   
}

function makeTriangle(a, b, c){
    beginShape();
    vertex(myParticles[a].px, myParticles[a].py) 
    vertex(myParticles[b].px, myParticles[b].py)
    vertex(myParticles[c].px, myParticles[c].py)
    endShape(CLOSE);   
}


function springCalculateDraw(p, q, factor) {
    var dx = p.px - q.px;
    var dy = p.py - q.py;
    var dh = factor * sqrt(dx * dx + dy * dy) * webScale;
    if (dh > 1) {
        var distention = dh - restLength;
        var restorativeForce = springConstant * distention; // F = -kx
        var fx = (dx / dh) * restorativeForce;
        var fy = (dy / dh) * restorativeForce;
        p.addForce(-fx, -fy);
        q.addForce(fx, fy);
    }
    // now draw the spring
    // if(getDistance(p.px, q.px, p.py, q.py) > 100 &&
    //     p.isEdgePoint == false &&
    //     q.isEdgePoint == false){
    //     stroke(255, 255, 255, 100);  
    // }else{

    strokeWeight(1)
    if((p == myParticles[5] || q == myParticles[5])
      && (p == myParticles[1] || q == myParticles[1])){
       stroke(255, 255, 255, 0);
       }else if(factor == 1){
        stroke(color1[0], color1[1], color1[2])
    }else{
        stroke(255, 255, 255, 0)
    }
    // }
    line(p.px, p.py, q.px, q.py);
}

function getDistance(x1, x2, y1, y2){
    return sqrt((x2-x1)**2 + (y2-y1)**2)
}


//==========================================================
var Particle = function Particle(status) {
    this.px = 0;
    this.py = 0;
    this.vx = 0;
    this.vy = 0;
    this.mass = 1.0;
    this.damping = 0.96;
    
    this.bFixed = false;
    this.bLimitVelocities = true;
    this.bPeriodicBoundaries = true;
    this.bHardBoundaries = false;
    if(status == 'basePoint'){
        this.isEdgePoint = false
    }else{
        this.isEdgePoint = true
    }
    
    
    // Initializer for the Particle
    this.set = function(x, y) {
        this.px = x;
        this.py = y;
        this.vx = 0;
        this.vy = 0;
        this.damping = 0.96;
        this.mass = 1.0;
    };

    // Add a force in. One step of Euler integration.
    this.addForce = function(fx, fy) {
        var ax = fx / this.mass;
        var ay = fy / this.mass;
        this.vx += ax;
        this.vy += ay;
    };

    // Update the position. Another step of Euler integration.
    this.update = function() {
        if (this.bFixed === false){
            this.vx *= this.damping;
            this.vy *= this.damping;
    
            this.limitVelocities();
            this.handleBoundaries();
            this.px += this.vx;
            this.py += this.vy;
        }
    };

    this.limitVelocities = function() {
        if (this.bLimitVelocities) {
            var speed = sqrt(this.vx * this.vx + this.vy * this.vy);
            var maxSpeed = 10;
            if (speed > maxSpeed) {
                this.vx *= maxSpeed / speed;
                this.vy *= maxSpeed / speed;
            }
        }
    };


    this.handleBoundaries = function() {
        if (this.bPeriodicBoundaries) {
            if (this.px > width - margin) this.px = width - margin;
            if (this.px < 0) this.px =0;
            if (this.py > (height - margin)) this.py = (height - margin)
            if (this.py < 0) this.py = 0;
        } else if (this.bHardBoundaries) {
            if (this.px >= width){
                this.vx = abs(this.vx)*-1;
            }
            if (this.px <= 0){
                this.vx = abs(this.vx);
            }
            if (this.py >= height){
                this.vy = abs(this.vy)*-1;
            }
            if (this.py <= 0){
                this.vy = abs(this.vy);
            }
        }
    };

    this.render = function(number) {
        fill(255);
        strokeWeight(1)
        stroke(color1[0], color1[1], color1[2])
      if(number != 1){
        ellipse(this.px, this.py, 10 * dotScale, 10 * dotScale);
      }
      // fill(0)
      // text(number, this.px, this.py);
    };
}