import { error } from 'ajv/dist/vocabularies/applicator/dependencies';
import './Post.css';
import axios from 'axios';
import { useState } from 'react';




const Post = (props) => {

    const [likeCount, setLikeCount] = useState(props.post.likes.length);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [doesUserLike, setDoesUserLike] = useState(props.post.likes.filter(like => like.username === props.user?.username).length !== 0);

    const formatPostDate = (date) => {
        const index = date.indexOf('T');

        const formattedDate = date.substring(0, index);
        const formatedTime = date.substring(index + 1, index + 6);

        return formatedTime + " " + formattedDate;
    }


    const deletePost = (id) => {
        axios.post('https://akademia108.pl/api/social-app/post/delete', {

            post_id: id
        }).then(res => {

            console.log(res.data);
            props.setPosts((posts) => {
                return posts.filter((post) => post.id !== res.data.post_id)
            })
            setDeleteModalVisible(false);
        })
            .catch((error) => {
                console.error(error);
            });
    }

    const likePost = (id, isLiked) => {

        axios.post('https://akademia108.pl/api/social-app/post/' + (isLiked ? 'dislike' : 'like'), {
            post_id: id
        })
            .then(() => {
                setLikeCount(likeCount + (isLiked ? -1 : 1));
                setDoesUserLike(!isLiked);
            })
    }

    const unfollow = (id) => {
        axios.post('https://akademia108.pl/api/social-app/follows/disfollow', {
            leader_id: id
        })
        .then((res)=>{
            props.getLatestPosts();
        })
        .catch((error) => {
            console.error(error);
        });
    }


    return (
        <div className='post'>
            <div className='post-body'>
                <div className='user-data'>
                    <img className='user-photo' src={props.post.user.avatar_url}></img>
                    <h3 className='user-name'>{props.post.user.username}</h3>
                    {props.user && props.user.username !== props.post.user.username && <button className='btn' onClick={()=>unfollow(props.post.user.id)}>Unfollow</button>}
                </div>
                <div className='post-data'>
                    <p className='post-content'>{props.post.content}</p>
                    <p className='post-date'>{formatPostDate(props.post.created_at)}</p>
                    <p className='post-likes'><span className='bold'>{likeCount}</span>{(likeCount === 1) ? " like" : " likes"}</p>
                    {props.user?.username === props.post.user.username && <button className='btn' onClick={() => setDeleteModalVisible(true)}>Delete</button>}

                    {props.user && <button className='btn' onClick={()=>likePost(props.post.id, doesUserLike)}>{doesUserLike ? 'Dislike' : 'Like'}</button>}

                </div>
            </div>

            {deleteModalVisible && <div className='deleteConfirmation'>
                <h3>Are you sure you want to delete this post?</h3>
                <button className='btn yes' onClick={() => deletePost(props.post.id)}>Yes</button>
                <button className='btn no' onClick={() => setDeleteModalVisible(false)}>No</button>
            </div>}
        </div>
    )
}

export default Post;