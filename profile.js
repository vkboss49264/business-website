document.addEventListener("DOMContentLoaded", () => {
    loadProfile();
    loadBlogs();
});

// ✅ Save Profile to Local Storage
function saveProfile() {
    try {
        const username = document.getElementById("username")?.value.trim();
        const bio = document.getElementById("bio")?.value.trim();
        const profilePic = localStorage.getItem("profilePic") || "default-avatar.png";

        if (!username) {
            alert("Please enter your name.");
            return;
        }

        const userProfile = { username, bio, profilePic };
        localStorage.setItem("userProfile", JSON.stringify(userProfile));

        alert("Profile saved!");
        loadProfile();
    } catch (error) {
        console.error("Error saving profile:", error);
    }
}

// ✅ Load Profile from Local Storage
function loadProfile() {
    try {
        const savedProfile = JSON.parse(localStorage.getItem("userProfile"));

        if (savedProfile) {
            document.getElementById("username")?.setAttribute("value", savedProfile.username || "");
            document.getElementById("bio")?.setAttribute("value", savedProfile.bio || "");
            document.getElementById("profile-pic")?.setAttribute("src", savedProfile.profilePic || "default-avatar.png");
        }
    } catch (error) {
        console.error("Error loading profile:", error);
    }
}

// ✅ Post a Blog
function postBlog() {
    try {
        const blogContent = document.getElementById("blog-content")?.value.trim();
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
            id: Date.now(),
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
        document.getElementById("blog-content").value = "";
        loadBlogs(); // Reload blogs after posting
    } catch (error) {
        console.error("Error posting blog:", error);
    }
}

// ✅ Load Blogs
function loadBlogs() {
    try {
        const blogsContainer = document.getElementById("blogs-container");
        if (!blogsContainer) {
            console.error("Error: blogs-container not found");
            return;
        }

        blogsContainer.innerHTML = ""; // Clear existing blogs before loading new ones

        let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

        if (blogs.length === 0) {
            blogsContainer.innerHTML = "<p>No blogs found. Start writing!</p>";
            return;
        }

        blogs.forEach((blog) => {
            const blogElement = document.createElement("div");
            blogElement.classList.add("blog-post");
            blogElement.innerHTML = `
                <img src="${blog.profilePic}" class="blog-author-pic" alt="Profile">
                <p><strong>${blog.author}</strong> - ${blog.timestamp}</p>
                <p>${blog.content}</p>
                <button onclick="likePost(${blog.id})">❤️ Like (${blog.likes})</button>
                <button onclick="commentOnPost(${blog.id})">💬 Comment</button>
                <div id="comments-${blog.id}">
                    ${blog.comments.map(c => `<p>🗨️ ${c}</p>`).join("")}
                </div>
            `;
            blogsContainer.appendChild(blogElement);
        });
    } catch (error) {
        console.error("Error loading blogs:", error);
    }
}

// ✅ Like a Blog
function likePost(blogId) {
    try {
        let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

        blogs = blogs.map(blog => {
            if (blog.id === blogId) blog.likes += 1;
            return blog;
        });

        localStorage.setItem("blogs", JSON.stringify(blogs));
        loadBlogs();
    } catch (error) {
        console.error("Error liking post:", error);
    }
}

// ✅ Comment on a Blog
function commentOnPost(blogId) {
    try {
        const comment = prompt("Enter your comment:");
        if (!comment) return;

        let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

        blogs = blogs.map(blog => {
            if (blog.id === blogId) {
                blog.comments = blog.comments || [];
                blog.comments.push(comment);
            }
            return blog;
        });

        localStorage.setItem("blogs", JSON.stringify(blogs));
        loadBlogs();
    } catch (error) {
        console.error("Error commenting on post:", error);
    }
}

// ✅ Clear Profile
function clearProfile() {
    const confirmation = confirm("Are you sure you want to clear your profile? This will also delete all your blogs.");
    if (confirmation) {
        localStorage.removeItem("userProfile");
        localStorage.removeItem("profilePic");
        localStorage.removeItem("blogs");

        alert("Profile and blogs cleared!");
        loadProfile();
        loadBlogs();
    }
}

