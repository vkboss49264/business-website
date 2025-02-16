console.log("blog.js loaded successfully!");
document.addEventListener("DOMContentLoaded", () => {
    loadBlogs();
});

// ✅ Function to Submit a Blog
function submitBlog() {
    try {
        const title = document.getElementById("blog-title").value.trim();
        const content = document.getElementById("blog-content").value.trim();
        const fileInput = document.getElementById("media-upload").files[0];

        if (!title || !content) {
            alert("Title and content are required!");
            return;
        }

        const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
        if (!savedProfile || !savedProfile.username) {
            alert("Please complete your profile before posting.");
            return;
        }

        // Read file if uploaded (convert to Base64 for preview)
        let mediaUrl = "";
        if (fileInput) {
            const reader = new FileReader();
            reader.onload = function (event) {
                mediaUrl = event.target.result;
                saveBlogPost(title, content, mediaUrl, savedProfile);
            };
            reader.readAsDataURL(fileInput);
        } else {
            saveBlogPost(title, content, mediaUrl, savedProfile);
        }
    } catch (error) {
        console.error("Error posting blog:", error);
    }
}

// ✅ Function to Save Blog in Local Storage
function saveBlogPost(title, content, mediaUrl, profile) {
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    const newPost = {
        id: Date.now(),
        title: title,
        content: content,
        media: mediaUrl,
        author: profile.username,
        profilePic: profile.profilePic || "default-avatar.png",
        timestamp: new Date().toLocaleString(),
        likes: 0,
        comments: []
    };

    blogs.push(newPost);
    localStorage.setItem("blogs", JSON.stringify(blogs));

    alert("Blog posted successfully!");
    document.getElementById("blog-title").value = "";
    document.getElementById("blog-content").value = "";
    document.getElementById("media-upload").value = "";
    loadBlogs(); // Reload blogs after posting
}

// ✅ Function to Load Blogs
function loadBlogs() {
    try {
        const postsContainer = document.getElementById("posts-container");
        if (!postsContainer) return;

        postsContainer.innerHTML = ""; // Clear previous posts

        let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

        if (blogs.length === 0) {
            postsContainer.innerHTML = "<p>No blogs yet. Start writing!</p>";
            return;
        }

        blogs.forEach(blog => {
            const blogHTML = `
                <div class="blog-post">
                    <img src="${blog.profilePic}" class="blog-author-pic">
                    <h3>${blog.title}</h3>
                    <p><strong>${blog.author}</strong> - ${blog.timestamp}</p>
                    <p>${blog.content}</p>
                    ${blog.media ? `<img src="${blog.media}" class="blog-media">` : ""}
                    <button onclick="likePost(${blog.id})">❤️ Like (${blog.likes})</button>
                    <button onclick="commentOnPost(${blog.id})">💬 Comment</button>
                    <div id="comments-${blog.id}">
                        ${blog.comments.map(c => `<p>🗨️ ${c}</p>`).join("")}
                    </div>
                </div>
            `;
            postsContainer.innerHTML += blogHTML;
        });
    } catch (error) {
        console.error("Error loading blogs:", error);
    }
}

// ✅ Function to Like a Blog
function likePost(blogId) {
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    blogs = blogs.map(blog => {
        if (blog.id === blogId) blog.likes += 1;
        return blog;
    });

    localStorage.setItem("blogs", JSON.stringify(blogs));
    loadBlogs();
}

// ✅ Function to Comment on a Blog
function commentOnPost(blogId) {
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
}

