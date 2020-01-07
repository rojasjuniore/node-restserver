const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const _ = require('underscore')
const User = require('../models/user')

app.post('/users', (req, res) => {

    let body = req.body

    let user = new User({
        name: body.name,
        email: body.email,
        age: body.age,
        rol: body.rol,
        password: bcrypt.hashSync(body.password, 10),
    })


    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        // userDB.password = null
        res.json({
            status: true,
            user: userDB
        })
    })
})


app.put('/user/:id', (req, res) => {
    let id = req.params.id
    let body = _.pick(req.body, ['name', 'email', 'img', 'rol', 'status'])


    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            status: true,
            user: userDB
        })
    })


})


app.get('/users', (req, res) => {

    let desde = Number(req.query.desde) || 0
    let limit = Number(req.query.limit) || 5

    User.find({ status: true }, 'name email age')
        .skip(desde)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            User.count({ status: true }, (err, count) => {
                res.json({
                    status: true,
                    count: count,
                    users: users
                })
            })

        })
})


app.delete('/users/:id', (req, res) => {
    let id = req.params.id

    // User.findByIdAndRemove(id, (err, userRemove) => {
    let changeStatus = {
        status: false
    }
    User.findByIdAndUpdate(id, changeStatus, { new: true }, (err, userRemove) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!userRemove) {
            return res.status(400).json({
                ok: false,
                err: "Usuario no encontrado"
            })
        }

        res.json({
            status: true,
            user: userRemove
        })
    })
})

module.exports = app;