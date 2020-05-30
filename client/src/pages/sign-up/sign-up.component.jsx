import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import './sign-up.styles.css';

const SignUp = () => {
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ image, setImage ] = useState("");
    const [url, setUrl] = useState(undefined);
    const history = useHistory();

    useEffect(() => {
        if(url) {
         uploadPostData();
        }
    }, [url])

    const uploadImage = async () => {
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

    const uploadPostData = async () => {
        try{
            const userData = await fetch('http://localhost:5000/signup', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    pic: url
                })
            });

            const userJSON = await userData.json();
            console.log(userJSON)
            if(userJSON.error) {
                M.toast({ 
                    html: userJSON.error, 
                    classes: "#c62828 red darken-3"
                });
            } else if (userJSON.errors){
                M.toast({ 
                    html: userJSON.message, 
                    classes: "#c62828 red darken-3"
                });
            } else{
                M.toast({
                    html: userJSON.message,
                    classes: "#43a047 green darken-1"
                });
                history.push('/signin');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const postData = async() => {
       if(image) {
        uploadImage();
       } else {
        uploadPostData();
       }
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Microgram</h2>
                <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className="file-field">
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Upload Profile</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() => postData()}>
                    Signup
                </button>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    );
};

export default SignUp;