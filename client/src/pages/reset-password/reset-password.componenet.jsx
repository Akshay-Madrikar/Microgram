import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';
import './reset-password.styles.css';

const ResetPassword = () => {
    const [ email, setEmail ] = useState("");

    const history = useHistory();

    const postData = async() => {
        try{
            const userData = await fetch('/reset-password', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
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
                <input type="email" placeholder="email address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() => postData()}>
                    Reset Password
                </button>
            </div>
      </div>
    );
};

export default ResetPassword;