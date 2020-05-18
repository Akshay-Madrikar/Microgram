import React from 'react';
import Navbar from './components/navbar/navbar.component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home/home.component';
import SignIn from './pages/sign-in/sign-in.component';
import Profile from './pages/profile/profile.component';
import SignUp from './pages/sign-up/sign-up.component';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/signin" component={SignIn}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/profile" component={Profile}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
