const hitButton = document.getElementById("strike");
const RestartButton = document.getElementById("reset");
const $team1ScoreDisplay = document.getElementById("score-team1");
const $team1WicketsDisplay = document.getElementById("wickets-team1");
const $team2ScoreDisplay = document.getElementById("score-team2");
const $team2WicketsDisplay = document.getElementById("wickets-team2");
const hitAudio = new Audio("http://bit.ly/so-ball-hit");
const gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer");
var team1Runs = 0;
var team1Wickets = 0;
var team2Runs = 0;
var team2Wickets = 0;
var Ballsfaced1 = 0;
var Ballsfaced2 = 0;
var turn = 1;
const Outcomes = [1, 2, 3, 4, 5, 6, "W"];

function gameOver() {
    gameOverAudio.play();
    if (team1Runs > team2Runs) alert("IND Wins");
    if (team2Runs > team1Runs) alert("PAK Wins");
    if (team1Runs === team2Runs) alert("It is another superover!");
}

function updateScore() {
    $team1ScoreDisplay.textContent = team1Runs;
    $team2ScoreDisplay.textContent = team2Runs;
    $team1WicketsDisplay.textContent = team1Wickets;
    $team2WicketsDisplay.textContent = team2Wickets;
}

RestartButton.onclick = () => {
    window.location.reload();
}

hitButton.onclick = () => {
    hitAudio.pause();
    hitAudio.currentTime = 0;
    hitAudio.play();

    const Events = Outcomes[Math.floor(Math.random() * Outcomes.length)];

    if (turn === 2) {
        Ballsfaced2++;
        document.querySelector(
            `#team2-superover div:nth-child(${Ballsfaced2})`
        ).textContent = Events;
        if (Events === "W") {
            team2Wickets++;
        } else {
            team2Runs += Events;
        }
        if (
            Ballsfaced2 === 6 ||
            team2Wickets === 2 ||
            team2Runs > team1Runs
        ) {
            turn = 3;
            gameOver();
        }
    }
    if (turn === 1) {
        Ballsfaced1++;
        document.querySelector(
            `#team1-superover div:nth-child(${Ballsfaced1})`
        ).textContent = Events;
        if (Events === "W") {
            team1Wickets++;
        } else {
            team1Runs += Events;
        }
        if (Ballsfaced1 === 6 || team1Wickets === 2) turn = 2;
    }
    updateScore();
}
