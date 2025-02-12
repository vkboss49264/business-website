document.addEventListener("DOMContentLoaded", function () {
    console.log("Website Loaded!");
});
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});
const images = ["images/vk.png32", "images/vk1.png32", "images/vk3.png32"];
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
