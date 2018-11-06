const Report = require('../models/Report')

module.exports = {

    create: function(params, callback){
        Report.create(params, function(err, result){
            if(err){
                callback(err, null);
                return
            }
            result.update({foods: params.data.dtFoods, optionFoods: params.data.dtOptions, totalPrice: params.data.dtTotal}, function(reportResult) {
                result.save(function(err, reportResult){
                    if(err){
                        callback(err, null);
                        return;
                    }
                    callback(null, reportResult);
                });
            });
        });
    }
}