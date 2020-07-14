const jwt = require('jsonwebtoken')
const User = require('../models/users')

const auth = async (req, res, next) => {
    try{
        console.log(req.header('Authorization'))
        const token = req.header('Authorization').replace('Bearer ','')
        const decode = jwt.verify(token, 'thisismynewcourse')
        const user = await User.findById({_id:decode._id, 'tokens.token':token})
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    }catch(err){
        res.status(401).send({ 'error': 'Authentication Failure'})
    }
}

module.exports = auth