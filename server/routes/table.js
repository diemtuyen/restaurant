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

router.post('/', function(req, res, next) {
    tableController.create(req.body, function(err, result){
        if(err){  
            console.log(err);
            console.log("server KHONG tao table");
            res.json({
                success: 0,
                error: err
            })
            return;
        }
        console.log("server tao table OK !!!");
        res.json({
            success: 1,
            data: result
        });
    });
});


module.exports = router