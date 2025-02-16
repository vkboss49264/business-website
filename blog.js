console.log("✅ blog.js loaded successfully!");

document.addEventListener("DOMContentLoaded", () => {
    loadBlogs();
});

// ✅ Function to Submit a Blog
async function submitBlog() {
    try {
        const title = document.getElementById("blog-title").value.trim();
        const content = document.getElementById("blog-content").value.trim();
        const fileInput = document.getElementById("media-upload").files[0];

        if (!title || !content) {
            alert("⚠️ Title and content are required!");
            return;
        }

        // ✅ Get user profile from localStorage
        const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
        if (!savedProfile || !savedProfile.username) {
            alert("⚠️ Please complete your profile before posting.");
            return;
        }

        let mediaUrl = "";

        // ✅ Convert uploaded media file to Base64 (optional)
        if (fileInput) {
            const reader = new FileReader();
            reader.onload = async function (event) {
                mediaUrl = event.target.result;
                await saveBlogPost(title, content, mediaUrl, savedProfile);
            };
            reader.readAsDataURL(fileInput);
        } else {
            await saveBlogPost(title, content, mediaUrl, savedProfile);
        }
    } catch (error) {
        console.error("❌ Error posting blog:", error);
    }
}

// ✅ Function to Save Blog to Server
async function saveBlogPost(title, content, mediaUrl, profile) {
    try {
        const response = await fetch("http://localhost:6000/api/blogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                author: profile.username,
                title: title,
                content: content,
                mediaUrl: mediaUrl,
            }),
        });

        if (response.ok) {
            alert("✅ Blog posted successfully!");
            document.getElementById("blog-title").value = "";
            document.getElementById("blog-content").value = "";
            document.getElementById("media-upload").value = "";
            loadBlogs(); // Reload blogs
        } else {
            alert("❌ Failed to post blog.");
        }
    } catch (error) {
        console.error("❌ Error saving blog:", error);
    }
}

// ✅ Function to Load Blogs from Server
async function loadBlogs() {
    try {
        const postsContainer = document.getElementById("posts-container");
        if (!postsContainer) return;

        postsContainer.innerHTML = "<p>Loading blogs...</p>"; // Show loading message

        const response = await fetch("http://localhost:6000/api/blogs");
        const blogs = await response.json();

        postsContainer.innerHTML = ""; // Clear previous posts

        if (blogs.length === 0) {
            postsContainer.innerHTML = "<p>No blogs yet. Start writing!</p>";
            return;
        }

        blogs.forEach(blog => {
            const blogHTML = `
                <div class="blog-post">
                    <h3>${blog.title}</h3>
                    <p><strong>${blog.author}</strong> - ${new Date(blog.createdAt).toLocaleString()}</p>
                    <p>${blog.content}</p>
                    ${blog.mediaUrl ? `<img src="${blog.mediaUrl}" class="blog-media">` : ""}
                </div>
            `;
            postsContainer.innerHTML += blogHTML;
        });
    } catch (error) {
        console.error("❌ Error loading blogs:", error);
    }
}


