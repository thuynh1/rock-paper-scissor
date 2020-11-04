let playerScore = 0
let computerScore = 0
let playerSelection = "";
let computerSelection = "";

const lose = -1;
const tie = 0;
const win = 1;
const maxRounds = 5;
const options = ["rock", "paper", "scissor"]
const outcome = {
    "rock": {"rock": tie, "paper": lose, "scissor": win},
    "paper": {"rock": win, "paper": tie, "scissor": lose},
    "scissor": {"rock": lose, "paper": win, "scissor": tie}
}

// Helper functions
function getRandomIntInclusive(min=0, max=2) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Computer functions
function computerSelect() {
    return options[getRandomIntInclusive()]
}

// Player functions
function playerSelect() {
    while (true) {
        let input = prompt("Enter (Rock, Paper, or Scissor): ")
        let normalizedInput = input.toLowerCase()
        if (normalizedInput == "rock" ||
            normalizedInput == "paper" ||
            normalizedInput == "scissor") {
            return normalizedInput
        } else {
            alert("Invalid option!")
        }
    }
}

function playRound(playerSelection, computerSelection) {
    return outcome[playerSelection][computerSelection]
}

function tally(result) {
    switch (result) {
        case lose:
            computerScore++
            break;
        case win:
            playerScore++
            break;
        case tie:
        default:
            break;
    }
}

function main() {
    for (let round = 1; round <= maxRounds; round++) {
        playerSelection = playerSelect()
        computerSelection = computerSelect()

        let result = playRound(playerSelection, computerSelection)
        tally(result)

        let message = ""
        switch (result) {
            case lose:
                message = `You Lose!, ${computerSelection} beats ${playerSelection}`
                break;
            case tie:
                message = `You Tied! Both players selected ${playerSelection}`
                break;
            case win:
                message = `You Win! ${playerSelection} beats ${computerSelection}`
        }
        alert(message);
    }
    alert(`FINAL SCORE\n\tPlayer: ${playerScore}\n\tComputer: ${computerScore}`)
}

main()
