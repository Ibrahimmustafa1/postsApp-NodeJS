const postModel = require('../models/post.model');
const userModel = require('../models/user.model');

const getPosts = async (req, res) => {
    try{
        const { pageSize, page } = req.query;
        if (!pageSize || !page) {
            pageSize = 2;
            page = 1;
        }
        const posts = await postModel.find().skip((page - 1) * pageSize).limit(pageSize * 1);
        const totalPosts = await postModel.find().countDocuments();
        res.json({ posts, totalPosts });

    }
    catch(e){
        res.status(500).send({ msg: e.message })
    }
}
const postPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = new postModel({ title, content, imgPath: req.file.path, createdBy: req.user.id });
        post.imgPath = req.file.path; 
        await post.save();
        await userModel.findByIdAndUpdate(req.user.id, { $push: { posts: post._id } }, { new: true });
        res.json({ status: 'Post Saved' });
    }
    catch (e) {
        res.send({ msg: e.message })
    }
}

const editPost = async (req, res) => {
    try{
        const { id } = req.params;
        let post;
        if(!req.file){
             post = {
                title: req.body.title,
                content: req.body.content,
                imgPath: req.body.imgPath,
                createdBy: req.user.id
            };
        }
        else {
             post = {
                title: req.body.title,
                content: req.body.content,
                imgPath: req.file.path,
                createdBy: req.user.id
            };
        }
    
        await postModel.findByIdAndUpdate(id, { $set: post }, { new: true });
        res.json({ status: 'Post Updated' });
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }

}

const deletePost = async (req, res) => {
    try {
    await postModel.findByIdAndRemove(req.params.id);
    await userModel.findByIdAndUpdate(req.user.id, { $pull: { posts: req.params.id } }, { new: true });
    await postModel.find();
    res.json({ status: 'Post Deleted' });
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}
const getPost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);
        res.json(post);
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

module.exports = { getPosts, postPost, editPost, deletePost, getPost };