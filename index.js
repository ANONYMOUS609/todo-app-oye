const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

const db = require('./routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/api/create', db.createTodo)
app.delete('/api/:id', db.deleteTodo)
app.put('/api/:id', db.updateTodo)
app.get('/api', db.searchTodos)

app.listen(port, () => {
    console.log(`app is running on port : ${port}`);
})