const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
const WORD_LIST = ["სახლი", "ტყავი", "ქარი", "წყალი", "გზაში", "მზეები", "ტყეში", "ნავი", "მარცი", "ქვიში"];
let targetWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
let attempts = 0;

let authMode = "login";

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
        alert("გილოცავ! სიტყვა ცორედ გამოიცანი.");
    } else if (attempts >= MAX_ATTEMPTS) {
        alert("\u10d7\u10d0\u10db\u10d0\u10e8\u10d8 \u10ec\u10d0\u10d0\u10d2\u10d4! \u10e1\u10d0\u10e5\u10db\u10d8 \u10e1\u10d8\u10e2\u10e7\u10d5\u10d0 \u10d8\u10e7\u10dd: " + targetWord);
    }
}

function toggleAuthMode() {
    authMode = authMode === "login" ? "signup" : "login";
    document.getElementById("auth-title").textContent = authMode === "login" ? "Login" : "Sign Up";
    document.getElementById("auth-button").textContent = authMode === "login" ? "Login" : "Sign up";
    document.getElementById("auth-toggle-text").innerHTML = authMode === "login"
        ? `Don't have an account? <a href="#" onclick="toggleAuthMode()">Sign up</a>`
        : `Already have an account? <a href="#" onclick="toggleAuthMode()">Login</a>`;
}

function handleAuth(event) {
    event.preventDefault();

    const username = document.getElementById("auth-username").value.trim();
    const email = document.getElementById("auth-email").value.trim();
    const password = document.getElementById("auth-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (authMode === "signup") {
        const userExists = users.some(u => u.username === username || u.email === email);
        if (userExists) {
            alert("User already exists!");
            return false;
        }

        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", username);
        alert(`Welcome ${username}! You're registered and logged in.`);
    } else {
        const user = users.find(u => u.username === username && u.email === email && u.password === password);
        if (!user) {
            alert("Incorrect credentials.");
            return false;
        }
        localStorage.setItem("currentUser", username);
        alert(`Welcome back, ${username}!");
    }

    document.getElementById("auth-form").reset();
    document.getElementById("auth-section").style.display = "none";
    return false;
}

function checkLogin() {
    const user = localStorage.getItem("currentUser");
    if (user) {
        document.getElementById("auth-section").style.display = "none";
        console.log("Welcome back,", user);
    } else {
        document.getElementById("auth-section").style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    createBoard();
    checkLogin();
});

