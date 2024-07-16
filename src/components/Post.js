import './Post.css';

const formatPostDate = (date) => {
    const index = date.indexOf('T');

    const formattedDate = date.substring(0,index);
    const formatedTime = date.substring(index + 1, index + 6);

    return formatedTime + " " + formattedDate;
}



const Post = (props) => {
    return (
        <div className='post'>
            <div className='post-body'>
                <div className='user-data'>
                    <img className='user-photo' src={props.post.user.avatar_url}></img>
                    <h3 className='user-name'>{props.post.user.username}</h3>
                </div>
                <div className='post-data'>
                    <p className='post-content'>{props.post.content}</p>
                    <p className='post-date'>{formatPostDate(props.post.created_at)}</p>
                    <p className='post-likes'><span className='bold'>{(props.post.likes).length}</span>{((props.post.likes).length === 1) ? " like" : " likes"}</p>
                </div>
            </div>
        </div>
    )
}

export default Post;