const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
    dataPromotion: {
        type: Date
    },
    status:{
        type: String,
        required: true
    },
    productId:[{
        type: mongoose.Schema.Types.ObjectId
    }]
});

module.exports = mongoose.Schema('Promotion', PromotionSchema);