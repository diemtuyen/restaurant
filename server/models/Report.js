var mongoose = require('mongoose'); 
const FoodSchema = require('./Food').schema;  
const OptionFoodSchema = require('./OptionFood').schema;  

var ReportSchema = new mongoose.Schema({  
    totalPrice: {
        type: Number,
        default: 0
      },
    status: {
        type: Number,
        default: 1
      },
    created: {
        type: Date,
        required: true,
        default: new Date()
    },
    foods: [FoodSchema], 
    optionFoods: [OptionFoodSchema]
});

mongoose.model('Report', ReportSchema);

module.exports = mongoose.model('Report');