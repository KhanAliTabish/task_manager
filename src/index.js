const express = require('express')
require('./db/mongoose')
const User = require('./models/users')
const Tasks = require('./models/tasks')

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

app.post('/tasks', async (req, res) => {
    const task = new Tasks(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch(err){
        res.status(400).send(err)
    }

})


app.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        res.status(201).send(users)
    }catch(err){
        res.status(400).send(err)
    }
})

app.get('/users/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.status(201).send(user)
    }catch(err){
        res.status(400).send(err)
    }
})

app.get('/tasks', async (req, res) => {
    try{
        const tasks = await Tasks.find({})
        res.status(201).send(tasks)
    }catch(err){
        res.status(400).send(err)
    }
})

app.get('/tasks/:id', async (req, res) => { 
    try{
        const task = await Tasks.findById(req.params.id)
        res.status(201).send(task)
    }catch(err){
        res.status(400).send(err)
    }
})

app.listen(port, () => {
    console.log('Magic happens at port ',port)
})