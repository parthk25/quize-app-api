const CATEGORY = require('../model/category')

exports.addCat = async function (req, res, next) {
    try {
        if (!req.body.name || !req.body.image) {
            throw new Error(" Please Enter Valide Feilds")
        }
        const addCatagory = await CATEGORY.create(req.body)
        res.status(201).json({
            status: "Success",
            message: "new data added",
            data: addCatagory
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.delCat = async function (req, res, next) {
    try {
        await CATEGORY.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success",
            message: "Catagory Deleted",
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.upCat = async function (req, res, next) {
    try {
        await CATEGORY.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            status: "success",
            message: "Catagory updated",
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.allCat = async function (req, res, next) {
    try {
        const findCatagory = await CATEGORY.find()
        res.status(200).json({
            status: "success",
            message: "All User Found",
            data: findCatagory
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}