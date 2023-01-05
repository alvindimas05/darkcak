const fs = require("fs");
sharp = require("sharp"),
{ User } = require("../mongoose");

module.exports = async function(req, res){
    var query = req.query,
    params = ["username"].check(query);

    if(!params) return res.err(null);
    
    var result = await User.findOne({ username:query.username }).select({ image:1 }).lean();

    if(!result) return res.err(null);
    if(result.image.data){
        var file = result.image.data.toString("base64");
        file = Buffer.from(file, "base64");
    
        if(query.compressed && result.image.contentType != "image/gif")
        file = await sharp(file).resize(null, 100).toBuffer();
    
        res.writeHead(200, { "Content-Type":result.image.contentType });
        res.end(file);
    } else {
        var file = await fs.readFileSync(__dirname + "/../../300.png");
        res.writeHead(200, { "Content-Type":"image/png" })
        res.end(file);
    }
}