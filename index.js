// GLOBALS
let p1Score = 0;
let p2Score = 0;
let p1Selection = "";
let p2Selection = "";
let currentRound = 0;
const maxPoints = 5;

const shape = {
    ROCK: "rock",
    PAPER: "paper",
    SCISSOR: "scissor",
};

const result = {
    LOSE: -1,
    TIE: 0,
    WIN: 1,
};

const outcomes = {
    "rock": {
        "rock": result.TIE,
        "paper": result.LOSE,
        "scissor": result.WIN
    },
    "paper": {
        "rock": result.WIN,
        "paper": result.TIE,
        "scissor": result.LOSE
    },
    "scissor": {
        "rock": result.LOSE,
        "paper": result.WIN,
        "scissor": result.TIE
    },
};

// Helpers
const getRandomShape = () => {
    const keys = Object.keys(shapes);
    return shapes[keys[keys.length * Math.random() << 0]];
};

// Game functions

const resetGame = () => {
    p1Score = 0;
    p2Score = 0;
    currentRound = 0;

    player1Score.textContent = p1Score;
    player2Score.textContent = p2Score;
    round.textContent = currentRound;

    resultRound.textContent = "";
    resultRound.classList.remove("result__round--hide");
    resultFinal.classList.add("result__final--hide");
};

const isGameOver = () => {
    return (p1Score == maxPoints || p2Score == maxPoints) ? true : false;
};

const showRoundResults = (outcome) => {
    resultRound.classList.remove("result__round--hide");
    let statement = "";
    switch (outcome) {
        case result.LOSE:
            statement = `${p1Selection} loses to ${p2Selection}`;
            break;
        case result.TIE:
            statement = `${p1Selection} ties with ${p2Selection}`;
            break;
        case result.WIN:
            statement = `${p1Selection} wins against ${p2Selection}`;
            break;
    };
    resultRound.textContent = statement;
};

const showFinalResults = () => {
    resultRound.classList.add("result__round--hide");
    resultFinal.classList.remove("result__final--hide");
    resultFinal.textContent = "Game complete!";
};

const updateRound = () => {
    currentRound += 1;
    round.textContent = currentRound;
};

const updateScores = (outcome) => {
    switch (outcome) {
        case result.LOSE:
            p2Score += 1;
            break;
        case result.WIN:
            p1Score += 1;
            break;
        case result.TIE:
        default:
            break;
    };

    // Update HTML score elements
    player1Score.textContent = p1Score;
    player2Score.textContent = p2Score;
};

const getOutcome = (playerSelection, computerSelection) => {
    return outcomes[playerSelection][computerSelection];
};

const getPlayer1Selection = (option) => {
    if (Object.values(shape).indexOf(option) > -1) {
        p1Selection = option;
        return option;
    };
};

const getPlayer2Selection = () => {
    let keys = Object.keys(shape);
    let option = shape[keys[keys.length * Math.random() << 0]];
    p2Selection = option;
    return option;
};

const playRoundHandler = (event) => {
    let option = event.target.id;
    if (!option) return;

    updateRound();

    let playerSelection = getPlayer1Selection(option);
    let computerSelection = getPlayer2Selection();

    let outcome = getOutcome(playerSelection, computerSelection);
    showRoundResults(outcome);
    updateScores(outcome);

    if (isGameOver()) {
        showFinalResults();
        return;
    }
};

const round = document.querySelector(".round__number");
const player1Score = document.querySelector(".score__player-1");
const player2Score = document.querySelector(".score__player-2");
const resultRound = document.querySelector(".result__round");
const resultFinal = document.querySelector(".result__final");
const shapes = document.querySelectorAll(".shape__button");
const gameReplayBtn = document.querySelector(".game__replay-btn");

gameReplayBtn.addEventListener("click", resetGame);
shapes.forEach((shape) => shape.addEventListener("click", playRoundHandler));