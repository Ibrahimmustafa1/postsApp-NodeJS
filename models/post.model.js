const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: String,
    content: String,
    imgPath: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

// PostSchema.post('init', function(doc){
//     doc.imgPath = 'http://localhost:3000/'+doc.imgPath;
// })

module.exports = mongoose.model('Post', PostSchema);