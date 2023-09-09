const USER = require('../model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.checkUser = async (req, res, next) => {
    try {
        // console.log("Middleware");-
        // console.log(req.headers.authorization);
        let token = req.headers.authorization
        if (!token) {
            throw new Error("Please attached token")
        }
        let decode = jwt.verify(token, process.env.jwtSign)
        // console.log(decode);
        let checkUser = await USER.findById(decode.id)
        if (!checkUser) {
            throw new Error("user not found")
        }
        next()
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
}

exports.Signup = async function (req, res, next) {
    try {
        if (!req.body.username || !req.body.email || !req.body.password) {
            throw new Error("Please enter valid fields");
        }
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const data = await USER.create(req.body);
        res.status(201).json({
            data: data,
            message: "sign-up successful",
        });
    } catch (err) {
        res.status(404).json({
            status: "err",
            message: err.message,
        });
    }
}

exports.delUser = async function (req, res, next) {
  try {
      await USER.findByIdAndDelete(req.params.id)
      res.status(201).json({
        status:"success",
        message:"user deleted"
      })
  } catch (err) {
      res.status(404).json({
          status: "fail",
          message: err.message
      })
  }
}

exports.Login = async function (req, res, next) {
    try {
      const user = await USER.findOne({ email: req.body.email });
      if (!user) {
        throw new Error("user is not found");
      }
      let checkPass = await bcrypt.compare(req.body.password, user.password);
      if (!checkPass) {
        throw new Error("Password is wrong");
      }
      const token = jwt.sign({ id: user._id }, process.env.jwtSign);
      res.status(201).json({
        status:"Success",
        message: "login successfully",
        token
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  }

exports.allUser = async function (req, res){
    try {
      const findData =  await USER.find()
      res.status(200).json({
        status:"Success",
        message:"All Data Found",
        data: findData
      })
    } catch (error) {
      res.status(404).json({
        status:"fail",
        message:error.message
      })
    }
    
  }