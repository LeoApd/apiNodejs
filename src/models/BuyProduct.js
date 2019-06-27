const mongoose = require('mongoose');

const BuyProductSchema = new mongoose.Schema({
    dateBuy:{
        type: Date,
        required: true
        //default: Date.now
    },
    productQuantity: {
        type: Number,
        require: true
    },
    valueBuy: {    
        type: Number,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('BuyProduct', BuyProductSchema);