// Function to save blog posts
function saveBlog() {
    let title = document.getElementById("blogTitle").value;
    let content = document.getElementById("blogContent").value;
    
    if (title.trim() === "" || content.trim() === "") {
        alert("Please fill in both title and content.");
        return;
    }

    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.push({ title, content, likes: 0, comments: [] });
    localStorage.setItem("blogs", JSON.stringify(blogs));

    document.getElementById("blogTitle").value = "";
    document.getElementById("blogContent").value = "";

    loadBlogs();
}

// Function to load blog posts
function loadBlogs() {
    let blogsContainer = document.getElementById("blogsContainer");
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    
    blogsContainer.innerHTML = "";
    
    blogs.forEach((blog, index) => {
        let blogDiv = document.createElement("div");
        blogDiv.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
            <button onclick="likeBlog(${index})">❤️ Like (${blog.likes})</button>
            <div>
                <input type="text" id="comment-${index}" placeholder="Write a comment">
                <button onclick="commentBlog(${index})">Comment</button>
            </div>
            <div>
                ${blog.comments.map(comment => `<p><strong>${comment.user}:</strong> ${comment.text}</p>`).join('')}
            </div>
            <hr>
        `;
        blogsContainer.appendChild(blogDiv);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Redirect if not logged in
    if (!localStorage.getItem("loggedIn")) {
        window.location.href = "login.html";
    }

    // Save and display blogs
    let blogButton = document.getElementById("saveBlog");
    let blogList = document.getElementById("blogList");

    blogButton.addEventListener("click", function () {
        let blogContent = document.getElementById("blogContent").value;
        if (blogContent) {
            let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
            blogs.push(blogContent);
            localStorage.setItem("blogs", JSON.stringify(blogs));
            displayBlogs();
            document.getElementById("blogContent").value = ""; // Clear input
        }
    });

    function displayBlogs() {
        blogList.innerHTML = "";
        let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        blogs.forEach((blog, index) => {
            let li = document.createElement("li");
            li.textContent = blog;
            blogList.appendChild(li);
        });
    }

    displayBlogs();
});
document.addEventListener("DOMContentLoaded", loadBlogs);

function submitBlog() {
    const content = document.getElementById("blog-content").value;
    if (!content) {
        alert("Please write something before posting.");
        return;
    }

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const newBlog = { id: Date.now(), content, likes: 0, comments: [] };
    
    blogs.unshift(newBlog);
    localStorage.setItem("blogs", JSON.stringify(blogs));

    document.getElementById("blog-content").value = "";
    loadBlogs();
}

function loadBlogs() {
    const container = document.getElementById("posts-container");
    container.innerHTML = "";
    
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    blogs.forEach(blog => {
        const blogElement = document.createElement("div");
        blogElement.classList.add("blog-post");
        blogElement.innerHTML = `
            <p>${blog.content}</p>
            <button onclick="likeBlog(${blog.id})">❤️ ${blog.likes}</button>
            <button onclick="showCommentBox(${blog.id})">💬 Comment</button>
            <div id="comments-${blog.id}">
                ${blog.comments.map(comment => `<p>${comment}</p>`).join("")}
            </div>
            <textarea id="comment-${blog.id}" placeholder="Write a comment..."></textarea>
            <button onclick="addComment(${blog.id})">Post Comment</button>
        `;
        container.appendChild(blogElement);
    });
}

function likeBlog(id) {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const blog = blogs.find(blog => blog.id === id);
    blog.likes += 1;
    localStorage.setItem("blogs", JSON.stringify(blogs));
    loadBlogs();
}

function addComment(id) {
    const commentText = document.getElementById(`comment-${id}`).value;
    if (!commentText) {
        alert("Write something before commenting.");
        return;
    }

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const blog = blogs.find(blog => blog.id === id);
    blog.comments.push(commentText);
    
    localStorage.setItem("blogs", JSON.stringify(blogs));
    loadBlogs();
}

