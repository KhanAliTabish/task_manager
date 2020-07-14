const express = require('express')
const router = new express.Router()
const User = require('../models/users')
const auth = require('../middleware/auth')


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try{ 
        await user.save()
        const token = await user.generateAuthToken(user)
        res.status(201).send({user, token})
    }catch(err){
        res.status(400).send(err)
    }
 })
 
 router.get('/users/me', auth, async (req, res) => {
     res.send(req.user)
 })

    
    // router.get('/users/:id', async (req, res) => {
    //      try{
    //          const user = await User.findById(req.params.id)
    //          if(!user) return res.status(404).send()
    //          res.status(201).send(user)
    //      }catch(err){
    //          res.status(400).send(err)
    //      }
    //  })
 
 router.patch('/users/me',auth, async (req, res) => {
     const updates = Object.keys(req.body)
     const allowedUpdates = ["name", "age", "email", "password"]
     const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
     if(!isValidUpdate){
         return res.status(400).send({"error": 'Invalid updates !!'})
     }
     try{
        //  const user = await User.findById(req.params.id)
        //  if(!user) return res.status(404).send()
         updates.forEach((update) => req.user[update] = req.body[update])
         await req.user.save()
         res.status(201).send(req.user)
     }catch(err){
         res.status(400).send(err)
     }
 })
 
 
 router.delete('/users/me', auth, async (req, res) => {
     try{
        //  const user = await User.findByIdAndDelete(req.user._id)
        //  if(!user) return res.status(404).send()
         await req.user.remove()
         res.status(201).send(req.user)
     }catch(err){
         res.status(400).send(err)
     }
 })
 
 router.post('/users/login',async (req, res) => {
     const {email, password } = req.body
     try{
         const user = await User.findByCredentials(email, password)
         const token = await user.generateAuthToken(user)
         res.send({user, token})
     }catch(err){
         res.status(400).send(err)     }
 })

 router.post('/users/logout', auth, async (req, res) => {
     try{
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()
        res.send()
     }catch(err){
        res.status(500).send(err)
     }
 })

 router.post('/users/logoutAll', auth, async (req, res) => {
    try{
       req.user.tokens = []
       await req.user.save()
       res.send()
    }catch(err){
       res.status(500).send(err)
    }
})

module.exports = router