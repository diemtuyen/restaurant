const mongoose = require('mongoose');  
const FoodSchema = require('./Food').schema;  

const TableSchema = new mongoose.Schema({  
    indexTable: String,
    statusTable: String,
    noteTable: String,
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


