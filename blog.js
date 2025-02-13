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

// Function to like a blog post
function likeBlog(index) {
    let blogs = JSON.parse(localStorage.getItem("blogs"));
    blogs[index].likes += 1;
    localStorage.setItem("blogs", JSON.stringify(blogs));
    loadBlogs();
}

// Function to comment on a blog post
function commentBlog(index) {
    let commentInput = document.getElementById(`comment-${index}`);
    let text = commentInput.value;
    
    if (text.trim() === "") {
        alert("Comment cannot be empty!");
        return;
    }

    let blogs = JSON.parse(localStorage.getItem("blogs"));
    blogs[index].comments.push({ user: "Anonymous", text });
    localStorage.setItem("blogs", JSON.stringify(blogs));
    commentInput.value = "";
    loadBlogs();
}

// Load blogs when the page is opened
window.onload = loadBlogs;
