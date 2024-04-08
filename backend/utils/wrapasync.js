const wrapAsync = (fx)=>{
    return function(req,res,next){
        fx(req,res,next).catch((err)=>{next(err)})
    }
}

module.exports = wrapAsync;