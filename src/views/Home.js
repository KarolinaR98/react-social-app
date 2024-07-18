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

    const getNextPosts = () => {

        const lastPostDate = posts[posts.length-1].created_at;

        axios.post('https://akademia108.pl/api/social-app/post/older-then', {
             "date": lastPostDate
        })
        .then(res => {
            console.log(res);
            setPosts([...posts,...res.data]);
        })
        .catch((err) => {
            console.error("Error: ", err);
        });
    }

    useEffect(()=>{
        getLatestPosts();
    }, []);

    return(
        <div className="home">
            <h2>Home</h2>
            <div className="postList">
                {posts.map((post) => {
                    return <Post post={post}
                    key={post.id}/>
                })}
            </div>
            <button onClick={getNextPosts}>Load more</button>
        </div>
        
    )
}

export default Home;