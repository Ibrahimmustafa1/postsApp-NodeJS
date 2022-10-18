const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    if(req.headers['authorization']){
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
                    req.user = data;
                    next()
                }
            })
        }
    }
    else
    {
        res.send("Please Send The token")
    }
 
}