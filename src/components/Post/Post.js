import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cruize from './cruize-ready-logo.png';
import Dropzone from 'react-dropzone';
import './Post.css';

const CLOUDINARY_UPLOAD_PRESET = 'cruizeready';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/arisztid21/image/upload'

export default class Post extends Component {
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
    // this.handleImageUpload=this.handleImageUpload.bind(this);
  }
  componentDidMount(){
    axios.get('/user/info').then(response => {
      console.log(response)
      this.setState({
          user: response.data
      })
  })
  }

  handleImageUpload = (file) => {
    axios.get('/api/upload').then(response => {
        let formData = new FormData();
        formData.append('signature', response.data.signature)
        formData.append('api_key', '774296625574526')
        formData.append('timestamp', response.data.timestamp)
        formData.append('file', file[0]);
        console.log(response.data)
        axios.post(CLOUDINARY_UPLOAD_URL, formData).then(image => {
            console.log('cloud response----',image)
                this.setState({
                    images: image.data.secure_url
                })
    }, alert('Please wait as your preview image is rendered. This may take 5-10 seconds.'))
    }).catch(err => console.log('problem with uploading image file', err))
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
        {/* <div className='post-images-input'><input className='post-images' type='text' value={this.state.images} onChange={e=>this.inputFunction('images', e.target.value)} placeholder='images'/></div> */}
        <div className='dropzone-image'>preview image here<div><img className='dropzone-image-preview' src={this.state.images}/></div></div>
        <div className='dropzone'>
        <Dropzone
          multiple = {false}
          accept = 'image/*'
          onDrop={this.handleImageUpload}
        >
          <p classname='dropzone-text'>Upload Your Image Here</p>
        </Dropzone>
        </div>
        <button className='create-post' onClick={()=>this.addNewPost()}>Create Post</button>
        </div>
        :
        <div className='login-post-message'> You must login before you can post to listings.</div>
        }
      </div>
    );
  }
}
