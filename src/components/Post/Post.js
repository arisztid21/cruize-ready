import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cruize from './cruize-ready-logo.png';
import './Post.css';

class Post extends Component {
  constructor(){
    super ();
    this.state={
      category: '',
      item: '',
      beginning_year: '',
      ending_year: '',
      price: '',
      description: '',
      images: '',
      user: ''
    }
    this.inputFunction = this.inputFunction.bind(this);
    this.addNewPost=this.addNewPost.bind(this);
  }
  componentDidMount(){
    axios.get('/user/info').then(response => {
      console.log(response)
      this.setState({
          user: response.data
      })
  })
  }
  addNewPost(){
    axios.post(`/posts`, this.state).then(res => {
      console.log('hit', res.data);
      this.setState({
        state: res.data
      })}, alert('Your post has been added to the listings successfully!'))
      .catch(err => console.log('problem in axios post input function', err))
    }
  inputFunction(key, val){
    this.setState({
      [key]: val
    })
  }
  render() {
    return (
      <div className="Post">
      <div className='header'>
      <img className='logo' src={cruize} alt='logo'/>
      <div className='cruize'>
      "Get your car Cruize Ready Today"
      </div>
        <Link to='/'>Home</Link>
        <Link to='/profile'>Profile</Link>
        <Link to='/login'>Login/Register</Link>
        </div>
        {this.state.user ?
        <div className='post-inputs'>
        <div className='post-top-inputs'>
        <select className='post-category' value={this.state.category} onChange={e=>this.inputFunction('category', e.target.value)}> 
          <option value={1}>Lighting</option>
          <option value={2}>Engine</option>
          <option value={3}>Interior</option>
          <option value={4}>Accessories</option>
          <option value={5}>Wheels</option>
          <option value='' selected >select category</option>
        </select>
        <input className='post-item' type='text' value={this.state.item} onChange={e=>this.inputFunction('item', e.target.value)} placeholder='item name'/>
        <input className='post-year-created' type='number' value={this.state.beginning_year} onChange={e=>this.inputFunction('beginning_year', e.target.value)} placeholder='year created'/>
        <input className='post-year-ended' type='number' value={this.state.ending_year} onChange={e=>this.inputFunction('ending_year', e.target.value)} placeholder='last year created'/>
        <input className='post-price' type='number' value={this.state.price} onChange={e=>this.inputFunction('price', e.target.value)} placeholder='price'/>
        </div>
        <div className='post-description-input'><textarea className='post-description' type='text' value={this.state.description} onChange={e=>this.inputFunction('description', e.target.value)} placeholder='description'/></div>
        <div className='post-images-input'><input className='post-images' type='text' value={this.state.images} onChange={e=>this.inputFunction('images', e.target.value)} placeholder='images'/></div>
        <button className='create-post' onClick={()=>this.addNewPost()}>Create Post</button>
        </div>
        :
        <div className='login-post-message'> you must login before you can post to listings.</div>
        }
      </div>
    );
  }
}

export default Post;
