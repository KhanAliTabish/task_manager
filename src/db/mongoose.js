const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task_manager_api',{ useNewUrlParser: true, useCreateIndex: true })

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('age must be positive number')
            }

        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    }
})

const me = new User({
    name: 'Ali',
    email: 'ali@'
})

me.save().then(() => {
    console.log(me)
}).catch((err) => {
    console.log(err)
})

const Tasks = mongoose.model('Tasks',{
    description :{
        type: String
    },
    completed: {
        type: Boolean
    }
})

// const task = new Tasks({
//     description: 'Some important work',
//     completed: true
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((err) => {
//     console.log(err)
// })
