import React, {useEffect, useState, useContext} from 'react';
import {UserContext} from '../../App';
import './profile.styles.css';

const Profile = () => {
    const [post, setPost] = useState([]);
    const {state, dispatch} = useContext(UserContext);

    const myPostDetails = async () => {
        try{
            const postData = await fetch('http://localhost:5000/mypost', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            });
    
            const postJSON = await postData.json();
            setPost(postJSON.myPost);
        } catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        myPostDetails();
    },[]);

    return (
        <div className="main-profile">
            <div className="inner-div">
                <div>
                    <img className="profile-pic" src="https://images.unsplash.com/photo-1585602173562-e7eeb0e6f380?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" 
                    alt=""/>
                </div>
                <div>
                    <h4>{state ? state.username : 'Loading...'}</h4>
                    <div className="info">
                        <h6>40 posts</h6>
                        <h6>10 followers</h6>
                        <h6>20 following</h6>
                    </div>
                </div>
            </div>
            
            <div className="gallery">
                {
                    post.map((item) => {
                        return (
                            <img key={item._id} className="gallery-item" src={item.photo} alt={item.title}/>
                        )
                    })
                }
                
            </div>
        </div>
    );
};

export default Profile;