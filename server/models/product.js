const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    category: {
        type: String,
    },
    image: {
        type: String
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('Product', productSchema)