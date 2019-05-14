import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Listing.css';
import cruize from './cruize-ready-logo.png';

class Listing extends Component{
    constructor(){
        super();
        this.state={
            user: '',
            email: '',
            post: []
        }
    }
    componentDidMount(){
        console.log('routes shit', this.props)
        axios.get(`/posts/listing/${this.props.match.params.id}`).then(res => {
            console.log('post.sellerID',res.data[0].seller_id)
            axios.get(`/user_email/${+res.data[0].seller_id}`).then(response => {
                console.log('response email', response.data)
                this.setState({
                   email: response.data[0].email,
                    post: res.data
                })
            })
        }
        ).then(axios.get('/user/info').then(response => {
            this.setState({
                user: response.data
            })
        }))
    }
    render(){
        console.log('email',this.state.email)
        const info = this.state.post.map(e => {
            return (
                <div key={e.id}>
                    <div className='listing-item'>{e.item}</div>
                    <div className='listing-price'>${e.price}</div>
                    <img className='listing-image' src={e.images} alt='images'/>
                    <div className='listing-description'>{e.description}</div>
                    <div className='listing-date'>{e.time_posted}</div>
                    <div className='listing-years'>fits from:{e.beginning_year} to:{e.ending_year}</div>
                </div>
        )})
        return(
            <div>
                <div className='header'>
                <img className='logo' src={cruize} alt='logo'/>
                <div className='cruize-moto'>
                "Get your car Cruize Ready Today"
                </div>
                <Link to='/'>Home</Link>
                <Link to='/profile'>Profile</Link>
                <Link to='/post'>Post To Listings</Link>
                <Link to='/login'>Login/Register</Link>
                </div>
                {info}
                {this.state.user?<button className='contact-seller'><a href={`mailto:${this.state.email}`} target="_blank" >Contact Seller</a></button>:'You must Login or Create An Account to contact seller.'}
            </div>
        )
    }
}

export default Listing;