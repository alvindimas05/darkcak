$("h3").html(user_name);

$.get("/api/user/profile?username=" + user_name).then(res => {
    res = res.data;
    console.log(res.image);
    if(res.image.data) $("img").attr("src", `data:${res.image.contentType};base64,${res.image.data}`);
    else $("img").attr("src", "https://via.placeholder.com/300");

    if(res.description){
        $("p").html(htmlspecialchars(res.description));
        $("textarea").val(res.description)
    } else $("p").html("Insert description here he said");
});

$("form").submit(e => {
    e.preventDefault();
    var fd = new FormData(e.target);
    fd.append("user_id", user_id);

    $.ajax({
        url:"/api/user/profile",
        type:"POST",
        data:fd,
        processData:false,
        contentType:false,
        success:res => {
            if(res.status) location.reload();
            else alert(res.message);
        }
    });
});