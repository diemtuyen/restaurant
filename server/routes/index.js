const express = require('express');
const router = express.Router();
const reportController = require('../controllers/ReportController')

router.get('/', function(req, res, next) {
  res.send('restaurant');
});

router.post('/report', function(req, res, next) {
  console.log(req.body)
  reportController.submitRecord(req.body.data.dtCount, req.body.data.dtFood, req.body.data.dtTotal, function(err, result){
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

module.exports = router;