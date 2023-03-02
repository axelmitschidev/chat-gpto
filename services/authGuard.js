const userModel = require("../models/userModel");

let routeGuard = async (req,res,next)=>{

    let user= await userModel.findOne({_id:req.session.userId})
    if (user) {
        next()
    }else{
        res.redirect("/")
    }

}

module.exports = routeGuard