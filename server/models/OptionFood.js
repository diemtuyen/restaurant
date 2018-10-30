var mongoose = require('mongoose');  


var OptionFoodSchema = new mongoose.Schema({     
    optional: String,
    countOption: Number,
    priceOption: Number,
    status: {
        type: Number,
        default: 1
      },
    created: {
        type: Date,
        required: true,
        default: new Date()
    },
    totalPrice: Number
});

mongoose.model('OptionFood', OptionFoodSchema);

module.exports = mongoose.model('OptionFood');