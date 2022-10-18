const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
    ]
});

UserSchema.pre('save', async function (next) {
    let user = this;
    user.password = bcrypt.hashSync(user.password, 10);
    next();
})

module.exports = mongoose.model('User', UserSchema);