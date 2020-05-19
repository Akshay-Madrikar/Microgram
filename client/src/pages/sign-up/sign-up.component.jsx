import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import './sign-up.styles.css';

const SignUp = () => {
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const history = useHistory();

    const postData = async() => {
        try{
            const userData = await fetch('http://localhost:5000/signup', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
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

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Microgram</h2>
                <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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