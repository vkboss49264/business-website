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
            document.getElementById("username").value = savedProfile.username || "";
            document.getElementById("bio").value = savedProfile.bio || "";
            document.getElementById("profile-pic").src = savedProfile.profilePic || "default-avatar.png";
        }
    } catch (error) {
        console.error("Error loading profile:", error);
    }
}

// ✅ Profile Picture Upload with Compression
document.getElementById("upload-pic").addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            compressImage(e.target.result, 0.5, (compressedImage) => {
                document.getElementById("profile-pic").src = compressedImage;
                localStorage.setItem("profilePic", compressedImage);
            });
        };
        reader.readAsDataURL(file);
    }
});

// ✅ Function to Compress Image
function compressImage(base64Str, quality, callback) {
    const img = new Image();
    img.src = base64Str;
    img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width / 2;
        canvas.height = img.height / 2;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        callback(canvas.toDataURL("image/jpeg", quality));
    };
}

// ✅ Post a new blog (Linked to Profile)
function postBlog() {
    try {
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

        let blogs = JSON.parse(localStorage.getItem("blogs")) || {};
        if (!blogs[savedProfile.username]) {
            blogs[savedProfile.username] = [];
        }
        blogs[savedProfile.username].push(blogPost);
        localStorage.setItem("blogs", JSON.stringify(blogs));

        alert("Blog posted successfully!");
        document.getElementById("blog-content").value = "";
        loadBlogs();
    } catch (error) {
        console.error("Error posting blog:", error);
    }
}

// ✅ Load Blogs (Show Only User Blogs)
function loadBlogs() {
    try {
        const blogsContainer = document.getElementById("blogs-container");
        blogsContainer.innerHTML = "";
        const savedProfile = JSON.parse(localStorage.getItem("userProfile"));

        if (!savedProfile) return;

        const blogs = JSON.parse(localStorage.getItem("blogs")) || {};
        const userBlogs = blogs[savedProfile.username] || [];

        userBlogs.forEach((blog, index) => {
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
    } catch (error) {
        console.error("Error loading blogs:", error);
    }
}

// ✅ Like a blog post
function likePost(index) {
    try {
        const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
        let blogs = JSON.parse(localStorage.getItem("blogs")) || {};

        if (!savedProfile || !blogs[savedProfile.username]) return;

        blogs[savedProfile.username][index].likes += 1;
        localStorage.setItem("blogs", JSON.stringify(blogs));
        loadBlogs();
    } catch (error) {
        console.error("Error liking post:", error);
    }
}

// ✅ Comment on a blog post
function commentOnPost(index) {
    try {
        const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
        let blogs = JSON.parse(localStorage.getItem("blogs")) || {};

        if (!savedProfile || !blogs[savedProfile.username]) return;

        const comment = prompt("Enter your comment:");
        if (comment) {
            blogs[savedProfile.username][index].comments.push(comment);
            localStorage.setItem("blogs", JSON.stringify(blogs));
            loadBlogs();
        }
    } catch (error) {
        console.error("Error commenting on post:", error);
    }
}

// ✅ Clear Profile (Also Clears Blogs)
function clearProfile() {
    const confirmation = confirm("Are you sure you want to clear your profile? This will also delete all your blogs.");
    if (confirmation) {
        const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
        let blogs = JSON.parse(localStorage.getItem("blogs")) || {};

        if (savedProfile && blogs[savedProfile.username]) {
            delete blogs[savedProfile.username]; // Remove user blogs
        }

        localStorage.removeItem("userProfile");
        localStorage.removeItem("profilePic");
        localStorage.setItem("blogs", JSON.stringify(blogs));

        alert("Profile and blogs cleared!");
        loadProfile();
        loadBlogs();
    }
}
