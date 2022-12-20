module.exports = function(req, res){
    res.clearCookie("user_id");
    res.send("Cookie is unset!");
}