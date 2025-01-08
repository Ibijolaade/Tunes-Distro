//SignUp
document.addEventListener("DOMContentLoaded", function () {
    // Handle sign-up form
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission

            // Get form values
            const firstName = document.getElementById("firstName").value.trim();
            const lastName = document.getElementById("lastName").value.trim();
            const email = document.getElementById("email").value.trim();
            const state = document.getElementById("state").value.trim();
            const country = document.getElementById("country").value.trim();
            const musicGenre = document.getElementById("musicGenre").value;
            const payment = document.getElementById("payment").value;
            const password = document.getElementById("password").value;

            // Validation
            if (!firstName || !lastName || !email || !state || !country || !musicGenre || !payment || !password) {
                alert("All fields are required.");
                return;
            }

            if (password.length < 6) {
                alert("Password must be at least 6 characters long.");
                return;
            }

            // Save user to localStorage
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                alert("Email already exists. Please log in.");
                return;
            }

            const newUser = { firstName, lastName, email, state, country, musicGenre, payment, password };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            alert("Sign-up successful! Redirecting to login...");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);
        });
    }

    // Handle login form
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission

            // Get form values
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            // Check if user exists
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(user => user.email === email && user.password === password);

            if (!user) {
                alert("Invalid email or password.");
                return;
            }

            // Save logged-in user to localStorage
            localStorage.setItem("loggedInUser", JSON.stringify(user));

            alert("Login successful! Redirecting to dashboard...");
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);
        });
    }
});


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

// Load Dashboard Details
function loadDashboard() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // Personal Greeting
    document.getElementById("greeting").innerText = `Welcome, ${user.firstName} ${user.lastName}!`;

    // Populate User Details
    document.getElementById("firstName").innerText = user.firstName;
    document.getElementById("lastName").innerText = user.lastName;
    document.getElementById("email").innerText = user.email;
    document.getElementById("musicGenre").innerText = user.musicGenre;
    document.getElementById("payment").innerText = user.payment;

    // Load Songs
    loadSongs();
}

// Load Songs from localStorage
function loadSongs() {
    const songs = JSON.parse(localStorage.getItem('songs')) || [];
    const songTableBody = document.getElementById("songTableBody");

    // Clear existing rows
    songTableBody.innerHTML = "";

    // Add each song to the table
    songs.forEach((song, index) => {
        const row = `
            <tr>
                <td>${song.name}</td>
                <td>${song.streams}</td>
                <td>${song.upc}</td>
                <td>${song.isrc}</td>
                <td>${song.growth}%</td>
            </tr>
        `;
        songTableBody.innerHTML += row;
    });
}

// Add New Song
document.getElementById("addSongForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const songName = document.getElementById("songName").value.trim();
    const streams = document.getElementById("streams").value.trim();
    const upc = document.getElementById("upc").value.trim();
    const isrc = document.getElementById("isrc").value.trim();

    if (!songName || !streams || !upc || !isrc) {
        alert("Please fill in all fields.");
        return;
    }

    // Generate a random growth percentage
    const growth = Math.floor(Math.random() * 100);

    const newSong = {
        name: songName,
        streams: parseInt(streams),
        upc,
        isrc,
        growth
    };

    // Save to localStorage
    const songs = JSON.parse(localStorage.getItem('songs')) || [];
    songs.push(newSong);
    localStorage.setItem('songs', JSON.stringify(songs));

    // Reload Songs
    loadSongs();

    // Clear the form
    document.getElementById("addSongForm").reset();
});

// Logout Logic
function handleLogout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = "login.html";
}
