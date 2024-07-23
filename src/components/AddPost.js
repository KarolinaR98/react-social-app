import './AddPost.css'

import { useState } from 'react';
import axios from 'axios';


const AddPost = (props) => {

    const [postContent, setPostContent] = useState("");

    const addPost = (e) => {
        e.preventDefault();

        if(!postContent){
            return;
        }

        axios.post('https://akademia108.pl/api/social-app/post/add',
            {
                "content": postContent
            }
        )
            .then(res => {
            
                props.getPrevPosts();               


            })
            .catch((err) => {
                console.error(err);
            })
    }

    return(
            <form className='postForm' onSubmit={addPost}>
                <textarea placeholder="Add post..." onChange={e => setPostContent(e.target.value)}></textarea>
                <button>Add</button>
            </form>
    )
}

export default AddPost;