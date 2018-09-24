module.exports={
    //creates a post with the users id to keep track of who posted what
    createPost: (req, res) => {
        const db = req.app.get('db');
        const time_posted = new Date().toUTCString().split(' ').splice(1, 4).join(' ');
        const {images, item, beginning_year, ending_year, description, price, category} = req.body;
        db.create_post([+req.session.user.id, category, item, time_posted, +beginning_year, +ending_year, +price, description, images])
        .then(() => res.status(200).send('post created'))
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
        // console.log(req.query)
        const {category, item, part_year} = req.query;
        db.user_posts_search([category, item, part_year])
        .then(results => res.status(200).send(results))
        .catch(err => console.log('error in get search results controller', err))
    },
    //used as a patch to update a certain input in the user's post
    updatePost: (req, res) => {
        const db = req.app.get('db');
        const {price, description} = req.body;
        // console.log(req.body);
        const {id} = req.params;
        // console.log(req.params)
        db.update_post([price, description, id, req.session.user.id])
        .then(update => res.status(200).send(update))
        .catch(err => console.log('error in update post controller', err))
    },
    deletePost: (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        db.delete_post([id, req.session.user.id])
        .then(posts => res.status(200).send(posts))
        .catch(err => console.log('error in delete post controller', err));
    }
}