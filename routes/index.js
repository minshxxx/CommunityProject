var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let data;
  let func = async () => { 
    data = await require('./../todayhumor').getData2()
    res.render('index', { title: 'Express', data })
  } 
  func();
})

module.exports = router;
