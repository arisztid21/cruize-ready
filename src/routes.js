import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/home/Home';
import Auth from './components/auth/auth';
import Post from './components/Post/Post';
import Profile from './components/profile/Profile';
import Listing from './components/Listing/Listing';

export default
<Switch>
    <Route path='/' exact component={Home}/>
    <Route path='/login' component={Auth}/>
    <Route path='/post' component={Post}/>
    <Route path='/profile' component={Profile}/>
    <Route path='/listing/:id' component={Listing}/>
    <Route path='/' render={ () => {
        return <div>you are not authorized to be here!</div>}} />
</Switch>
   