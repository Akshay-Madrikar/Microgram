import React from 'react';
import './create-post.styles.css';

const CreatePost = () => {
    return (
        <div className="card fill-input">
            <input type="text" placeholder="Title"/>
            <input type="text" placeholder="Body"/>
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1">
                Submit post
            </button>
        </div>
    )
}

export default CreatePost;

