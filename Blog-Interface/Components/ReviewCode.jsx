import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import style from './addpost.module.css'
import axios from "axios"
import { useNavigate } from "react-router-dom";
export default function AddPost(){
    const navigate = useNavigate();
    const { id } = useParams(); 
    /// mistake number 1
    const [storePosts, storeNewPosts] = useState([]);
    const [storeUpdatedPosts, setUpdatedPosts] = useState([]);
    const [updatePost, addNewPost] = useState({
        title: '' || storeUpdatedPosts[id]?.title,
        content: '' || storeUpdatedPosts[id]?.content,
        author: '' || storeUpdatedPosts[id]?.author
    });
    useEffect(()=>{
        const fetchPost = async() =>{
          try{
            const response = await axios.get('http://localhost:3000')
            console.log(response.data)
            setUpdatedPosts(response.data)
            console.log('yeah working....');
          } catch(err){
            console.error(err)
          }
        }  
        fetchPost()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Make the API request to update the post
            const response = await axios.patch(`http://localhost:3000/api/posts/update/${id}`, updatePost);
            console.log(response.data);
            // why did i write this line of code?!
            storeNewPosts([...storePosts, updatePost]);
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
                {storeUpdatedPosts.length > 0 ?
                   storeUpdatedPosts[id].title: ''}
                <input type="text" 
                placeholder="Title" 
                className={style.titleInput}
                value={updatePost[id]?.title}
                onChange={(e) => addNewPost({...updatePost, title:e.target.value})} />
                <textarea placeholder="Content" 
                className={style.contentInput}
                value={updatePost[id]?.content}
                onChange={(e) => addNewPost({...updatePost, content:e.target.value})} />
                <input type="text" 
                placeholder="Author"
                value={updatePost[id]?.author} 
                className={style.authorInput}
                onChange={(e) => addNewPost({...updatePost, author:e.target.value})} />
                <div className={style.buttonContainer}>
                    <button type="submit" className={style.submitButton}>Submit</button>
                    <button className={style.cancelForm} onClick={cancelPopup}>cancel</button>
                    
                </div>
            </form>
        </div>
        </>
    )
}