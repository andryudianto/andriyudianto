const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const { ObjectId } = require('mongodb')
const db = require('../connection')
const User = db.collection('users')

module.exports = class Auth{
    static authentication(req, res, next){
        const verified = jwt.verify(req.headers.token, "mswingsfour")
        if (!verified) {
            throw createError(401, "You don't have any access")
        }
        next()
    }

    static authorization(req, res, next) {
        const { id } = req.params
        User.findOne({
            _id: ObjectId(id)
        })
        .then(user => {
            if (!user){
                throw createError(400, "You are not authorized")
            }
            next()
        })
        .catch(error => {
            next(error)
        })
    }
}