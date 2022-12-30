const { User, Admin } = require("../../mongoose");

module.exports = async function(req, res){
    var body = req.body,
    params = ["admin_id", "username", "warn"].check(body);

    if(!params) return res.err(null);

    var admin = await Admin.findOne({ admin_id:body.admin_id });
    if(!admin) return res.err(null);

    await User.updateOne({ username:body.username, warn:body.warn });
    setTimeout(async () => await User.updateOne({ username:body.username, warn:null }), 3 * 24 * 60 * 60 * 1000);
    res.json({ status:true });
}