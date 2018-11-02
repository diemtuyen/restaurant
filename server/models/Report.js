var mongoose = require('mongoose'); 
const RecordSchema = require('./Record').schema; 

var ReportSchema = new mongoose.Schema({  
    records: [RecordSchema],
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

mongoose.model('Report', RecordSchema);

module.exports = mongoose.model('Report');