//SignUp
async function handleSignUp(event) {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const state = document.getElementById("state").value.trim();
    const country = document.getElementById("country").value.trim();
    const musicGenre = document.getElementById("musicGenre").value;
    const payment = document.getElementById("payment").value;
    const password = document.getElementById("password").value;

    if (!firstName || !lastName || !email || !state || !country || !musicGenre || !payment || !password) {
        showAlert("All fields are required.");
        return;
    }

    if (password.length < 6) {
        showAlert("Password must be at least 6 characters long.");
        return;
    }

    const userExists = users.some(user => user.email === email);
    if (userExists) {
        showAlert("Email already exists. Please log in.");
        return;
    }

    const hashedPassword = await hashPassword(password);
    users.push({ firstName, lastName, email, state, country, musicGenre, payment, password: hashedPassword });
    localStorage.setItem('users', JSON.stringify(users));
    showAlert("Sign-up successful! Redirecting to login...", "success");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
}

// Global Variables
const users = JSON.parse(localStorage.getItem('users')) || [];

// Utility Functions
function showAlert(message, type = "error") {
    alert(`${type.toUpperCase()}: ${message}`);
}

// Signup Logic
function handleSignUp(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        showAlert("All fields are required.");
        return;
    }

    if (password.length < 6) {
        showAlert("Password must be at least 6 characters long.");
        return;
    }

    const userExists = users.some(user => user.email === email);
    if (userExists) {
        showAlert("Email already exists. Please log in.");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    showAlert("Sign-up successful! Redirecting to login...", "success");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
}

// Login Logic
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        showAlert("Invalid email or password.");
        return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));
    showAlert("Login successful! Redirecting to dashboard...", "success");

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1000);
}

// Dashboard Greeting
function loadDashboard() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("greeting").innerText = `Welcome, ${user.name}!`;
}

// Logout Logic
function handleLogout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = "login.html";
}

