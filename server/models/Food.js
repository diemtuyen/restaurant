var mongoose = require('mongoose');  


var FoodSchema = new mongoose.Schema({  
    category: String,
    meat:String,
    note: String,
    count: Number,
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