import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Listing extends Component{
    constructor(){
        super();
        this.state={
            post: []
        }
    }
    componentDidMount(){
        axios.get(`/posts/listing/${this.props.match.params.id}`).then(res => {
            console.log('res', res.data)
            this.setState({
                post: res.data
            })
        }
        )
    }
    render(){
        const info = this.state.post.map(e => {
            return (
                <div>
                    <div>{e.item}</div>
                    <div>${e.price}</div>
                    <img src={e.images}/>
                    <div>{e.description}</div>
                    <div>{e.time_posted}</div>
                    {/* <div>{post.item}</div>
                    <div>{post.item}</div> */}
                </div>
        )})
        return(
            <div>
                <Link to='/'>Home</Link>
                <Link to='/profile'>Profile</Link>
                <Link to='/post'>Post To Listings</Link>
                <Link to='/login'>Login/Register</Link>
                {info}
            </div>
        )
    }
}

export default Listing;