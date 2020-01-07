require('./config/config')
const colors = require('colors');
const express = require('express')
const mongoose = require('mongoose');

const app = express()
const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/user'))

mongoose.connect(process.env.urlDB,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw err;
        console.log('Base de datos online'.green)
    });

app.listen(process.env.PORT, () => {
    console.log(`Escuachando puerto  ${process.env.PORT}`.green)
})