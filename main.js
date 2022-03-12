scoreRightWrist = 0;
scoreLeftWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

song1 = "";
song2 = "";

song1_status = "";
song2_status = "";

function preload() {
  song1 = loadSound("music.mp3");
  song2 = loadSound("Magic! - Rude.mp3");
}

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  posenet = ml5.poseNet(video, modleLoaded);
  posenet.on("pose", gotPoses);
}

function draw() {
  image(video, 0, 0, 600, 500);
  song1_status = song1.isPlaying();
  song2_status = song2.isPlaying();
  fill("red");
  stroke("red");

  if (scoreLeftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);
    song1.stop();
    if (song2_status == false) {
      song2.play();
      document.getElementById("song").innerHTML = "playing - magic-rude";
    }
  }

  if (scoreRightWrist > 0.2) {
    circle(rightWristX, rightWristY, 20);
    song2.stop();
    if (song1_status == false) {
      song1.play();
      document.getElementById("song").innerHTML =
        "playing - harry potter theme song";
    }
  }
}

function modleLoaded() {
  console.log("it works");
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist = " + scoreLeftWrist);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log("scoreRightWrist = " + scoreRightWrist);
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log(
      "rightWristX = " + rightWristX + " rightWristY = " + rightWristY
    );
  }
}

function play() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}
