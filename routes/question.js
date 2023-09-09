var express = require('express');
var router = express.Router();
const queController = require("../controller/que")
const userController = require("../controller/user")

router.post('/add', queController.addQue);

router.delete('/delete/:id', queController.delQue);

router.patch('/update/:id', queController.upQue);

router.get('/all', userController.checkUser, queController.allQue);

module.exports = router;