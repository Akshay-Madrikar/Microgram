import React from 'react';
import './home.styles.css';

const Home = () => {
    return (
        <div className="main-home">
            <div className="card home-card">

                <h5>Ryaan</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1544401447-515b289070ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
                </div>
                <div className="card-content">
                    <i class="material-icons like-button">favorite</i>
                    <h6>Title</h6>
                    <p>This is amazing</p>
                    <input type="text" placeholder="Add a comment"/>
                </div>
            </div>
        </div>
    );
};

export default Home;