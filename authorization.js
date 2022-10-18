const jwt = require('jsonwebtoken')
const postModel = require('./models/post.model')
module.exports = (req, res, next) => {
    if (req.headers['authorization']) {
        const token = req.headers['authorization'].split(' ')[1]
        if (!token) {
            res.send("Please Send The token")
        }
        else {
            jwt.verify(token, 'TopVerySecret', async function (err, data) {
                if (err) {
                    res.send("In-valid Token")
                }
                else {

                    let userId = data.id
                    let postId = req.params.id
                    let post = await postModel.findById(postId)
                    if (post.createdBy.equals(userId)) {
                        next()
                    }
                    else res.status(500).send("You are not authorized to do this action")
                }
            })
        }
    }
    else {
        res.send("Please Send The token")
    }

}