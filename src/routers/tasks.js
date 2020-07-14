const express = require('express')
const router = new express.Router()
const Tasks = require('../models/tasks') 
const auth = require('../middleware/auth')


router.post('/tasks', auth, async (req, res) => {
    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(err){
        res.status(400).send(err)
    }

})

//GET /tasks?completed=''
//GET /tasks?limit=10&skip=1
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    try{
        //const tasks = await Tasks.find({ owner: req.user._id})
       const match = {}
       const sort = {}
       if( req.query.completed){
           match.completed =  req.query.completed === 'true'
       }
       if( req.query.sortBy){
           const parts = req.query.sortBy.split(':')
           sort[parts[0]] = parts[1] === 'desc'?-1:1

       }
       console.log(match)
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.status(200).send(req.user.tasks)
    }catch(err){
        res.status(400).send(err)
    }
})

router.get('/tasks/:id',auth, async (req, res) => { 
    try{
        //const task = await Tasks.findById(req.params.id)
        const task = await Tasks.findOne({ _id:req.params.id, owner: req.user._id})
        if(!task) return res.status(404).send()
        res.status(201).send(task)
    }catch(err){
        res.status(400).send(err)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send({"error": 'Invalid updates !!'})
    }
    try{
         //const task = await Tasks.findById(req.params.id)
         const task = await Tasks.findOne({ _id:req.params.id, owner: req.user._id})
         if(!task) return res.status(404).send()
         updates.forEach((update) => task[update] = req.body[update])
         await task.save()
         res.status(201).send(task)
    }catch(err){
        res.status(400).send(err)
    }
})

router.delete('/tasks/:id',auth, async (req, res) => {
    try{
        const task = await Tasks.findOneAndDelete({ _id:req.params.id, owner: req.user._id })
        if(!task) return res.status(404).send()
        res.status(200).send(task)
    }catch(err){
        res.status(400).send(err)
    }
})

module.exports = router