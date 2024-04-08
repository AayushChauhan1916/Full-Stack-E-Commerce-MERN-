const User = require('../models/user');
const wrapAsync = require("../utils/wrapasync");

module.exports.addToCart = wrapAsync(async(req,res)=>{
    const {itemId} = req.body;
    const user = await User.findById(req.user._id)
    user.cartData[itemId] += 1
    await User.findByIdAndUpdate(req.user._id,{cartData:user.cartData})
    res.json({
      "aayush":"chauhan"
    })
});

module.exports.removeToCart = wrapAsync(async (req, res) => {
    const {itemId} = req.body;
    const user = await User.findById(req.user._id);
    if (user.cartData[itemId] > 0) {
      user.cartData[itemId] -= 1;
      await User.findByIdAndUpdate(req.user._id, { cartData: user.cartData });
      
      res.json({
        success: true,
        message: "Removed Successfully"
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Item quantity cannot be less than 0"
      });
    }
})

module.exports.getCart = wrapAsync(async(req,res)=>{
    const user = await User.findById(req.user._id)
    const cart = user.cartData;
    res.json({
      success:true,
      cart:cart
    })
})