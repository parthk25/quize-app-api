const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name:{
    type:String,
    uniqe:true
  },
  image:{
    type: String,
    data: Buffer
  }
});

const CATEGORY = mongoose.model('category', categorySchema);

module.exports = CATEGORY;