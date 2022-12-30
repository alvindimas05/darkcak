const { Admin } = require("../../mongoose");

module.exports = async function(req, res){
    var body = req.body,
    params = ["admin_id"].check(body);

    if(!params) return res.err(null);

    var admin = await Admin.findOne({ admin_id:body.admin_id });
    if(!admin || admin.role_id === 2) return res.err(null);

    var data = await Admin.find({}, { _id:0 });
    res.json({ status:true, data:data });
}