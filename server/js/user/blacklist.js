const { User } = require("../mongoose");

module.exports = async function(req, res){
    var body = req.body;
    params = ["blacklist"].check(body);

    if(!params || !req.cookies || !Array.isArray(body.blacklist)) return res.err(null);

    await User.findOneAndUpdate({ user_id:req.cookies.user_id }, { blacklist:body.blacklist });
    res.json({ status:true });
}