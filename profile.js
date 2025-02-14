document.addEventListener("DOMContentLoaded", loadProfile);
document.addEventListener("DOMContentLoaded", loadUserBlogs);

function saveProfile() {
    const username = document.getElementById("username").value;
    const bio = document.getElementById("bio").value;
    const profilePic = document.getElementById("profile-pic").src;

    const userProfile = { username, bio, profilePic };
    localStorage.setItem("userProfile", JSON.stringify(userProfile));

    alert("Profile saved!");
}

function loadProfile() {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (savedProfile) {
        document.getElementById("username").value = savedProfile.username;
        document.getElementById("bio").value = savedProfile.bio;
        document.getElementById("profile-pic").src = savedProfile.profilePic;
    }
}

document.getElementById("upload-pic").addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("profile-pic").src = e.target.result;
            localStorage.setItem("profilePic", e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

function loadUserBlogs() {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const userPosts = document.getElementById("user-posts");
    userPosts.innerHTML = "";

    blogs.forEach(blog => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("blog-post");
        postDiv.innerHTML = `
            <p>${blog.content}</p>
            <button onclick="likeBlog(${blog.id})">❤️ ${blog.likes}</button>
            <button onclick="deleteBlog(${blog.id})">🗑️ Delete</button>
        `;
        userPosts.appendChild(postDiv);
    });
}

function deleteBlog(id) {
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs = blogs.filter(blog => blog.id !== id);
    localStorage.setItem("blogs", JSON.stringify(blogs));
    loadUserBlogs();
}
