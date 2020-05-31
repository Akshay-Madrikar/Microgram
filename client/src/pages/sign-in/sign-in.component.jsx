import React, {useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import M from 'materialize-css';
import './sign-in.styles.css';

const SignIn = () => {
    const { state, dispatch } = useContext(UserContext);
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const history = useHistory();

    const postData = async() => {
        try{
            const userData = await fetch('/signin', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const userJSON = await userData.json();
            
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
                localStorage.setItem('jwt', userJSON.token);
                localStorage.setItem('user', JSON.stringify(userJSON.user));
                dispatch({
                    type: 'USER',
                    payload: userJSON.user
                });
                M.toast({
                    html: userJSON.message,
                    classes: "#43a047 green darken-1"
                });
                history.push('/');
            }
        } catch (error) {
            console.log({error});
        }
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Microgram</h2>
                <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() => postData()}>
                    Login
                </button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
                <h6>
                    <Link to="/reset-password">Forgot your password?</Link>
                </h6>
            </div>
      </div>
    );
};

export default SignIn;