const express = require('express')
const app = express()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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

/**
 * COnfiguracion de google
 */

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const payload = ticket.getPayload();
    return {
        name: payload.name,
        email: payload.email,
        age: "0",
        img: payload.picture,
        google: true
    }
}

app.post('/google', async (req, res) => {

    let token = req.body.idtoken;

    let google_user = await verify(token).catch(err => {
        return res.status(403).json({
            status: false,
            err
        })
    })


    User.findOne({ email: google_user.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (userDB && !userDB.google) {
            return res.status(500).json({
                ok: false,
                err: "Debe usar auticacion por correo"
            })
        }

        if (userDB && userDB.google) {
            let token = jwt.sign({
                user: userDB,
            }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })

            res.json({
                status: true,
                userDB: userDB,
                token
            })
        }

        if (!userDB) {

            let user = new User({
                name: google_user.name,
                email: google_user.email,
                img: google_user.img,
                google: true,
                age: '0',
                password: ':)',
            })


            user.save((err, userDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                let token = jwt.sign({
                    user: userDB,
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })
                // userDB.password = null
                res.json({
                    status: true,
                    user: userDB,
                    token
                })
            })

        }

    })
})





module.exports = app;