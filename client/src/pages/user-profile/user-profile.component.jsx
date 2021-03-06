import React, {useEffect, useState, useContext} from 'react';
import {UserContext} from '../../App';
import { useParams } from 'react-router-dom';
import './user-profile.styles.css';

const UserProfile = () => {
    const [userProfile, setProfile] = useState(null);
    const {state, dispatch} = useContext(UserContext);
    const { userId } = useParams();
    const [showFollow, setShowFollow] = useState(state ? !state.following.includes(userId) : true);

    useEffect(() => {
        postDetails();
    },[]);

    const postDetails = async () => {
        try{
            const postData = await fetch(`/user/${userId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('jwt')
                }
            });
    
            const postJSON = await postData.json();
            setProfile(postJSON);
        } catch(error) {
            console.log(error);
        }
    };

    const followUser = async() => {
        try{
            const data = await fetch('/follow', {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    followId: userId
                })
            });

            const dataJSON = await data.json();

            dispatch({
                type: 'UPDATE',
                payload: {
                    following: dataJSON.following,
                    followers: dataJSON.followers
                }
            });
            localStorage.setItem('user', JSON.stringify(dataJSON));

            setProfile((prevState) => {
                return{
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers: [...prevState.user.followers, dataJSON._id]
                    }
                }
            });
            setShowFollow(false);
        } catch(error) {
            console.log(error);
        }
    };
    
    const unfollowUser = async() => {
        try{
            const data = await fetch('/unfollow', {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    unfollowId: userId
                })
            });

            const dataJSON = await data.json();
          
            dispatch({
                type: 'UPDATE',
                payload: {
                    following: dataJSON.following,
                    followers: dataJSON.followers
                }
            });
            localStorage.setItem('user', JSON.stringify(dataJSON));

            setProfile((prevState) => {
                const unfollow = prevState.user.followers.filter( item => item !== dataJSON._id )
                return{
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers: unfollow
                    }
                }
            });
            setShowFollow(true);
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <>
        { userProfile 
            ? 
            <div className="main-profile">
                <div className="inner-div">
                    <div>
                        <img className="profile-pic" src={userProfile.user.pic}
                        alt=""/>
                    </div>
                    <div>
                        <h4>{userProfile.user.username}</h4>
                        <div className="info">
                            <h6>{userProfile.posts.length} posts</h6>
                            <h6>{userProfile.user.followers.length} followers</h6>
                            <h6>{userProfile.user.following.length} following</h6>
                        </div>

                        { showFollow ? 
                            <button className="btn waves-effect waves-light #64b5f6 blue darken-1 follow-btn" onClick={() => followUser()}>
                                Follow
                            </button> : 
                            <button className="btn waves-effect waves-light #64b5f6 blue darken-1 unfollow-btn" onClick={() => unfollowUser()}>
                                Unfollow
                            </button>
                        }

                    </div>
                </div>
                
                <div className="gallery">
                    {
                        userProfile.posts.map((item) => {
                            return (
                                <img key={item._id} className="gallery-item" src={item.photo} alt={item.title}/>
                            )
                        })
                    }
                    
                </div>
            </div>
            : <h2>Loading...</h2> }
        </>
    );
};

export default UserProfile;