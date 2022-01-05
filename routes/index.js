var express = require('express');
var models = require('../models')
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   let data, data2, data3, data4, data5;
//   let func = async () => { 
//     data = await require('./../todayhumor').getData2()
//     // data2 = await require('../dogdrip').getData2()
//     data3 = await require('../fmkorea').getData2()
//     data4 = await require('../ppomppu').getData2()
//     data5 = await require('../humoruniv').getData2()

//     res.render('index', { title: 'Express', data, data3, data4, data5 })
//   } 
//   func();
// })

router.get('/', async (req, res, next) => {
  await models.Sites.findAll()
  .then( (data) => {
      res.render('index', { data })
  })
})

module.exports = router;
