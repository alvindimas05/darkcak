function rill_fek(){
    $(".btn-comment").click(e => {
        var id = e.currentTarget.getAttribute("post-id"),
        com = $(`.comments[post-id="${id}"]`);
    
        if(com.css("display") == "none") com.css("display", "block");
        else com.css("display", "none");
    });
    
    $.get("/api/post/rill?user_id=" + user_id).then(res => {
        res.forEach(dat => {
            var btn = $(`.btn-rill[post-id='${dat}']`);
            btn.css("color", "lime");
            btn.attr("active", true);
        });
    
        $(".btn-rill").click(e => {
            var id = e.currentTarget.getAttribute("post-id");
            $.post("/api/post/rill", {
                user_id:user_id,
                post_id:id
            });
    
            var btn = $(`.btn-rill[post-id="${id}"]`),
            rill = $(`.rill-val[post-id="${id}"]`);
            active = btn.attr("active");
            if(active == "false"){
                btn.css("color", "lime");
                btn.attr("active", true);
                rill.html(parseInt(rill.html()) + 1);
            } else {
                btn[0].style.color = "";
                btn.attr("active", false);
                rill.html(parseInt(rill.html()) - 1);
            }
        });
    });
    
    $.get("/api/post/fek?user_id=" + user_id).then(res => {
        res.forEach(dat => {
            var btn = $(`.btn-fek[post-id='${dat}']`);
            btn.css("color", "red");
            btn.attr("active", true);
        });
    
        $(".btn-fek").click(e => {
            var id = e.currentTarget.getAttribute("post-id");
            $.post("/api/post/fek", {
                user_id:user_id,
                post_id:id
            });
    
            var btn = $(`.btn-fek[post-id="${id}"]`),
            fek = $(`.fek-val[post-id="${id}"]`);
            active = btn.attr("active");
            if(active == "false"){
                btn.css("color", "red");
                btn.attr("active", true);
                fek.html(parseInt(fek.html()) + 1);
            } else {
                btn[0].style.color = "";
                btn.attr("active", false);
                fek.html(parseInt(fek.html()) - 1);
            }
        });
    });
}