const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task_manager_api',{ useNewUrlParser: true, useCreateIndex: true })

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

// const me = new User({
//     name: 'Ali',
//     age: 23
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((err) => {
//     console.log(err)
// })

const Tasks = mongoose.model('Tasks',{
    description :{
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Tasks({
    description: 'Some important work',
    completed: true
})

task.save().then(() => {
    console.log(task)
}).catch((err) => {
    console.log(err)
})
