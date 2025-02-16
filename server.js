const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 6000; // Changed to avoid conflicts

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (Remove Deprecated Options)
mongoose.connect("mongodb://127.0.0.1:27017/blogsDB")
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Blog Schema
const BlogSchema = new mongoose.Schema({
    author: String,
    title: String,
    content: String,
    mediaUrl: String,
    createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", BlogSchema);

// ✅ API to Post a Blog
app.post("/api/blogs", async (req, res) => {
    try {
        const { author, title, content, mediaUrl } = req.body;

        if (!author || !title || !content) {
            return res.status(400).json({ error: "⚠️ All fields are required" });
        }

        const newBlog = new Blog({ author, title, content, mediaUrl });
        await newBlog.save();

        res.status(201).json({ message: "✅ Blog posted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "❌ Error posting blog" });
    }
});

// ✅ API to Get All Blogs
app.get("/api/blogs", async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: "❌ Error fetching blogs" });
    }
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
