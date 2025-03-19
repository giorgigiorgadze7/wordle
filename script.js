const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
const WORD_LIST = ["სახლი", "ტყავი", "ქარი", "წყალი", "გზაში", "მზეები", "ტყეში", "ნავი", "მარცი", "ქვიში"];
let targetWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
let attempts = 0;

document.addEventListener("DOMContentLoaded", () => {
    createBoard();
});

function createBoard() {
    const board = document.getElementById("game-board");
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        for (let j = 0; j < WORD_LENGTH; j++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.id = `tile-${i}-${j}`;
            board.appendChild(tile);
        }
    }
}

function submitGuess() {
    let guess = document.getElementById("guess-input").value.trim();
    if (guess.length !== WORD_LENGTH || !WORD_LIST.includes(guess)) {
        alert("Invalid word. Please enter a 5-letter Georgian word.");
        return;
    }

    for (let i = 0; i < WORD_LENGTH; i++) {
        let tile = document.getElementById(`tile-${attempts}-${i}`);
        tile.textContent = guess[i];

        if (guess[i] === targetWord[i]) {
            tile.classList.add("correct");
        } else if (targetWord.includes(guess[i])) {
            tile.classList.add("present");
        } else {
            tile.classList.add("absent");
        }
    }

    attempts++;
    document.getElementById("guess-input").value = "";

    if (guess === targetWord) {
        alert("გილოცავ! სიტყვა სწორედ გამოიცანი.");
    } else if (attempts >= MAX_ATTEMPTS) {
        alert("თამაში წააგე! სწორი სიტყვა იყო: " + targetWord);
    }
}
