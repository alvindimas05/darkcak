const { randstring } = require("../../functions");
const { Admin } = require("../../mongoose");

module.exports = async function(req, res){
    var body = req.body,
    params = ["admin_id", "username", "password"].check(body);

    if(!params) return res.err(null);

    var admin = await Admin.findOne({ admin_id:body.admin_id });
    if(!admin || admin.role_id === 2) return res.err(null);

    admin = await Admin.findOne({ username:body.username });
    if(admin) return res.err("Username sudah dipakai!");

    var id = randstring();
    await new Admin({
        admin_id:id,
        role_id:2,
        username:body.username,
        password:body.password
    }).save();
    
    res.json({ status:true });
}