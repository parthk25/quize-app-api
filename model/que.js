const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const queSchema = new Schema({
    question: {
        type: String,
        uniqe: true
    },
    option:[String],
    answer: String,
    category: { type: Schema.Types.ObjectId, ref: 'category' }
});

const QUESTION = mongoose.model('question', queSchema);

module.exports = QUESTION;