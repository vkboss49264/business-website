document.addEventListener("DOMContentLoaded", function () {
    console.log("Website Loaded!");
});
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});
const images = ["https://vkboss49264.github.io/business-website/vk.png", "https://vkboss49264.github.io/business-website/vk1.png", "https://vkboss49264.github.io/business-website/vk3.png"];
let currentIndex = 0;
const slide = document.getElementById("slide");

setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    slide.src = images[currentIndex];
}, 3000);
function calculate() {
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    document.getElementById("result").textContent = Number(num1) + Number(num2);
}
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting instantly

    let isValid = true;
    
    // Get form values
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    // Name validation
    if (name === "") {
        document.getElementById("nameError").textContent = "Name is required!";
        isValid = false;
    } else {
        document.getElementById("nameError").textContent = "";
    }

    // Email validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Enter a valid email!";
        isValid = false;
    } else {
        document.getElementById("emailError").textContent = "";
    }

    // Message validation
    if (message === "") {
        document.getElementById("messageError").textContent = "Message cannot be empty!";
        isValid = false;
    } else {
        document.getElementById("messageError").textContent = "";
    }

    // If form is valid, show success message
    if (isValid) {
        document.getElementById("successMessage").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("successMessage").classList.add("hidden");
        }, 3000);
        this.reset(); // Clear form
    }
});
// Open Modal
function openAuthModal() {
    document.getElementById("auth-modal").style.display = "block";
}

// Close Modal
function closeAuthModal() {
    document.getElementById("auth-modal").style.display = "none";
}

// Sign Up Function
function signUp() {
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;

    if (username && password) {
        localStorage.setItem("user", username);
        localStorage.setItem("pass", password);
        alert("Signup Successful! Now log in.");
        closeAuthModal();
    } else {
        alert("Please enter a username and password.");
    }
}

// Log In Function
function logIn() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;
    let storedUser = localStorage.getItem("user");
    let storedPass = localStorage.getItem("pass");

    if (username === storedUser && password === storedPass) {
        localStorage.setItem("loggedIn", "true");
        alert("Login Successful!");
        updateUI();
        closeAuthModal();
    } else {
        alert("Invalid credentials.");
    }
}

// Log Out Function
function logOut() {
    localStorage.setItem("loggedIn", "false");
    alert("Logged Out.");
    updateUI();
}

// Update UI (Show Logout if Logged In)
function updateUI() {
    let userInfo = document.getElementById("user-info");
    let logoutBtn = document.getElementById("logout-btn");

    if (localStorage.getItem("loggedIn") === "true") {
        userInfo.innerText = "Welcome, " + localStorage.getItem("user");
        logoutBtn.style.display = "block";
    } else {
        userInfo.innerText = "";
        logoutBtn.style.display = "none";
    }
}

// Run updateUI on Page Load
window.onload = updateUI;
// Log In Function (Now Redirects to Dashboard)
function logIn() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;
    let storedUser = localStorage.getItem("user");
    let storedPass = localStorage.getItem("pass");

    if (username === storedUser && password === storedPass) {
        localStorage.setItem("loggedIn", "true");
        alert("Login Successful! Redirecting to dashboard...");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        alert("Invalid credentials.");
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const userProfileSection = document.getElementById("user-profile");
    const usernameDisplay = document.getElementById("username");
    const userEmailDisplay = document.getElementById("user-email");
    const profileForm = document.getElementById("profile-form");

    // Check if user is logged in
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
        const userData = JSON.parse(loggedInUser);
        usernameDisplay.textContent = userData.username;
        userEmailDisplay.textContent = userData.email;
        userProfileSection.style.display = "block";
    }

    // Handle Profile Update
    profileForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const newUsername = document.getElementById("new-username").value;
        const newEmail = document.getElementById("new-email").value;

        // Update user data in localStorage
        const updatedUserData = {
            username: newUsername,
            email: newEmail,
        };
        localStorage.setItem("user", JSON.stringify(updatedUserData));

        // Update UI
        usernameDisplay.textContent = newUsername;
        userEmailDisplay.textContent = newEmail;

        alert("Profile updated successfully!");
    });
});

// Logout function
function logOut() {
    localStorage.removeItem("user");
    alert("Logged out!");
    window.location.reload(); // Reload page after logout
}
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".fade-in, .slide-in");

    function checkScroll() {
        elements.forEach(el => {
            const position = el.getBoundingClientRect().top;
            if (position < window.innerHeight - 100) {
                el.style.animationPlayState = "running";
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll();
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});
window.addEventListener("load", function () {
    document.getElementById("loading-screen").style.opacity = "0";
    setTimeout(() => document.getElementById("loading-screen").style.display = "none", 500);
});
// Handle blog saving
function saveBlog() {
    let content = document.getElementById("blogContent").value;
    if (content.trim() === "") {
        alert("Write something before publishing!");
        return;
    }

    let blogList = document.getElementById("blogList");
    let newBlog = document.createElement("div");
    newBlog.innerHTML = `<p>${content}</p><hr>`;
    blogList.appendChild(newBlog);

    document.getElementById("blogContent").value = ""; // Clear text area
}

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    // Get input values
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    // Dummy authentication check (Replace with real validation)
    if (email === "user@example.com" && password === "password") {
        alert("Login Successful!");
        localStorage.setItem("loggedIn", true); // Save login state
        window.location.href = "profile.html"; // Redirect to profile
    } else {
        alert("Invalid Credentials!");
    }
});


// Handle sign-up
document.getElementById("signupForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Sign Up Successful! Please log in.");
    window.location.href = "login.html"; // Redirect to login
});



