const express = require('express')
const app = express()
const Product = require('../models/product')
const _ = require('underscore')
const verificarToken = { verificaToken, verificaRole } = require('../middlewares/auth')




// ===========================
//  Obtener product
// ===========================
app.get('/product', verificaToken, (req, res) => {
    // trae todos los product
    // populate: user category
    // paginado

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Product.find({ available: true })
        .skip(desde)
        .limit(5)
        .populate('user', 'name email')
        .populate('category', 'description')
        .exec((err, product) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                product
            });


        })

});

// ===========================
//  Obtener un producto por ID
// ===========================
app.get('/product/:id', (req, res) => {
    // populate: user category
    // paginado
    let id = req.params.id;

    Product.findById(id)
        .populate('name', 'name email')
        .populate('category', 'name')
        .exec((err, productDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productDB
            });

        });

});

// ===========================
//  Buscar product
// ===========================
app.get('/product/search/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Product.find({ name: regex })
        .populate('category', 'name')
        .exec((err, product) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                product
            })

        })


});



// ===========================
//  Crear un nuevo producto
// ===========================
app.post('/product', verificaToken, (req, res) => {
    // grabar el user
    // grabar una category del listado 

    let body = req.body;

    let producto = new Product({
        user: req.user._id,
        name: body.name,
        price: body.price,
        description: body.description,
        available: body.available,
        category: body.category
    });

    producto.save((err, productDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productDB
        });

    });

});

// ===========================
//  Actualizar un producto
// ===========================
app.put('/product/:id', verificaToken, (req, res) => {
    // grabar el user
    // grabar una category del listado 

    let id = req.params.id;
    let body = req.body;

    Product.findById(id, (err, productDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        productDB.name = body.name;
        productDB.price = body.price;
        productDB.category = body.category;
        productDB.available = body.available;
        productDB.description = body.description;

        productDB.save((err, productoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoGuardado
            });

        });

    });


});

// ===========================
//  Borrar un producto
// ===========================
app.delete('/product/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Product.findById(id, (err, productDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID no existe'
                }
            });
        }

        productDB.available = false;

        productDB.save((err, productoBorrado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoBorrado,
                mensaje: 'Producto borrado'
            });

        })

    })


});






module.exports = app;