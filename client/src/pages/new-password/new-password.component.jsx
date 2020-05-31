import React, {useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import M from 'materialize-css';
import './new-password.styles.css';

const NewPassword = () => {
    const [ password, setPassword ] = useState("");
    const history = useHistory();
    const { token } = useParams();
    console.log(token)

    const postData = async() => {
        try{
            const userData = await fetch('/new-password', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password,
                    token
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
                <input type="password" placeholder="enter new password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() => postData()}>
                    Update password
                </button>
            </div>
      </div>
    );
};

export default NewPassword;