import React, { useContext, useRef, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import M from 'materialize-css';
import './navbar.styles.css';

const Navbar = () => {
    const [search, setSearch] = useState("");
    const [userDetails, setUserDetails] = useState([]);
    const { state, dispatch } = useContext(UserContext);
    const searchModal = useRef(null);
    const history = useHistory();

    useEffect(() => {
        M.Modal.init(searchModal.current);
    },[]);
    
    const renderList = () => {
        if(state) {
            return [
                <li key="search"><i data-target="modal1" className="large material-icons modal-trigger search-bar">search</i></li>,
                <li key="profile"><Link to="/profile">Profile</Link></li>,
                <li key="createPost"><Link to="/create">Create Post</Link></li>,
                <li key="subscribedUserPost"><Link to="/followingPosts">Following</Link></li>,
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

    const fetchUsers = async(query) => {
        setSearch(query);

        const users = await fetch('/search-users', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               query
            })
        });

        const usersJSON = await users.json();
        setUserDetails(usersJSON.user);
    }

    return (
        <nav>
            <div className="nav-wrapper white main-navbar">
            <Link to={ state ? '/' : '/signin' } className="brand-logo left">Microgram</Link>
                <ul id="nav-mobile" className="right">
                    { renderList() }
                </ul>
            </div>

            <div id="modal1" className="modal" ref={searchModal}>
                <div className="modal-content">
                    <input type="text" 
                    placeholder="search users" 
                    value={search} 
                    onChange={(e) => {
                        fetchUsers(e.target.value);
                    }}
                    />
                    <ul className="collection">
                        { 
                            userDetails.map( user => {
                                return (
                                    <Link key={user._id} to={ user._id !== state._id ? `/profile/${user._id}` : '/profile'}
                                    onClick={() => {
                                        M.Modal.getInstance(searchModal.current).close();
                                        setSearch('');
                                    }}
                                    >
                                        <li  className="collection-item">{user.username}</li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat" onClick={() => setSearch('')}>Close</button>
                </div>
            </div>
        </nav>
    );

};

export default Navbar;