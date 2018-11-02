const Report = require('../models/Report')
const Record = require('../models/Record')

module.exports = {

    submitRecord: function(count, food, total, callback){  
        console.log(count);      
        console.log(food);      
        console.log(total);      
        var record = new Record({count: count, food: food, total: total});
        console.log(record);
        Report.records.push(record);        
        result.update({statusTable: stTable, totalPrice: total}, function(foodResult) {
            result.modified = new Date();
            result.save(function(err, foodResult){
                if(err){
                    callback(err, null);
                    return;
                }
                callback(null, foodResult);
            });
        });
    }
}