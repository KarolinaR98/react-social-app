import './FollowRecommendations.css';

import { useEffect, useState } from "react";
import axios from "axios";

const FollowRecommendations = (props) => {

    const [recommendations, setRecommendations] = useState([]);

    const getRecommendations = () => {
        axios.post('https://akademia108.pl/api/social-app/follows/recommendations')
            .then((res) => {
                setRecommendations(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const follow = (id) => {
        axios.post('https://akademia108.pl/api/social-app/follows/follow', {
            leader_id: id
        })
            .then((res) => {
                props.getLatestPosts();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getRecommendations()
    }, [props.posts])

    return <div>
        {recommendations.length > 0 && <div className="followRecommendations">
            {recommendations.map(recommendation => {
                return (
                    <div className="followRecommendation" key={recommendation.id}>
                        <img src={recommendation.avatar_url} alt="avatar" />
                        <h3>{recommendation.username}</h3>
                        <button className="btn" onClick={() => follow(recommendation.id)}>Follow</button>
                    </div>
                )
            })}
        </div>}
    </div>


};

export default FollowRecommendations;