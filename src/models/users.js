const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Tasks = require('./tasks')

const userSchema = new mongoose.Schema( {
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
        unique: true,   
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps:true
})

//setting up virtual property for mapping
userSchema.virtual('tasks',{
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
})

//For a specific user===> instance methods
// userSchema.methods.toJSON = async () => {
//     const user = this
//     const userObj = user.toObject()
//     delete userObj.password
//     delete userObj.tokens
//     return userObj
// }

//For a specific user===> instance methods
userSchema.methods.generateAuthToken = async (user) => {
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
    user.tokens = user.tokens .concat({ token })
    await user.save()
    return token
}

// For User collection as a whole====> model method
userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({ email })
    if(!user){
        throw new Error('Unable to Login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to Login. Incorrect Password')
    }
    return user
}

//middleware to hash the plaintext password.
userSchema.pre('save',async function (next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//middleware to cascade delete all tasks.
userSchema.pre('remove',async function (next) {
    const user = this
    await Tasks.deleteMany({owner:user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User