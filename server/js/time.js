module.exports = function(time){
    switch(true){
        case (time > 2592000):
            time = Math.floor(time / 2592000) + " months ago...";
            break;
        case (time > 86400):
            time = Math.floor(time / 86400) + " days ago...";
            break;
        case (time > 3600):
            time = Math.floor(time / 3600) + " hours ago...";
            break;
        case (time > 60):
            time = Math.floor(time / 60) + " minutes ago...";
            break;
        default : time = time + " seconds ago...";
    }
    return time;
}