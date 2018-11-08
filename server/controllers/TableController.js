const Table = require('../models/Table')
const Food = require('../models/Food')
const OptionFood = require('../models/OptionFood')

module.exports = {
    
    orderFood: function(id, stTable, noodle, meat, reject, note, count, hasOption, optional, countOption, priceOption, callback){
        Table.findById(id, function(err, result){
            if(err){
                callback(err, null);
                return;
            }
            var total = result.totalPrice;
                        
            let price = count * 25000;
            let food = new Food({noodle: noodle, meat: meat, reject: reject, note: note, count: count, totalPrice: price});
            result.foods.push(food);

            total += price;
            
            if(hasOption){
                let price = countOption * priceOption;  
                total +=  price;            
                let optionFood = new OptionFood({optional: optional, countOption: countOption, priceOption: priceOption, count: count, totalPrice: price});
                result.optionFoods.push(optionFood);
            } 
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
        });
    },
    removeFood: function(id, fid, callback){
        Table.findById(id, function(err, result){
            if(err){
                callback(err, null);
                return;
            }
            var total = result.totalPrice;
            for (let i=0; i<result.foods.length;i++)
            {
                if(result.foods[i]._id == fid)
                {
                    total -= result.foods[i].totalPrice;
                    break;
                }
            }
            result.update({ totalPrice: total}, function(updateResult) {
                result.modified = new Date();                
                result.save(function(err, updateResult){
                    if(err){
                        callback(err, null);
                        return;
                    }
                    callback(null, updateResult);
                });
            });

        });
        
        Table.findOneAndUpdate({_id: id}, {$pull: {foods: {_id: fid}}}, function(err, data){
            console.log(data) 
        });
    },
    setState: function(id, statusTable, callback){
        Table.findById(id, function(err, result){
            if(err){
                callback(err, null);
                return;
            }             
            result.update({ statusTable: statusTable}, function(updateResult) {
                
                result.save(function(err, updateResult){
                    if(err){
                        callback(err, null);
                        return;
                    }
                    callback(null, updateResult);
                });
            });
        });

    },
    reset: function(id, callback){
        Table.findById(id, function(err, result){
            if(err){
                callback(err, null);
                return;
            }             
            result.update({statusTable: 'state_order', totalPrice: '0', foods: [], optionFoods: []}, function(updateResult) {
                
                result.modified = new Date();
                result.save(function(err, updateResult){
                    if(err){
                        callback(err, null);
                        return;
                    }
                    callback(null, updateResult);
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
        Table.find(params,'_id indexTable statusTable noteTable totalPrice', function(err, results){
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