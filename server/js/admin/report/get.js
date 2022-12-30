const { Admin, Report } = require("../../mongoose");

module.exports = async function(req, res){
    var query = req.query,
    params = ["admin_id"].check(query);

    if(!params) return res.err(null);

    var admin = await Admin.findOne({ admin_id:query.admin_id });
    if(!admin) return res.err(null);

    var report = await Report.find({}).limit(50).sort({_id:-1});
    res.json({ status:true, data:report });
}