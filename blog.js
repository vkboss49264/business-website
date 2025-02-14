// Get references to elements
const blogContent = document.getElementById('blog-content');
const postsContainer = document.getElementById('posts-container');

// Load blogs from local storage
document.addEventListener('DOMContentLoaded', loadBlogs);

// Function to submit a blog post
async function submitBlog() {
    const content = document.getElementById("blog-content").value;
    const fileInput = document.getElementById("media-upload").files[0];

    if (!content.trim() && !fileInput) {
        alert("Please write something or upload an image/video.");
        return;
    }

    const formData = new FormData();
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
        alert(data.message);
        loadBlogs();  // Refresh blogs after posting
    } catch (error) {
        console.error("Error:", error);
    }
}


async function loadBlogs() {
    const response = await fetch("http://localhost:5000/api/blogs");
    const blogs = await response.json();

    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = "";

    blogs.forEach((blog) => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("blog-post");

        postDiv.innerHTML = `
            <p>${blog.content}</p>
            ${blog.mediaUrl ? `<img src="${blog.mediaUrl}" style="max-width: 100%;"/>` : ""}
            <p><small>Posted on: ${new Date(blog.createdAt).toLocaleString()}</small></p>
        `;

        postsContainer.appendChild(postDiv);
    });
}

// Load blogs when page loads
loadBlogs();


// Function to like a blog post
function likeBlog(id) {
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs = blogs.map(blog => {
        if (blog.id === id) blog.likes++;
        return blog;
    });
    localStorage.setItem('blogs', JSON.stringify(blogs));
    loadBlogs();
}

// Function to add a comment
function addComment(id) {
    const commentInput = document.getElementById(`comment-${id}`);
    let comment = commentInput.value.trim();
    if (comment === "") return;

    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs = blogs.map(blog => {
        if (blog.id === id) blog.comments.push(comment);
        return blog;
    });

    localStorage.setItem('blogs', JSON.stringify(blogs));
    commentInput.value = '';
    loadBlogs();
}

// Function to share a blog post (copy link to clipboard)
function shareBlog(id) {
    const shareURL = `${window.location.href}?blog=${id}`;
    navigator.clipboard.writeText(shareURL).then(() => {
        alert("Blog link copied to clipboard!");
    }).catch(() => {
        alert("Failed to copy link.");
    });
}
