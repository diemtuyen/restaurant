const mongoose = require('mongoose');  
const FoodSchema = require('./Food').schema;  

const TableSchema = new mongoose.Schema({  
    title: String,
    state: String,
    note: String,
    status: {
        type: Number,
        default: 1
      },
    created: {
        type: Date,
        required: true,
        default: new Date()
    },
    foods: [FoodSchema]    
});

mongoose.model('Table', TableSchema);

module.exports = mongoose.model('Table');


