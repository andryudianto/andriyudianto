const { ObjectId } = require('mongodb')
const db = require('../connection')
const User = db.collection('users')
const jwt = require('jsonwebtoken')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = class Controller{
    static token(req, res) {
        const token = jwt.sign({
            email: "andriyudianto60@gmail.com",
            id: 4
        }, "mswingsfour")
        res.status(200).json(token)
    }

    static async create(req, res, next){
        try {
            const { userName, accountNumber, emailAddress, identityNumber } = req.body
            const user = await User.insertOne({
                userName, accountNumber, emailAddress, identityNumber
            })
            redis.del("Users")
            res.status(201).json(user.ops[0])
        } catch (error) {
            next(error)
        }
    }

    static async read(req, res, next) {
        try {
            const cacheUsers = await redis.get("Users")
            if (cacheUsers){
                res.status(200).json(JSON.parse(cacheUsers))
            } else {
                const users = await User.find().toArray()
                await redis.set("Users", JSON.stringify(users))
                res.status(200).json(users)
            }
        } catch (error) {
            next(error)
        }
    }

    static async getOne(req, res, next) {
        try {
            const { id } = req.params
            const user = await User.findOne({
                _id: ObjectId(id)
            })
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const { userName, emailAddress } = req.body
            const user = await User.updateOne({
                _id: ObjectId(id)
            }, {
                $set: {
                    userName, emailAddress
                }
            })
            redis.del("Users")
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params
            const result = await User.deleteOne({
                _id: ObjectId(id)
            })
            redis.del("Users")
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
 
}