import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";

const Home = () => {

    const [posts, setPosts] = useState([]);


    const getLatestPosts = () => {
        axios.post('http://akademia108.pl/api/social-app/post/latest')
        .then(res=>{
            
            setPosts(res.data);
           
        })
        .catch((err) => {
            console.error("Error: ", err);
        });
    }

    useEffect(()=>{
        getLatestPosts();
    }, []);


    console.log(posts);
    return(
        <div className="home">
            <h2>Home</h2>
            <div className="postList">
                {posts.map((post) => {
                    return <Post post={post}
                    key={post.id}/>
                })}
            </div>
        </div>
        
    )
}

export default Home;