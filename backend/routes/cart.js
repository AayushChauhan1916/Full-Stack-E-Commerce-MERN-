const express = require("express");
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require("../utils/wrapasync");
const cartController = require('../controller/cart')

const isLoggedIn = async(req,res,next)=>{
    const user = req.user;
    if(user){
      next()
    }else{
      res.json({
        message:"user not logged in"
      })
    }
}

router.post("/addtocart",isLoggedIn,cartController.addToCart);

router.post("/removetocart",isLoggedIn,cartController.removeToCart);

router.post("/getcart",isLoggedIn,cartController.getCart);

module.exports = router;
  
  