document.addEventListener("DOMContentLoaded", function () {
    // Handle Signup
    let signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let email = document.getElementById("signupEmail").value;
            let password = document.getElementById("signupPassword").value;
            
            // Save user in local storage (simple storage, not secure for real apps)
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);
            localStorage.setItem("loggedIn", "true");

            alert("Sign up successful! Redirecting...");
            window.location.href = "profile.html"; // Go to profile after signup
        });
    }

    // Handle Login
    let loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let email = document.getElementById("loginEmail").value;
            let password = document.getElementById("loginPassword").value;
            
            // Check credentials from local storage
            let savedEmail = localStorage.getItem("userEmail");
            let savedPassword = localStorage.getItem("userPassword");

            if (email === savedEmail && password === savedPassword) {
                localStorage.setItem("loggedIn", "true");
                alert("Login successful!");
                window.location.href = "profile.html"; // Redirect to profile page
            } else {
                alert("Invalid email or password. Try again!");
            }
        });
    }

    // Logout functionality
    let logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("loggedIn");
            alert("Logged out!");
            window.location.href = "login.html";
        });
    }
});
