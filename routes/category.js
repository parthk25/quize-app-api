var express = require('express');
var router = express.Router();
const catController = require("../controller/cat")
const userController = require("../controller/user")

router.post('/add',catController.addCat);

router.delete('/delete/:id', catController.delCat);

router.patch('/update/:id', catController.upCat);

router.get('/all', userController.checkUser, catController.allCat);

module.exports = router;
