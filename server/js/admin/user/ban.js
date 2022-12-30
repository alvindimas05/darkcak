const { User, Admin } = require("../../mongoose");

module.exports = async function(req, res){
    var body = req.body,
    params = ["admin_id", "username", "banned"].check(body);

    if(!params) return res.err(null);

    var admin = await Admin.findOne({ admin_id:body.admin_id });
    if(!admin) return res.err(null);

    await User.updateOne({ username:body.username, banned:body.banned });
    res.json({ status:true });
}