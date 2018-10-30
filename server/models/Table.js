const mongoose = require('mongoose');  
const FoodSchema = require('./Food').schema;  
const OptionFoodSchema = require('./OptionFood').schema;  

const TableSchema = new mongoose.Schema({  
    indexTable: String,
    statusTable: String,
    noteTable: String,
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

mongoose.model('Table', TableSchema);

module.exports = mongoose.model('Table');


