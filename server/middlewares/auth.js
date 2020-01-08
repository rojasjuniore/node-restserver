const jwt = require('jsonwebtoken');


/***
 * Verificar token
 */

let verificaToken = (req, res, next) => {
    let token = req.get('token')
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }
        req.user = decoded.user
        next()
    })


}


/**
 * VErificar admin role
 */

let verificaRole = (req, res, next) => {

    let user = req.user;
    if (user.rol === "ADMIN_ROLE") {
        next()
    } else {
        return res.status(400).json({
            ok: false,
            err: "Este usuario no es administrador"
        })
    }
}



module.exports = {
    verificaToken,
    verificaRole
}