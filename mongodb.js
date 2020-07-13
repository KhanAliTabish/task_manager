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

    db.collection('tasks').updateOne({
        _id: new ObjectID("5f0c41818deeaf0f549b3a4c")
    },{
        $set: {
            description: "doing somework from office"
        }
    }).then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })

    db.collection('users').updateMany({
        age: 23
    },{
        $set: {
            profession: "SDE-1"
        }
    }).then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })


})