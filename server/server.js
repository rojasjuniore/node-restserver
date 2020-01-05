require('./config/config')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')




// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.get('/users', (req, res) => {
    res.json('Hello World Users get')
})

app.post('/users', (req, res) => {

    let body = req.body

    if (body.name === undefined) {
        res.status(400).json({
            ok: false,
            error: "el nombre es necesario"
        })
    } else {
        res.json(
            body
        )
    }


})

app.put('/users/:id', (req, res) => {
    let id = req.params.id
    res.json({
        id
    })
})

app.delete('/users', (req, res) => {
    res.json('Hello World Users put')
})

app.listen(process.env.PORT, () => {
    console.log(`Escuachando puerto  ${process.env.PORT}`)
})