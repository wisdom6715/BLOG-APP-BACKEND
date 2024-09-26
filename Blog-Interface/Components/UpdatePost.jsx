import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./addpost.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updatePost, addNewPost] = useState({
    title: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get("http://localhost:3000");
        console.log(response.data);
        // setUpdatedPosts(response.data);
        console.log("yeah working....");

        // Find the post by ID and update the updatePost state
        const postToUpdate = response.data.find((post) => post.id === parseInt(id)); // Assuming id is numeric
        if (postToUpdate) {
          addNewPost({
            title: postToUpdate.title,
            content: postToUpdate.content,
            author: postToUpdate.author,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API request to update the post
      const response = await axios.patch(
        `http://localhost:3000/api/posts/update/${id}`,
        updatePost
      );
      console.log(response.data);
      // Assuming you're updating the local state with the new post
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  const cancelPopup = () => {
    navigate("/");
  };

  return (
    <>
      <div className={style.mainContainer} id="addPostPopup">
        <form action="POST" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className={style.titleInput}
            value={updatePost.title} // Access directly, not as an array
            onChange={(e) =>
              addNewPost({ ...updatePost, title: e.target.value })
            }
          />
          <textarea
            placeholder="Content"
            className={style.contentInput}
            value={updatePost.content} // Access directly, not as an array
            onChange={(e) =>
              addNewPost({ ...updatePost, content: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Author"
            value={updatePost.author} // Access directly, not as an array
            className={style.authorInput}
            onChange={(e) =>
              addNewPost({ ...updatePost, author: e.target.value })
            }
          />
          <div className={style.buttonContainer}>
            <button type="submit" className={style.submitButton}>
              Submit
            </button>
            <button className={style.cancelForm} onClick={cancelPopup}>
              cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
