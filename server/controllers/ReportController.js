const Report = require('../models/Report')
const Record = require('../models/Record')

module.exports = {

    submitRecord: function(count, food, total, callback){  
        let id ='5bdab8f1da69255cfc6fb835';
        Report.findById(id, function(err, result){
            if(err){
                callback(err, null);
                return;
            }     
            var record = new Record({count: count, food: food, total: total});
            console.log(record);     
            result.records.push(record);  
            result.save(function(err, recordResult){
                if(err){
                    callback(err, null);
                    return;
                }
                callback(null, foodResult);
            });
        });
    }
}