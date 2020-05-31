import React, {useEffect, useState, useContext} from 'react';
import {UserContext} from '../../App';
import './profile.styles.css';

const Profile = () => {
    const [post, setPost] = useState([]);
    const {state, dispatch} = useContext(UserContext);
    const [ image, setImage ] = useState("");

    const myPostDetails = async () => {
        try{
            const postData = await fetch('/mypost', {
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

    const updatePicture = async (file) => {
        setImage(file);
    };

    const updatePictureData = async() => {
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
            console.log(imgJSON)

            const imgData = await fetch('/updatePicture', {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    pic: imgJSON.url
                }) 
            });

            const imgDataJSON = await imgData.json();
            console.log(imgDataJSON)
            localStorage.setItem('user', JSON.stringify({ ...state, pic: imgDataJSON.pic }));
            dispatch({
                type: 'UPDATE_PIC',
                payload: imgDataJSON.pic
            });
        } catch(error) {
            console.log(error);
        };
    }

    useEffect(() => {
        myPostDetails();
    },[]);

    useEffect(() => {
        if(image) {
         updatePictureData();
        }
    }, [image])

    return (
        <div className="main-profile">
            <div className="inner-div">
                <div className="inner-div-2">
                    <img className="profile-pic" src={state ? state.pic : 'Loading...'}
                    alt=""/>
                    <div className="file-field input-field pic-btn">
                        <div className="btn #64b5f6 blue darken-1">
                            <span>Update pic</span>
                            <input type="file" onChange={(e) => {
                                updatePicture(e.target.files[0]);
                                e.target.value = '';
                            }}
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"/>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>{state ? state.username : 'Loading...'}</h4>
                    <div className="info">
                        <h6>{post.length} posts</h6>
                        <h6>{state ? state.followers.length : 'loading...'} followers</h6>
                        <h6>{state ? state.following.length : 'loading...'} following</h6>
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