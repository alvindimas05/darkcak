const { Admin } = require("../../mongoose");

module.exports = async function(req, res){
    var body = req.body,
    params = ["username", "password"].check(body);

    if(!params) return res.err(null);

    var admin = await Admin.findOne({ username:body.username, password:body.password });
    
    if(!admin) return res.err(null);
    
    res.json({ status:true, admin_id:admin.admin_id, role_id:admin.role_id });
}