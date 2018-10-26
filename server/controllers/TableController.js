const Table = require('../models/Table')
const Food = require('../models/Food')


module.exports = {
    
    orderFood: function(id, noodle, meat, note, count, callback){
        console.log('CONTROLLER:::::::::: PREPARE FIND' + noodle);
        Table.findById(id, function(err, result){
            if(err){
                callback(err, null);
                console.log('CONTROLLER:::::::::: NOTFOUND');
                return;
            }
            console.log('CONTROLLER:::::::::: PREPARE orderfood');
            var food = new Food({noodle: noodle, meat: meat, note: note, count: count});
            
            result.foods.push(food);
            
            result.save(function(err, foodResult){
                if(err){
                    callback(err, null);
                    console.log('CONTROLLER:::::::::: ERROR');
                    return;
                }
                console.log('CONTROLLER:::::::::: OK ::::::: orderfood');
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