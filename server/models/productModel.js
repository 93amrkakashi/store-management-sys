const mongoose = require("mongoose");

const Schema = mongoose.Schema

const productSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  initQty:{
    type: Number,
    required: true
  },
  currQty:{
    type: Number,
    required: true
  },
  in:{
    type: [String],
    // required: true
  },
  out:{
    type: [String],
    // required: true
  },
  
  creator:{
    type: String,
    required: true
  },


}, {timestamps: true});


module.exports = mongoose.model("product", productSchema)