import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";
import AddPost from "../components/AddPost";

const Home = (props) => {

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
            setPosts([...posts,...res.data]);
        })
        .catch((err) => {
            console.error("Error: ", err);
        });
    }

    const getPrevPosts = () => {

        const earliestPostDate = posts[0].created_at;

        axios.post('https://akademia108.pl/api/social-app/post/newer-then', {
             "date": earliestPostDate
        })
        .then(res => {
            setPosts(res.data.concat(posts));
            
        })
        .catch((err) => {
            console.error("Error: ", err);
        });
    }
    

    useEffect(()=>{
        getLatestPosts();
    }, [props.user]);

    return(
        <div className="home">
            {props.user && <AddPost getPrevPosts={getPrevPosts} />}
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