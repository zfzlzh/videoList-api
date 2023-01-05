/*
 * @Author: zfz
 * @Date: 2021-11-19 14:00:56
 * @LastEditors: zfz
 * @LastEditTime: 2021-11-19 16:11:41
 * @Description: update
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
