const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));  // Serve uploaded files

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true, useUnifiedTopology: true });

// Define Blog Schema
const blogSchema = new mongoose.Schema({
    content: String,
    mediaUrl: String,  // Store image/video URL
    createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model("Blog", blogSchema);

// Set up file storage using multer
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Route to upload blogs
app.post("/api/blogs", upload.single("media"), async (req, res) => {
    try {
        const { content } = req.body;
        const mediaUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const newBlog = new Blog({ content, mediaUrl });
        await newBlog.save();

        res.json({ message: "Blog posted successfully!", blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: "Error posting blog", error });
    }
});

// Route to get all blogs
app.get("/api/blogs", async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
