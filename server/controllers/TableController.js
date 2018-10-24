const Table = require('../models/Table')
const Food = require('../models/Food')


module.exports = {
    
    orderFood: function(id, category, meat, note, count, callback){
        Table.findById(id, function(err, result){
            if(err){
                callback(err, null);
                return;
            }
            
            var food = new Food({category: category, meat: meat, note: note, count: count});

            result.foods.push(food);
            
            result.save(function(err, foodResult){
                if(err){
                    callback(err, null);
                    return;
                }

                callback(null, foodResult);
            });
        });

    },
    create: function(params, callback){
        Table.create(params, function(err, result){
            if(err){
                callback(err, null);
                return
            }
            callback(null, result);
        });
    },
    find: function(params, callback){
        Table.find(params,'_id indexTable statusTable noteTable', function(err, results){
            if(err){
                callback(err, null);
                return;
            }
            callback(null, results);
        })
    },

    findById: function(id, callback){
        Table.findById(id, function(err, results){
            if(err){
                callback(err, null);
                return;
            }
            callback(null, results);
        })
    }
}