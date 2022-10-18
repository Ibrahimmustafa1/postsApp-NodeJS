if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const uuid = require('uuid');
const multer = require('multer')
const path = require('path');
const authentecation = require('./authentication')
const authorization = require('./authorization')
const { signup, login } = require('./controllers/user.controller');
const { cloudinary, storage } = require('./cloudnairy/index')


const filefilter = (req, file, cb) => {
    
    if (file.mimetype.startsWith('image')) {

        cb(null, true)
    } else {
        cb(new Error('Not an image! Please upload an image.'))
    }
}
const upload = multer({ storage: storage, fileFilter: filefilter })
const { getPosts, postPost, editPost, deletePost, getPost } = require('./controllers/posts.controller');
const app = express();
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DBCONEECTION, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to database!');
}).catch(e=>{
    console.log(e)
});

app.get('/posts', getPosts)
app.get('/posts/:id', authentecation, getPost);
app.post('/post', authentecation, upload.single('postImg'), postPost)
app.put('/post/:id', authentecation, authorization, upload.single('postImg'), editPost)
app.post('/signup', signup)
app.post('/login', login)
app.delete('/post/:id', authentecation, authorization, deletePost)

app.use('**', (req, res, next) => {
   throw new Error('Not Found');
})
app.use((err, req, res, next) => {
    res.send(err.message);
}
)
app.listen(process.env.PORT||3000, () => console.log(`Example app listening`));