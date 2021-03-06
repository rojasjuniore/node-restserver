require('./config/config')
const express = require('express')
const mongoose = require('mongoose');
const path = require('path')
const bodyParser = require('body-parser')
const colors = require('colors')

const app = express()



// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Parse application/json
app.use(bodyParser.json())

// Habilitar Carpeta Public
app.use(express.static(path.resolve(__dirname, '../public')))

// Configuracion Global de ruta
app.use(require('./routes/index'))

mongoose.connect(process.env.urlDB,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw err;
        console.log('Base de datos online'.green)
    });

app.listen(process.env.PORT, () => {
    console.log(`Escuachando puerto  ${process.env.PORT}`.green)
})