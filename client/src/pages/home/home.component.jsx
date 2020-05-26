import React, { useState, useEffect } from 'react';
import './home.styles.css';

const Home = () => {
    const [data, setData] = useState([]);

    const postDetails = async () => {
        try{
            const postData = await fetch('http://localhost:5000/posts', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            });
    
            const postJSON = await postData.json();
            setData(postJSON.posts);
        } catch(error) {
            console.log(error);
        }
       
    }

    useEffect(() => {
        postDetails();
    },[]);

    return (
        <div className="main-home">
            
                {
                    data.map( (post) => {
                        return (
                            <div key={post._id} className="card home-card">
                                <h5>{post.postedBy.username}</h5>
                                <div className="card-image">
                                    <img src={post.photo} alt=""/>
                                </div>
                                <div className="card-content">
                                    <i className="material-icons like-button">favorite</i>
                                    <h6>{post.title}</h6>
                                    <p>{post.body}</p>
                                    <input type="text" placeholder="Add a comment"/>
                                </div>
                            </div>
                        )
                    })
                }
               
        </div>
    );
};

export default Home;