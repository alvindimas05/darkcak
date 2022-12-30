const { User, Admin } = require("../../mongoose");

module.exports = async function(req, res){
    var body = req.body,
    params = ["admin_id"].check(body);

    if(!params) return res.err(null);

    var admin = await Admin.findOne({ admin_id:body.admin_id });
    if(!admin) return res.err(null);

    var data = await User.find({}).select({ username:1, warn:1, banned:1, image:1 });
    res.json({ status:true, data:data });
}