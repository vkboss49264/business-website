// Get references to elements
const blogContent = document.getElementById('blog-content');
const postsContainer = document.getElementById('posts-container');

// Load blogs from local storage
document.addEventListener('DOMContentLoaded', loadBlogs);

// Function to submit a blog post
function submitBlog() {
    const content = blogContent.value.trim();
    if (content === "") {
        alert("Please write something before posting.");
        return;
    }

    const blogPost = {
        id: Date.now(), // Unique ID
        content: content,
        likes: 0,
        comments: []
    };

    // Save to localStorage
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.unshift(blogPost);
    localStorage.setItem('blogs', JSON.stringify(blogs));

    // Clear textarea
    blogContent.value = '';

    // Reload posts
    loadBlogs();
}

// Function to load and display blogs
function loadBlogs() {
    postsContainer.innerHTML = ""; // Clear previous content
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

    blogs.forEach(blog => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('blog-post');
        postDiv.innerHTML = `
            <p>${blog.content}</p>
            <button onclick="likeBlog(${blog.id})">❤️ Like (${blog.likes})</button>
            <button onclick="shareBlog(${blog.id})">🔗 Share</button>
            <div class="comments">
                <input type="text" id="comment-${blog.id}" placeholder="Write a comment...">
                <button onclick="addComment(${blog.id})">💬 Comment</button>
                <ul id="comment-list-${blog.id}">
                    ${blog.comments.map(comment => `<li>${comment}</li>`).join('')}
                </ul>
            </div>
        `;
        postsContainer.appendChild(postDiv);
    });
}

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
