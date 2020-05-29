import React, { useEffect, createContext, useReducer, useContext } from 'react';
import Navbar from './components/navbar/navbar.component';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Home from './pages/home/home.component';
import SignIn from './pages/sign-in/sign-in.component';
import Profile from './pages/profile/profile.component';
import SignUp from './pages/sign-up/sign-up.component';
import CreatePost from './pages/create-post/create-post.component';
import UserProfile from './pages/user-profile/user-profile.component';
import SubscribedUserPosts from './pages/subscribed-user-posts/subscribed-user-posts.component';
import UserReducer, { INTIAL_STATE } from './reducers/userReducer';
import './App.css';

export const UserContext = createContext();

const AppRouting = () => {
  const history = useHistory();

  // IF user closes window, user should have the state when they revisit
  // So, to maintain the state we get state here also
  const { state, dispatch } = useContext(UserContext);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      dispatch({
        type: 'USER',
        payload: user
      });
    } else {
      history.push('/signin');
    }
  }, [])

  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/signin" component={SignIn}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/create" component={CreatePost}/>
      <Route exact path="/profile/:userId" component={UserProfile}/>
      <Route exact path="/followingPosts" component={SubscribedUserPosts}/>
  </Switch>
  )
};

function App() {
  const [state, dispatch] = useReducer(UserReducer, INTIAL_STATE);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <AppRouting />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
