const express = require('express')
const router = express.Router()
const tableController = require('../controllers/tableController')


router.get('/', function(req, res, next) {

    tableController.find(req.query, function(err, results){
        if(err){
            console.log(err);
            res.json({
                success: 0,
                error: err
            });
            return;
        }
        res.json({
            success: 1,
            data: results
        });
    });
});

router.get('/:id', function(req, res, next){
    const id = req.params.id;

    tableController.findById(id, function(err, result){
    
        if(err){
            console.log(err);
            res.status(500).json({
                success: 0,
                data: result
            });
            return;
        }
        res.status(200).json({
            success: 1,
            data: result
        });
    });
});

router.post('/', function(req, res, next) {
    console.log('========================================= ');
    console.log(req.body);
    tableController.create(req.body, function(err, result){
        if(err){  
            console.log(err);
            res.json({
                success: 0,
                error: err
            })
            return;
        }
        res.json({
            success: 1,
            data: result
        });
    });
});

router.post('/:id', function(req, res, next) {
    const id = req.params.id; 
    console.log(req.body);
    tableController.updateStatus(id, req.body.statusTable, function(err, result){
        if(err){  
            console.log(err);
            res.json({
                success: 0,
                error: err
            })
            return;
        }
        res.json({
            success: 1,
            data: result
        });
    });

});

router.post('/:id/food', function(req, res, next) {
    const id = req.params.id; 
    console.log(req.body.body);
    tableController.orderFood(id, req.body.body.noodle, req.body.body.meat, req.body.body.except, req.body.body.note, req.body.body.count, req.body.body.hasOption, req.body.body.optional, req.body.body.countOption, req.body.body.priceOption, function(err, result){
        if(err){  
            console.log(err);
            res.json({
                success: 0,
                error: err
            })
            return;
        }
        res.json({
            success: 1,
            data: result
        });
    });

});

module.exports = router