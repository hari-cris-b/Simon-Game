// 3. At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red", "blue", "green", "yellow"];

// 5. At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];

var userClickedPattern = [];

// 1. Inside game.js create a new function called nextSequence()
var gameStarted = false;
var level = 0;

$(document).ready(function () {
  // $("h1").text("Press A Key to Start");

  function blink_text() {
    $(".blink").fadeOut(500);
    $(".blink").fadeIn(500);
  }
  setInterval(blink_text, 1000);

  $(document).on("keypress touchstart",function () {
    if (!gameStarted) {
      $("#level-title").text("Simon Say");
      $(".lvl").text(level);
      nextSequence();
      gameStarted = true;
    }
  });
});

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Simon");
  $(".lvl").text(level).removeClass("blink");
  // 2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);

  // 4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];

  // 6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .animate({ opacity: 0.1 }, 100)
    .animate({ opacity: 1 }, 100)
    .animate({ opacity: 0.1 }, 100)
    .animate({ opacity: 1 }, 100);

  playSound(randomChosenColour);

  // console.log(gamePattern);
}

//User Button Click
$(".btn").on("click", function () {
  // $("h1").hide();
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  // Use setTimeout to remove the class after 100 milliseconds
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
    // console.log("Success");
    // console.log(userClickedPattern[currentLevel]);
    // console.log(gamePattern[currentLevel]);
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html(
      "<span style='color: red;'>Game Over!</span><br/> Press Any Key to <span style='color: aqua;'>Restart.</span>"
    );

    $(".lvl").addClass("blink").text(level);

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Restart the game
    startOver();
  }
}

// Function to restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
