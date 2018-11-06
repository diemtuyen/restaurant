const express = require('express');
const router = express.Router();
const reportController = require('../controllers/ReportController')

router.post('/', function(req, res, next) {
  console.log(req.body)
  reportController.create(req.body, function(err, result){
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
router.get('/', function(req, res, next) {

    reportController.find(req.query, function(err, results){
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

module.exports = router;