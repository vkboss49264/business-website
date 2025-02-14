// Load blogs when page loads
document.addEventListener("DOMContentLoaded", loadBlogs);

// Function to submit a new blog post
async function submitBlog() {
    const title = document.getElementById("blog-title").value;
    const content = document.getElementById("blog-content").value;
    const fileInput = document.getElementById("media-upload").files[0];

    if (!title.trim() || !content.trim()) {
        alert("Title and content are required.");
        return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (fileInput) {
        formData.append("media", fileInput);
    }

    try {
        const response = await fetch("http://localhost:5000/api/blogs", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        alert(data.message || "Blog posted successfully!");
        loadBlogs(); // Refresh blogs after posting
    } catch (error) {
        console.error("Error posting blog:", error);
    }
}
async function loadBlogs() {
    try {
        console.log("Fetching blogs...");
        const response = await fetch("http://localhost:5000/api/blogs");
        const blogs = await response.json();
        console.log("Blogs fetched:", blogs); // Debugging line

        const postsContainer = document.getElementById("posts-container");
        postsContainer.innerHTML = "";

        blogs.forEach((blog) => {
            const postDiv = document.createElement("div");
            postDiv.classList.add("blog-post");

            postDiv.innerHTML = `
                <h3>${blog.title || "Untitled"}</h3>
                <p>${blog.content}</p>
                ${blog.mediaUrl ? `<img src="${blog.mediaUrl}" style="max-width: 100%;"/>` : ""}
                <p><small>Posted on: ${new Date(blog.createdAt).toLocaleString()}</small></p>
            `;

            postsContainer.appendChild(postDiv);
        });
    } catch (error) {
        console.error("Error loading blogs:", error);
    }
}


// Function to like a blog post
async function likeBlog(id) {
    try {
        await fetch(`http://localhost:5000/api/blogs/${id}/like`, {
            method: "POST",
        });

        loadBlogs(); // Refresh after liking
    } catch (error) {
        console.error("Error liking blog:", error);
    }
}

// Function to add a comment
async function addComment(id) {
    const commentInput = document.getElementById(`comment-${id}`);
    let comment = commentInput.value.trim();
    if (comment === "") return;

    try {
        await fetch(`http://localhost:5000/api/blogs/${id}/comment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ comment }),
        });

        commentInput.value = "";
        loadBlogs();
    } catch (error) {
        console.error("Error adding comment:", error);
    }
}
