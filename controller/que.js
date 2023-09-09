const QUESTION = require('../model/que')

exports.addQue = async function (req, res, next) {
    try {
        if (!req.body.question || !req.body.option || !req.body.answer || !req.body.category) {
            throw new Error(" Please Enter Valide Feilds")
        }
        const addQue = await QUESTION.create(req.body)
        res.status(201).json({
            status: "Success",
            message: "new question added",
            data: addQue
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })

    }
}

exports.delQue = async function (req, res, next) {
    try {
        await QUESTION.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success",
            message: "Question Deleted",
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.upQue = async function (req, res, next) {
    try {
        await QUESTION.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            status: "success",
            message: "Question updated",
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.allQue = async function (req, res, next) {
    try {
        const findCatagory = await QUESTION.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category-data"
                }
            }
        ])
        res.status(200).json({
            status: "success",
            message: "All Question Found",
            data: findCatagory
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}