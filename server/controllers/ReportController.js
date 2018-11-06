const Report = require('../models/Report')
// const Record = require('../models/Record')

module.exports = {

    create: function(params, callback){
        Report.create(params, function(err, result){
            if(err){
                callback(err, null);
                return
            }
            callback(null, result);
        });
    }
    
    // submitRecord: function(count, food, total, callback){  
    //     Report.findById(id, function(err, result){
    //         if(err){
    //             callback(err, null);
    //             return;
    //         } 
    //         console.log(result);    
    //         var record = new Record({count: count, food: food, total: total});
    //         console.log(record);     
    //         result.records.push(record);  
    //         result.save(function(err, recordResult){
    //             if(err){
    //                 callback(err, null);
    //                 return;
    //             }
    //             callback(null, foodResult);
    //         });
    //     });
    // }
}