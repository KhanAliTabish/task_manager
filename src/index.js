const express = require('express')
require('./db/mongoose')
const User = require('./models/users')
const Tasks = require('./models/tasks')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000

// parsing json
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Magic happens at port ',port)
})