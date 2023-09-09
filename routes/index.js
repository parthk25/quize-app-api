var express = require('express');
var router = express.Router();
const userController = require("../controller/user")

router.post('/signup', userController.Signup);

router.post('/login', userController.Login);

router.delete('/delete/:id', userController.delUser)

router.get("/find", userController.checkUser, userController.allUser)

module.exports = router;
