var express = require('express')
var router = express.Router()
var authController = require('../controllers/authController')

/*router.get('/', function(req, res, next) {
    authController.find(req.query, function(err, results){
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
});*/

router.post('/:username', function(req, res, next) {
    authController.login(req.body.username, req.body.password, function(err, result){
        if(err){  
            console.log(err);
            res.status(500).json({
                success: 0,
                error: err
            })
            return;
        }

        if(result){
            res.status(200).json({
                success: 1,
                data: {tokenID: result, username: req.body.username}
            });
        }else{
            res.status(401).json({
                success: 0,
                data: result
            });
        }
    });
});

router.post('/', function(req, res, next) {
    authController.register(req.body.username, req.body.password, function(err, result){
        if(err){  
            console.log(err);
            res.status(500).json({
                success: 0,
                error: err
            })
            console.log('tai khoan ko tao duoc');
            return;
        }
        if(result){
            res.status(200).json({
                success: 1,
                data: {tokenID: result, username: req.body.username}
            });
            console.log('tao tai khoan thanh cong');

        }else{
            res.status(401).json({
                success: 0,
                data: result
            });
            console.log('tai khoan dang duoc xu ly');

        }
    });

});

module.exports = router