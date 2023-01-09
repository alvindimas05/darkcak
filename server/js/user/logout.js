const { User } = require("../mongoose");

module.exports = async function(req, res){
    if(!req.cookies) return res.send("No cookies!")
    
    var user = await User.findOne({ user_id:req.cookies.user_id }, { image:0 });

    if(user && user.banned) res.send("Banned!");
    else {
        res.clearCookie("user_id");
        res.send("Cookies deleted!")
    }
}