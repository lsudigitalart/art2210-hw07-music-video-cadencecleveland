
let song;
let amp;
let started = false;
let startTime = 0;

const CLIP_DURATION_SEC = 8;   
const CLIP_START_SEC = 0;      

function preload() {
  song = loadSound("assets/song.mp3");
}

function setup() {
  createCanvas(800, 450);
  noStroke();
  textAlign(CENTER, CENTER);
  amp = new p5.Amplitude(); 
}

function draw() {
  if (!started) {
    background(0);
  
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Click to run", width / 2, height / 2 - 20);
    text("Volume on", width / 2, height / 2 + 20);
    return;
  }


  let level = amp.getLevel();


  let bg = map(level, 0, 0.3, 10, 70);
  background(bg);


  let size = map(level, 0, 0.3, 60, 360);
  fill(255, 160, 190);
  circle(width/2, height/2, size);


  let t = millis() * 0.002; // time
  let r = map(level, 0, 0.3, 80, 220);
  let x = width/2 + cos(t) * r;
  let y = height/2 + sin(t) * r;
  fill(180, 220, 255);
  circle(x, y, 16);


  let elapsed = (millis() - startTime) / 1000;
  if (elapsed >= CLIP_DURATION_SEC) {
    song.stop();
    noLoop();
    background(0);
    fill(255);

  }

}

function mousePressed() {
  if (!started && song && song.isLoaded()) {
    userStartAudio();        
    amp.setInput(song);      
    
    song.play(0, 1, 1, CLIP_START_SEC, CLIP_DURATION_SEC);
    started = true;
    startTime = millis();
  }
}
