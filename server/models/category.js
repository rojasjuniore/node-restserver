const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let categorySchema = new Schema({
    description: { type: String, unique: true, required: [true, 'Why no description?'] },
    user: { type: Schema.Types.ObjectId, ref: 'users' }

})

module.exports = mongoose.model('Category', categorySchema)
