const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    pid: {
        type: String,
        required: true,
        unique: true
    },
    pname: {
        type: String,
        required: true
        },
    qty: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    orderedDate: {
        type: Date,
        default: Date.now
    }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
