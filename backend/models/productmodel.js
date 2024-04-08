const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name :{
    type:String,
    required:true
  },
  image:{
    url: {
      type:String,
      required:true
    },
    filename:{
      type:String,
      required:true
    }
  },
  category:{
    type:String,
    required:true
  },
  new_price:{
    type:Number,
    required:true
  },
  old_price:{
    type:Number,
    required:true
  },
  date:{
    type:Date,
    default: Date.now()
  },
  available:{
    type: Boolean,
    default:true
  }
});

const Product = mongoose.model("Product",productSchema)

module.exports = Product;
