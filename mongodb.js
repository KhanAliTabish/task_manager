const mongodb = require('mongodb')
const {MongoClient, ObjectID} = mongodb 

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task_manager'

// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (err, client) => {
    if(err){
        return console.log("Unable to connect to database")
    }
    console.log("Database connected successfully")
    const db = client.db(databaseName)

    db.collection('users').findOne({
        name:'Tabish'
    }, (err, user) => {
        if(err){
            return console.log('Unable to fetch Users')
        }
        console.log(user)
    })

    db.collection('users').find({ age: 23 }).toArray((err, users) => {
        if(err){
            return console.log('Unable to insert Users')
        }
        console.log(users)
    })

    // db.collection('tasks').insertMany([{
    //     description:'learning nodeJs',
    //     completed:true
    // },{
    //     name: 'Practicing DS and algo',
    //     completed: false
    // },{
    //     description: 'Doing office work',
    //     completed:true
    // }], (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert Users')
    //     }
    //     console.log(result.ops)
    // })
})