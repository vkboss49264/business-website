document.addEventListener("DOMContentLoaded", () => {
    loadProfile();
    loadBlogs();
});

// Save Profile to Local Storage
function saveProfile() {
    const username = document.getElementById("username")?.value.trim();
    const bio = document.getElementById("bio")?.value.trim();
    const profilePic = document.getElementById("profile-pic")?.src || "default-avatar.png";

    if (!username) {
        alert("Please enter your name.");
        return;
    }

    const userProfile = { username, bio, profilePic };
    localStorage.setItem("userProfile", JSON.stringify(userProfile));

    alert("Profile saved!");
    loadProfile(); // Reload the profile
}

// Load Profile from Local Storage
function loadProfile() {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));

    if (savedProfile) {
        document.getElementById("username").value = savedProfile.username || "";
        document.getElementById("bio").value = savedProfile.bio || "";
        document.getElementById("profile-pic").src = savedProfile.profilePic || "default-avatar.png";
    }
}

// Profile Picture Upload
document.getElementById("upload-pic").addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("profile-pic").src = e.target.result;

            // Save profile pic separately
            const savedProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
            savedProfile.profilePic = e.target.result;
            localStorage.setItem("userProfile", JSON.stringify(savedProfile));
        };
        reader.readAsDataURL(file);
    }
});

// Post a new blog
function postBlog() {
    const blogContent = document.getElementById("blog-content").value.trim();
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));

    if (!savedProfile || !savedProfile.username) {
        alert("Complete your profile first!");
        return;
    }

    if (!blogContent) {
        alert("Write something to post!");
        return;
    }

    const blogPost = {
        author: savedProfile.username,
        profilePic: savedProfile.profilePic || "default-avatar.png",
        content: blogContent,
        timestamp: new Date().toLocaleString(),
        likes: 0,
        comments: []
    };

    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.push(blogPost);
    localStorage.setItem("blogs", JSON.stringify(blogs));

    alert("Blog posted successfully!");
    document.getElementById("blog-content").value = ""; // Clear input after posting
    loadBlogs(); // Reload blogs
}

// Load Blogs
function loadBlogs() {
    const blogsContainer = document.getElementById("blogs-container");
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    blogsContainer.innerHTML = "";
    blogs.forEach((blog, index) => {
        const blogHTML = `
            <div class="blog-post">
                <img src="${blog.profilePic}" class="blog-author-pic">
                <p><strong>${blog.author}</strong> - ${blog.timestamp}</p>
                <p>${blog.content}</p>
                <button onclick="likePost(${index})">❤️ Like (${blog.likes})</button>
                <button onclick="commentOnPost(${index})">💬 Comment</button>
                <div id="comments-${index}">
                    ${blog.comments.map(c => `<p>🗨️ ${c}</p>`).join("")}
                </div>
            </div>
        `;
        blogsContainer.innerHTML += blogHTML;
    });
}

// Like a blog post
function likePost(index) {
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs[index].likes += 1;
    localStorage.setItem("blogs", JSON.stringify(blogs));
    loadBlogs();
}

// Comment on a blog post
function commentOnPost(index) {
    const comment = prompt("Enter your comment:");
    if (comment) {
        let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        blogs[index].comments.push(comment);
        localStorage.setItem("blogs", JSON.stringify(blogs));
        loadBlogs();
    }
}
