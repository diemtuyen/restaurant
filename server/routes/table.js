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

router.post('/:id/food', function(req, res, next) {
    
    const id = req.params.id;
    
    tableController.orderFood(id, req.body.noodle, req.body.meat, req.body.note, req.body.count, function(err, result){
    console.log('SERVER:::::::::: PREPARE orderfood ' + req.body.noodle);
    console.log('SERVER:::::::::: PREPARE orderfood ' + req.body.meat);
    console.log('SERVER:::::::::: PREPARE orderfood ' + req.body.note);
    console.log('SERVER:::::::::: PREPARE orderfood ' + req.body.count);
        if(err){  
            console.log(err);
            res.json({
                success: 0,
                error: err
            })
            return;
        }
        console.log('SERVER:::::::::: OK ::::::: orderfood');
        res.json({
            success: 1,
            data: result
        });
    });

});

module.exports = router