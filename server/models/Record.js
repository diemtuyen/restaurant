var mongoose = require('mongoose'); 

var RecordSchema = new mongoose.Schema({  
    count: Number,
    food: String,    
    addition: String,    
    total: Number,    
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

mongoose.model('Record', RecordSchema);

module.exports = mongoose.model('Record');