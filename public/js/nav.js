var user_id = null,
user_name = null;

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function htmlspecialchars(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

user_id = getCookie("user_id"),
user_name = getCookie("username");

if(user_id !== null){
    $("#nav-list").prepend(`
        <div class="btn-list py-2 px-3">
            <a href="/u?username=${user_name}">Your Posts</a>
        </div>
        <div class="btn-list py-2 px-3">
            <a href="/profile">Profile</a>
        </div>
        <div class="btn-list py-2 px-3">
            <a href="/upload">Upload</a>
        </div>
        <div class="btn-list py-2 px-3">
            <a href="/logout">Log out</a>
        </div>
    `);
} else {
    $("#nav-list").prepend(`
        <div class="btn-list py-2 px-3">
            <a href="/login">Log in</a>
        </div>
        <div class="btn-list py-2 px-3">
            <a href="/register">Register</a>
        </div>
    `);
}

$("nav:first-child i").click(() => {
    var el = $("#nav-list");
    
    if(el.css("display") == "block") el.css("display", "none");
    else el.css("display", "block");
});

$(".btn-list").click(e => {
    var href = $(e.currentTarget).children("a").attr("href");
    location.href = href;
});

$("#search").keypress(e => {
    if(e.keyCode == 13 && e.target.value != "")
    location.href = "/?search=" + e.target.value;
});