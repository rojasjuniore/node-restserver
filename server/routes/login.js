const express = require('express')
const app = express()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user')


app.post('/login', (req, res) => {

    let body = req.body

    User.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: "Este usuario (o contraseña) incorrentos"
            })
        }


        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: "Este usuario (o contraseña) incorrentos"
            })
        }


        let token = jwt.sign({
            user: userDB,
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })

        res.json({
            status: true,
            userDB: userDB,
            token
        })

    })
})



module.exports = app;