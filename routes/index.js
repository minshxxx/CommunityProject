var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let data, data2;
  let func = async () => { 
    data = await require('./../todayhumor').getData2()
    // data2 = await require('../dogdrip').getData2()
    // data3 = await require('../fmkorea').getData2()
    // data4 = await require('../ppomppu').getData2()
    // data5 = await require('../humoruniv').getData2()
    res.render('index', { title: 'Express', data, data2 })
  } 
  func();
})

module.exports = router;
