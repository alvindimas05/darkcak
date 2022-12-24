const { User } = require("../mongoose");

module.exports = async function(req, res){
    if(!req.cookies) return res.err(null);

    var user = await User.findOne({ user_id:req.cookies.user_id }).select({ cooldown:1 });
    if(!user) return res.err(null);

    res.json({ status:user.cooldown });
}