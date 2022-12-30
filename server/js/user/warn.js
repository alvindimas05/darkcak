const { User } = require("../mongoose")

module.exports = async function(req, res){
    var query = req.query,
    params = ["username"].check(query);

    if(!params) return res.err(null);

    var warn = await User.findOne({ username:query.username }).select({ warn:1 });
    res.json({ status:true, warn:warn && warn.warn ? warn.warn : null });
}