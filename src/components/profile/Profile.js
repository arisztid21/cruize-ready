import React, { Component } from 'react';
import './Profile.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cruize from './cruize-ready-logo.png';

class Profile extends Component {
  constructor(){
    super();
    this.state={
      editing: false,
      item: '',
      description: '',
      price: '',
      user: '',
      posts: []
    }
    this.deletePost=this.deletePost.bind(this);
    this.updatePost=this.updatePost.bind(this);
  }
  componentDidMount(){
    axios.get(`/posts/profile`).then(res => {
      this.setState({
        posts: res.data
      })
    }).then(axios.get('/user/info').then(response => {
      // console.log(response)
      this.setState({
          user: response.data
      })
  }))
  }
  deletePost(id){
    axios.delete(`/posts/delete/${id}`)
    .then(newPosts => {
      console.log('newPosts', newPosts)
      this.setState({
        posts: newPosts.data
      })
    })
    .catch(err => console.log('error in delete post function in profile component', err));
  }
  inputFunction = (key, id, val) => {
    let postsCopy = [...this.state.posts]
    postsCopy.filter(e => e.id === id)[0][key] = val
    this.setState({
      posts: postsCopy
    })
  }
  updatePost(id){
    console.log('state', this.state)
    const post = this.state.posts.filter(e => e.id === id)[0]
    axios.patch(`/posts/${id}`, post)
    .then(res => {
      this.setState({
      editing: false
    }, alert('your post has been updated successfully!'))})
  }
  render() {
    const posts = this.state.posts.map(post => {
      return <div className='profile-posts' key = {post.id}>
        <div><input className='edit-item-name' onClick={()=>this.setState({editing: true})} onChange={(e)=>this.inputFunction('item', post.id, e.target.value)} value={post.item}/></div>
        <div className='profile-images'><img src={post.images} alt='images'/></div>
        <div><textarea className='edit-description' onClick={()=>this.setState({editing: true})} onChange={(e)=>this.inputFunction('description', post.id, e.target.value)} value={post.description}/></div>
        <div>$<input className='edit-price' onClick={()=>this.setState({editing: true})} onChange={(e)=>this.inputFunction('price', post.id, e.target.value)} value={post.price}/></div>
        <div>{post.time_posted}</div>
        <button className='delete-post' onClick={()=>this.deletePost(post.id)}>Delete Post</button>
        {this.state.editing && <button className='edit-post' onClick={()=>this.updatePost(post.id)}>Edit Post</button>}
      </div>
    })
    return (
      <div className="Home">
      <div className='header'>
      <img className='logo' src={cruize} alt='logo'/>
      <div className='cruize'>
      "Get your car Cruize Ready Today"
      </div>
        <Link to='/'>Home</Link>
        <Link to='/post'>Post To Listings</Link>
        <Link to='/login'>Login/Register</Link>
        </div>
        { this.state.user ?
        <div className='profile-post'>
        {posts}
        </div>
        :
        <div className='login-profile-message'> you must login before you can review your profile.</div>
        }
      </div>
    );
  }
}

export default Profile;