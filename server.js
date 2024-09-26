import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
const app = express();
const port = 3000;
// const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// Route to render the main page
app.get("/", async (req, res) => {
  const response = await axios.get('http://localhost:4000')
  res.send(response.data)
});
// Get a specific post
app.get('/post/:id', async (req, res) =>{
  try{
    const response = await axios.get(`http://localhost:4000/post/${req.params.id}`)
    res.send(response.data)
  } catch(err){
    console.error(err)
    res.status(404).send('Post not found')
  }
})
// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post('http://localhost:4000/add/post', req.body, {
      headers: {
        'Content-Type': 'application/json',
      }
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
    // Replace :id with the actual postId and pass req.body as the data to be updated
    const response = await axios.patch(`http://localhost:4000/update/post/${postId}`, req.body);
    
    // Send the response back to the client
    res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while updating the post' });
  }
});


// Delete a post
app.delete("/api/posts/delete/:id", async (req, res) => {
  try {
    const response = await axios.delete('http://localhost:4000/delete/post/:id')
    res.send(response.data)
  } catch (error) {
    console.error(error)
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
