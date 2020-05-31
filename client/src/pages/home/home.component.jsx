import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import './home.styles.css';

const Home = () => {
    const [data, setData] = useState([]);
    const {state, dispatch} = useContext(UserContext);

    useEffect(() => {
        postDetails();
    },[]);

    const postDetails = async () => {
        try{
            const postData = await fetch('/posts', {
                headers: {
                    "Authorization": "Bearer " +localStorage.getItem('jwt')
                }
            });
    
            const postJSON = await postData.json();
            console.log(postJSON.posts)
            setData(postJSON.posts);
        } catch(error) {
            console.log(error);
        }
    };


    const postLike = async (id) => {
        try{
            const likesData = await fetch('/like', {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " +localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    postId: id
                })
            });
            const likesJSON = await likesData.json();

            // Updating state
            const newData = data.map((post) => {
                if(post._id === likesJSON._id) {
                    return likesJSON;
                } else {
                    return post;
                }
            });
            setData(newData);
        } catch(error) {
            console.log(error);
        }
    };

    const postUnLike = async(id) => {
        try{
            const unLikesData = await fetch('/unlike', {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " +localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    postId: id
                })
            });
            const unLikeJSON = await unLikesData.json();

            // Updating state
            const newData = data.map((post) => {
                if(post._id === unLikeJSON._id) {
                    return unLikeJSON;
                } else {
                    return post;
                }
            });
            setData(newData);
        } catch(error) {
            console.log(error);
        }
    };

    const postComment = async (text, postId) => {
        const commentsData = await fetch('/comment',{
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " +localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                text,
                postId
            })
        });

        const commentsJSON = await commentsData.json();

        const newData = data.map((post) => {
            if(post._id === commentsJSON._id) {
                return commentsJSON;
            } else {
                return post;
            }
        })
        setData(newData);
    };

    const postDelete = async (postId) => {
        const deletePost = await fetch(`/deletePost/${postId}`, {
            method: "delete",
            headers: {
                "Authorization": "Bearer " +localStorage.getItem('jwt')
            }
        });
        const deletePostJSON = await deletePost.json();
        console.log(deletePostJSON)
        const newData = data.filter((post) => {
            return post._id !== deletePostJSON._id
        });
        setData(newData);
    };

    return (
        <div className="main-home">
                {
                    data.map((post) => {
                        return (
                            <div key={post._id} className="card home-card">
                                <h5 className="posted-by">
                                    <div className="display-main">
                                        <Link to={post.postedBy._id !== state._id ? "/profile/"+post.postedBy._id : "/profile"}>
                                        <img className="display-pic" src={post.postedBy.pic}/>
                                        <span className="display-name">{post.postedBy.username}</span>
                                        </Link>
                                    </div>
                                    <div className="delete-btn">
                                        { post.postedBy._id === state._id && 
                                            <i className="material-icons" 
                                            onClick={() => postDelete(post._id)}>
                                            delete
                                            </i>
                                        }
                                    </div>
                                </h5>
                                <div className="card-image">
                                    <img src={post.photo} alt=""/>
                                </div>
                                <div className="card-content">
                                    <div className="react-post">
                                        { post.likes.includes(state._id) 
                                        ? <i className="material-icons unlike-btn" onClick={() => {postUnLike(post._id)}}>thumb_down</i>
                                        : <i className="material-icons like-btn" onClick={() => {postLike(post._id)}}>thumb_up</i>
                                        }
                                        <h6 className="likes">{post.likes.length}</h6>
                                    </div>
                                    <h6>{post.title}</h6>
                                    <p>{post.body}</p>
                                    {
                                        post.comments.map((comment) => {
                                            return (
                                            <h6 key={comment._id}>
                                                <span style={{fontWeight: "500"}}>{comment.postedBy.username}</span> {comment.text}
                                            </h6>
                                            )
                                        })
                                    }
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        postComment(e.target[0].value, post._id);
                                        e.target[0].value = '';
                                    }}>
                                        <input id="comment" type="text" placeholder="Add a comment"/>
                                    </form>
                                </div>
                            </div>
                        )
                    })
                }
        </div>
    );
};

export default Home;