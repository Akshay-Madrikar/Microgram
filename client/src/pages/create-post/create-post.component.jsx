import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';
import './create-post.styles.css';

const CreatePost = () => {
    const [ title, setTitle ] = useState("");
    const [ body, setBody ] = useState("");
    const [ image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");
    const history = useHistory();

    useEffect(() => {
        if(url) {
            postData();
        }
    }, [url]);

    const postImage = async () => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'microgram');
        data.append('cloud_name', 'dexkk3lc4');

        try{
            const img = await fetch('https://api.cloudinary.com/v1_1/dexkk3lc4/image/upload', {
                method: 'post',
                body: data
            });
    
            const imgJSON = await img.json();
            setUrl(imgJSON.url);
        } catch(error) {
            console.log(error);
        };
    };

    const postData = async() => {
       
        try{
            const imgData = await fetch('http://localhost:5000/createpost', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic: url
                })
            });

            const imgageJSON = await imgData.json();
            console.log(imgageJSON)
            if(imgageJSON.error) {
                M.toast({ 
                    html: imgageJSON.error, 
                    classes: "#c62828 red darken-3"
                });
            } else if (imgageJSON.errors){
                M.toast({ 
                    html: imgageJSON.message, 
                    classes: "#c62828 red darken-3"
                });
            } else{
                M.toast({
                    html: imgageJSON.message,
                    classes: "#43a047 green darken-1"
                });
                history.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="card fill-input">
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)}/>
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() => postImage()}>
                Submit post
            </button>
        </div>
    );
};

export default CreatePost;