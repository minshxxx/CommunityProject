var express = require('express');
var models = require('../models')
var router = express.Router();

router.get('/', async (req, res, next) => {
  await models.Sites.findAll({
    order: [
      ['date', 'DESC']
    ]
  })
  .then( (data) => {
      res.render('index', { data })
  })
})

module.exports = router;
