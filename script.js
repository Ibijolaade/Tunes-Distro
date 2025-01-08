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


// Load Dashboard Details
function loadDashboard() {
    // Retrieve the logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // Redirect to login page if no user is logged in
    if (!loggedInUser) {
        alert("You must be logged in to view the dashboard.");
        window.location.href = "login.html";
        return;
    }

    // Display user details
    document.getElementById("greeting").innerText = `Welcome, ${loggedInUser.firstName} ${loggedInUser.lastName}!`;
    document.getElementById("firstName").innerText = loggedInUser.firstName;
    document.getElementById("lastName").innerText = loggedInUser.lastName;
    document.getElementById("email").innerText = loggedInUser.email;
    document.getElementById("musicGenre").innerText = loggedInUser.musicGenre;
    document.getElementById("payment").innerText = loggedInUser.payment;
}

// Handle Logout
function handleLogout() {
    // Clear the logged-in user from localStorage
    localStorage.removeItem("loggedInUser");

    // Redirect to the login page
    window.location.href = "login.html";
}

