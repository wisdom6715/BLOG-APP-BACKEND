import { useState } from "react"
import style from './addpost.module.css'
import axios from "axios"
import { useNavigate } from "react-router-dom";
export default function AddPost(){
    const [storePosts, storeNewPosts] = useState([]);
    const [newPost, addNewPost] = useState({
        title: "",
        content: "",
        author: ""
    });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Make the API request to save the new post
            const response = await axios.post('http://localhost:3000/api/posts', newPost);
            console.log(response.data);
    
            // After successful response, update the state to add the new post
            storeNewPosts([...storePosts, newPost]);
    
            // Optionally, reset newPost state after submission
            addNewPost({
                title: "",
                content: "",
                author: ""
            });
    
            // Navigate to the home page or wherever needed after submission
            window.location.href = "/";
        } catch (error) {
            console.error(error);
        }
        
    };
    const cancelPopup =() =>{
        navigate('/')
    }
    return (
        <>
        <div className={style.mainContainer} id="addPostPopup">
            <form action="POST" onSubmit={handleSubmit}>
                <input type="text" 
                placeholder="Title" 
                className={style.titleInput}
                onChange={(e) => addNewPost({...newPost, title:e.target.value})} required/>
                <textarea placeholder="Content" 
                className={style.contentInput}
                onChange={(e) => addNewPost({...newPost, content:e.target.value})} required/>
                <input type="text" 
                placeholder="Author" 
                className={style.authorInput}
                onChange={(e) => addNewPost({...newPost, author:e.target.value})} required/>
                <div className={style.buttonContainer}>
                    <button type="submit" className={style.submitButton}>Submit</button>
                    <button className={style.cancelForm} onClick={cancelPopup}>cancel</button>
                    
                </div>
            </form>
        </div>
        </>
    )
}