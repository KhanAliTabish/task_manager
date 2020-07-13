const express = require('express')
require('./db/mongoose')
const User = require('./models/users')
const Tasks = require('./models/tasks')
const { findByIdAndDelete } = require('./models/users')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
   const user = new User(req.body)
   try{
       await user.save()
       res.status(201).send(user)
   }catch(err){
       res.status(400).send(err)
   }
})

app.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        if(!users) return res.status(404).send()
        res.status(201).send(users)
    }catch(err){
        res.status(400).send(err)
    }
})

app.get('/users/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).send()
        res.status(201).send(user)
    }catch(err){
        res.status(400).send(err)
    }
})

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "age", "email", "password"]
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send({"error": 'Invalid updates !!'})
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true , runValidators:true })
        if(!user) return res.status(404).send()
        res.status(201).send(user)
    }catch(err){
        res.status(400).send(err)
    }
})


app.delete('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) return res.status(404).send()
        res.status(201).send(user)
    }catch(err){
        res.status(400).send(err)
    }
})


app.post('/tasks', async (req, res) => {
    const task = new Tasks(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch(err){
        res.status(400).send(err)
    }

})

app.get('/tasks', async (req, res) => {
    try{
        const tasks = await Tasks.find({})
        if(!tasks) return res.status(404).send()
        res.status(201).send(tasks)
    }catch(err){
        res.status(400).send(err)
    }
})

app.get('/tasks/:id', async (req, res) => { 
    try{
        const task = await Tasks.findById(req.params.id)
        if(!task) return res.status(404).send()
        res.status(201).send(task)
    }catch(err){
        res.status(400).send(err)
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send({"error": 'Invalid updates !!'})
    }
    try{
        const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true , runValidators:true })
        if(!task) return res.status(404).send()
        res.status(201).send(task)
    }catch(err){
        res.status(400).send(err)
    }
})

app.delete('/tasks/:id', async (req, res) => {
    try{
        const task = await Tasks. findByIdAndDelete(req.params.id)
        if(!task) return res.status(404).send()
        res.status(201).send(task)
    }catch(err){
        res.status(400).send(err)
    }
})

app.listen(port, () => {
    console.log('Magic happens at port ',port)
})