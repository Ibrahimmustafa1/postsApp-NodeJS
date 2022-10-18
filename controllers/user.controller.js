let userModel=require('../models/user.model')
let jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt')
let signup = async (req, res) => {
    try{
        const { email, password ,name} = req.body;
        const user = new userModel({ email, password,name });
        await user.save();
        res.json({ status: 'User Saved' });
    }
    catch(e){
        res.status(500).send({ msg: e.message })
    }

}   

let login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            let match = bcrypt.compareSync(password, user.password);
            if (match) {
                res.json({ status: 'User Logged In' ,userId:user._id,token:jwt.sign({id:user._id,posts:user.posts},'TopVerySecret')});
            }
            else {
                res.status(500).send({ status: 'Wrong Password' });
            }
        }
        else {
            res.status(500).json({ status: 'User Not Found' });
        }
    }
    catch(e){
        res.status(500).send({ msg: e.message })
    }

}

module.exports = { signup, login };