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

    

    db.collection('users').deleteOne({
        age: 25
    }).then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })

    db.collection('users').deleteMany({
        age: 23
    }).then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })


})