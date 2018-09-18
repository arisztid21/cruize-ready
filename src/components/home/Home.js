import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';

class Home extends Component {
  constructor(){
    super();
    this.state={
      posts: []
    }
  }
  componentDidMount(){
    axios.get(`/posts`).then(res => {
      this.setState({
        posts: res.data
      })
    })
  }
  render() {
    console.log(this.state.posts[0] ? this.state.posts[0].images : 'not loaded')
    const posts = this.state.posts.map(post => {
      return <div key = {post.id}>
        <div>{post.item}</div>
        <img src={post.images ? post.images : 'no image found'}/>
        {/* <div>{post.description}</div> */}
        <div>${post.price}</div>
        <div>{post.time_posted}</div>
      </div>
    })
    return (
      <div className="Home">
        <h1>Home</h1>
        {posts}
      </div>
    );
  }
}

export default Home;
