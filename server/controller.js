require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports={
    //creates a post with the users id to keep track of who posted what
    createPost: (req, res) => {
        const db = req.app.get('db');
        const time_posted = new Date().toUTCString().split(' ').splice(1, 4).join(' ');
        const {images, item, beginning_year, ending_year, description, price, category} = req.body;
        db.create_post([+req.session.user.id, category, item, time_posted, +beginning_year, +ending_year, +price, description, images])
        .then(() =>{
            let transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                  user: 'no.reply.cruize.ready@gmail.com',
                  pass: process.env.EMAIL_PASSWORD
              }  
            });

            const mailOptions = {
                from: 'no.reply.cruize.ready@gmail.com',
                to: 'no.reply.cruize.ready@gmail.com',
                subject: 'New Post: check it out',
                html: `<body>
                    <div>
                        <h1>post by:${req.session.user.username}</h1>
                        <h1>item name: ${item}</h1>
                        <h1>description: ${description}</h1>
                    </div>
                </body>`
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if(err){
                  console.log(err)
                }else{
                  console.log(info);
             }});
        })
        .catch(err=> console.log('error in create post controller', err))
    },
    //renders all and any searches to home page
    getAllPosts: (req, res) => {
        const db = req.app.get('db');
        db.get_all_posts()
        .then(posts => res.status(200).send(posts))
        .catch(err => console.log('error in get all posts controller', err))
    },
    //to show all search results with the included fields
    getSearchResults: (req, res) => {
        const db = req.app.get('db');
        const {category, item, part_year} = req.query;
        db.user_posts_search([category, item, part_year])
        .then(posts => res.status(200).send(posts))
        .catch(err => console.log('error in get search results controller', err))
    },
    //used as a patch to update a certain input in the user's post
    updatePost: (req, res) => {
        const db = req.app.get('db');
        const {item, price, description} = req.body;
        const {id} = req.params;
        db.update_post([item, price, description, id, req.session.user.id])
        .then(update => res.status(200).send(update))
        .catch(err => console.log('error in update post controller', err))
    },
    deletePost: (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        db.delete_post([id, req.session.user.id])
        .then(posts => res.status(200).send(posts))
        .catch(err => console.log('error in delete post controller', err));
    },
    //used to get a specific users posts in his profile
    getAllUserPosts: (req, res) => {
        const db = req.app.get('db');
        db.get_all_user_posts([req.session.user.id])
        .then(posts => res.status(200).send(posts))
        .catch(err => console.log('error in get all user posts controller', err));
    },
    //used to review the info of a chosen or clicked on post
    getPostInfo: (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        db.post_info([id])
        .then(info => res.status(200).send(info))
        .catch(err => console.log('error in get post info controller', err));
    },
    //gets seller's email for buyer to contact seller
    getSellerEmail: (req, res) => {
        const db = req.app.get('db');
        const {seller_id} = req.params;
        db.find_seller_email([seller_id])
        .then(info => {
            res.status(200).send(info)
        })
        .catch(err => console.log('error in get seller email controller', err));
    }
}