require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const massive = require('massive');
const app = express();
const c = require('./controller');
const path = require('path')
const saltRounds = 13;

app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('database is live')
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 1000*60*60*24*30
    }
  }));
  app.use(express.static(`${__dirname}/../build`));
  
  app.post('/register', (req, res) => {
    const db = app.get('db');
    const { email, username, password, phoneNumber } = req.body;
    bcrypt.hash(password, saltRounds).then(hashedPassword => {
      db.create_user([email, username, hashedPassword, phoneNumber]).then((users) => {
        req.session.user = { username, id: users[0].id };
        res.json({ user: req.session.user })
      }).catch(error => {
        console.log('error', error);
        res.status(500).json({ message: 'Something bad happened! '})
      });
    })
  });

  app.get('/user_info', (req, res) => {
    res.json(req.session.user)
})
  app.get('/user/info', (req, res) => {
    res.json(req.session.user.username)
})
  
  app.post('/login', (req, res) => {
    const db = app.get('db');
    const { username, password } = req.body;
    db.find_user([username]).then(users => {
      if (users.length) {
        bcrypt.compare(password, users[0].password).then(passwordsMatched => {
          if (passwordsMatched) {
            req.session.user = { username: users[0].username, id: users[0].id };
            res.json({ user: req.session.user });
          } else {
            res.status(403).json({ message: 'Wrong password' })
          }
        })
      } else {
        res.status(403).json({ message: "That user is not registered" })
      }
    });
  });
  
  app.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send();
  });



app.post(`/posts`, c.createPost);

app.get(`/posts`, c.getAllPosts);

app.get(`/posts/search`, c.getSearchResults);

app.patch(`/posts/:id`, c.updatePost);

app.delete(`/posts/delete/:id`, c.deletePost);  

app.get(`/posts/profile`, c.getAllUserPosts);

app.get(`/posts/listing/:id`, c.getPostInfo);




app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

const port = 4000;
app.listen(port, ()=>console.log(`server listening on port ${port}`))