const express = require('express')
const app = express()
const Categories = require('../models/category')
const _ = require('underscore')
const verificarToken = { verificaToken, verificaRole } = require('../middlewares/auth')



app.post('/category', [verificaToken, verificaRole], (req, res) => {

    let body = req.body

    let categories = new Categories({
        description: body.description,
        user: req.user._id,
    })

    categories.save((err, categoriesDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            status: true,
            user: categoriesDB
        })
    })
})


// ============================
// Mostrar todas las categorias
// ============================
app.get('/category', verificaToken, (req, res) => {

    Categories.find({})
        .sort('description')
        .populate('user', 'name email')
        .exec((err, category) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                category
            });

        })
});


// app.get('/category', [verificaToken, verificaRole], (req, res) => {
//     let desde = Number(req.query.desde) || 0
//     let limit = Number(req.query.limit) || 5

//     Categories.find({})
//         .skip(desde)
//         .limit(limit)
//         .populate('users')
//         .exec((err, categories) => {
//             if (err) {
//                 return res.status(400).json({
//                     ok: false,
//                     err
//                 })
//             }

//             Categories.count({}, (err, count) => {
//                 res.json({
//                     user: req.categories,
//                     users: categories,
//                     status: true,
//                     count: count,

//                 })
//             })

//         })
// })

app.get('/category/:id', [verificaToken, verificaRole], (req, res) => {
    let id = req.params.id
    Categories.findById(id, (err, categoriesDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            status: true,
            data: categoriesDB,

        })
    })
})


app.put('/category/:id', [verificaToken, verificaRole], (req, res) => {
    let id = req.params.id
    let body = _.pick(req.body, ['description'])

    console.log("id", id)
    console.log("req.body", req.body)
    console.log("body", body)

    Categories.findByIdAndUpdate(id, body, { new: true }, (err, categoriesDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            status: true,
            user: categoriesDB
        })
    })
})


app.delete('/category/:id', [verificaToken, verificaRole], (req, res) => {
    let id = req.params.id
    Categories.findByIdAndRemove(id, (err, categoriesDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            status: true,
            user: categoriesDB
        })
    })
})

module.exports = app;