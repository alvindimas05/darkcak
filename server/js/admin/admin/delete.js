const { Admin } = require("../../mongoose");

module.exports = async function(req, res){
    var body = req.body,
    params = ["admin_id", "username"].check(body);

    if(!params) return res.err(null);

    var admin = await Admin.findOne({ admin_id:body.admin_id });
    if(!admin || admin.role_id === 2) return res.err(null);
    
    await Admin.deleteOne({ username:body.username });

    res.json({ status:true });
}