import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Health check route
app.get("/health", (req, res) => res.send("OK"));

// Route to render the main page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get('https://api-provider-blog-app.onrender.com');
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

// Get a specific post
app.get('/post/:id', async (req, res) => {
  try {
    const response = await axios.get(`https://api-provider-blog-app.onrender.com/post/${req.params.id}`);
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(404).send('Post not found');
  }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post('https://api-provider-blog-app.onrender.com/add/post', req.body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Partially update a post
app.patch("/api/posts/update/:id", async (req, res) => {
  console.log("called");
  const postId = req.params.id; // Get the ID from the request parameters

  try {
    const response = await axios.patch(`https://api-provider-blog-app.onrender.com/update/post/${postId}`, req.body);
    res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while updating the post' });
  }
});

// Delete a post
app.delete("/api/posts/delete/:id", async (req, res) => {
  try {
    const response = await axios.delete(`https://api-provider-blog-app.onrender.com/delete/post/${req.params.id}`);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
