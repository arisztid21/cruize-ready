import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import axios from 'axios';
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
      images: ''
    }
    this.inputFunction = this.inputFunction.bind(this);
    this.addNewPost=this.addNewPost.bind(this);
  }
  addNewPost(){
    axios.post(`/posts`, this.state).then(res => {
      console.log('hit', res.data);
      this.setState({
        state: res.data
      })})
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
        <h1>Post</h1>
        {/* <input type='text' value={this.state.category} onChange={e=>this.inputFunction('category', e.target.value)} placeholder='category'/> */}
        <select value={this.state.category} onChange={e=>this.inputFunction('category', e.target.value)}> 
          <option value={1}>Lighting</option>
          <option value={2}>Engine</option>
          <option value={3}>Interior</option>
          <option value={4}>Accessories</option>
          <option value={5}>Wheels</option>
          <option value='' selected >select category</option>
        </select>
        <input type='text' value={this.state.item} onChange={e=>this.inputFunction('item', e.target.value)} placeholder='item name'/>
        <input type='number' value={this.state.beginning_year} onChange={e=>this.inputFunction('beginning_year', e.target.value)} placeholder='year created'/>
        <input type='number' value={this.state.ending_year} onChange={e=>this.inputFunction('ending_year', e.target.value)} placeholder='last year created'/>
        <input type='number' value={this.state.price} onChange={e=>this.inputFunction('price', e.target.value)} placeholder='price'/>
        <input type='text' value={this.state.description} onChange={e=>this.inputFunction('description', e.target.value)} placeholder='description'/>
        <input type='text' value={this.state.images} onChange={e=>this.inputFunction('images', e.target.value)} placeholder='images'/>
        <button onClick={()=>this.addNewPost()}>Create Post</button>
      </div>
    );
  }
}

export default Post;
