const Table = require('../models/Table')
const Food = require('../models/Food')
const OptionFood = require('../models/OptionFood')


module.exports = {
    
    orderFood: function(id, noodle, meat, note, count, hasOption, optional, countOption, priceOption, callback){
        Table.findById(id, function(err, result){
            if(err){
                callback(err, null);
                return;
            }
            let price = count * 25000;
            var food = new Food({noodle: noodle, meat: meat, note: note, count: count, totalPrice: price});
            var total = price;
            result.foods.push(food);
            if(hasOption){
                let price = countOption * priceOption;  
                total +=  price;            
                var optionFood = new OptionFood({optional: optional, countOption: countOption, priceOption: priceOption, count: count, totalPrice: price});
                result.optionFoods.push(optionFood);
            } 
            result.update({ totalPrice: total}, function(foodResult) {
                result.modified = new Date();
                result.save(function(err, foodResult){
                    if(err){
                        callback(err, null);
                        return;
                    }
                    callback(null, foodResult);
                });
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