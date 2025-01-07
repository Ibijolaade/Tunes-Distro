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
