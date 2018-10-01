import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cruize from './cruize-ready-logo.png';

class Home extends Component {
  constructor(){
    super();
    this.state={
      category: '',
      item: '',
      part_year: '',
      posts: []
    }
    this.inputSearch=this.inputSearch.bind(this);
    this.search=this.search.bind(this);
  }
  componentDidMount(){
    axios.get(`/posts`).then(res => {
      this.setState({
        posts: res.data
      })
    })
  }
  search(){
    axios.get(`/posts/search?category=${this.state.category}&item=${this.state.item}&part_year=${this.state.part_year}`)
    .then(res => {
      console.log('state', res.data)
      this.setState({
        posts: res.data
      })
    })
  }
  inputSearch(key, val){
    this.setState({
      [key]: val
    })
  }
  render() {
    const posts = this.state.posts.map(post => {
      return <div className="posts" key = {post.id}>
        <Link className='listing' to={`/listing/${post.id}`}><div>{post.item}</div></Link>
        <Link className='listing' to={`/listing/${post.id}`}><img className='post-image' src={post.images} alt='images'/></Link>
        {/* <div>{post.description}</div> */}
        <div>${post.price}</div>
        <div>{post.time_posted}</div>
      </div>
    })
    return (
      <div className="Home">
      <div className='header'>
      <img className='logo' src={cruize} alt='logo'/>
      <div className='cruize'>
      "Get your car Cruize Ready Today"
      </div>
        <Link to='/post'>Post To Listings</Link>
        <Link to='/profile'>Profile</Link>
        <Link to='/login'>Login/Register</Link>
        </div>
        <div className='search-section' >
        <select className='category' value={this.state.category} onChange={e=>this.inputSearch('category', e.target.value)}> 
          <option value={1}>Lighting</option>
          <option value={2}>Engine</option>
          <option value={3}>Interior</option>
          <option value={4}>Accessories</option>
          <option value={5}>Wheels</option>
          <option value='' selected >select category</option>
        </select>
        <input className='item-search' type='text' value={this.state.item} onChange={e=>this.inputSearch('item', e.target.value)} placeholder='item name'/>
        <input className='part-year' type='number' value={this.state.part_year} onChange={e=>this.inputSearch('part_year', e.target.value)} placeholder='vehicle year'/>
        <button className='search-button' onClick={()=>this.search()}>Search</button>
        </div>
        {posts}
      </div>
    );
  }
}

export default Home;
