const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role valido'
}


let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Why no name?']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Why no email?']
    },
    age: {
        type: String,
        required: [true, 'Why no age?']
    },
    password: {
        type: String,
        required: [true, 'Why no password?']
    },
    img: {
        type: String,
        required: false
    },
    rol: {
        type: String,
        default: "USER_ROLE",
        enum: rolesValidos
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
})


 /**
  * borrar el item de passwoed en la respuesta
  */
userSchema.methods.toJSON = function () {
    let user = this
    let userObj = user.toObject()
    delete userObj.password
    return userObj
}
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userSchema)