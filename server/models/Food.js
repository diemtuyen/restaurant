var mongoose = require('mongoose');  


var FoodSchema = new mongoose.Schema({  
    noodle: String,
    meat:String,
    reject: String,
    note: String,
    count: Number,
    totalPrice: Number,
    status: {
        type: Number,
        default: 1
      },
    created: {
        type: Date,
        required: true,
        default: new Date()
    }
});

mongoose.model('Food', FoodSchema);

module.exports = mongoose.model('Food');