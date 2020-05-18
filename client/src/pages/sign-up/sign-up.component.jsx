import React from 'react';
import { Link } from 'react-router-dom';
import './sign-up.styles.css';

const SignUp = () => {
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Microgram</h2>
                <input type="text" placeholder="username"/>
                <input type="text" placeholder="email"/>
                <input type="text" placeholder="password"/>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1">
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