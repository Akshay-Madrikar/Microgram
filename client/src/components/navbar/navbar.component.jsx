import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import './navbar.styles.css';

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    
    const renderList = () => {
        if(state) {
            return [
                <li key="profile"><Link to="/profile">Profile</Link></li>,
                <li key="createPost"><Link to="/create">Create Post</Link></li>,
                <li key="logout">
                    <button className="btn waves-effect waves-light #64b5f6 blue darken-1" 
                        onClick={() => {
                            localStorage.clear();
                            dispatch({ type: 'CLEAR' });
                            history.push('/signin');
                    }}>
                        Logout
                    </button>
                </li>
            ]
        } else {
            return[
                <li key="signin"><Link to="/signin">Login</Link></li>,
                <li key="signup"><Link to="/signup">Signup</Link></li>
            ]
        }
    }

    return (
        <nav>
            <div className="nav-wrapper white">
            <Link to={ state ? '/' : '/signin' } className="brand-logo left">Microgram</Link>
                <ul id="nav-mobile" className="right">
                    { renderList() }
                </ul>
            </div>
        </nav>
    );

};

export default Navbar;