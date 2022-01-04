var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  require('./../test').getData().then( (data) => {
    console.log(data);
    res.render('index', { title: 'Express', data })
  })
})


module.exports = router;
