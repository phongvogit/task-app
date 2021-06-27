const express = require('express')
require('../db/mongoose')
const User = require('../model/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body) 
    console.log(user)
    try{
        await user.save()
        res.status(200).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        return res.status(200).send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/users', auth, async (req, res) => {
    try{
        const users = await User.find({})
        res.status(200).send(users)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try{
        const users = await User.findByIdAndDelete(req.params.id)
        res.status(200).send(users)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router
