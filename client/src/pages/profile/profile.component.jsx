import React from 'react';
import './profile.styles.css';

const Profile = () => {
    return (
        <div className="main-profile">
            <div className="inner-div">
                <div>
                    <img className="profile-pic" src="https://images.unsplash.com/photo-1585602173562-e7eeb0e6f380?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" 
                    alt=""/>
                </div>
                <div>
                    <h4>Ryaan Daul</h4>
                    <div className="info">
                        <h6>40 posts</h6>
                        <h6>10 followers</h6>
                        <h6>20 following</h6>
                    </div>
                </div>
            </div>
            
            <div className="gallery">
                <img className="gallery-item" src="https://images.unsplash.com/photo-1585602173562-e7eeb0e6f380?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
                <img className="gallery-item" src="https://images.unsplash.com/photo-1585602173562-e7eeb0e6f380?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
                <img className="gallery-item" src="https://images.unsplash.com/photo-1585602173562-e7eeb0e6f380?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
                <img className="gallery-item" src="https://images.unsplash.com/photo-1585602173562-e7eeb0e6f380?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
                <img className="gallery-item" src="https://images.unsplash.com/photo-1585602173562-e7eeb0e6f380?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
                <img className="gallery-item" src="https://images.unsplash.com/photo-1585602173562-e7eeb0e6f380?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
            </div>
        </div>
    );
};

export default Profile;