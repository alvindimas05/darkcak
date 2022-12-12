function comment_send(){
    $(".comment-send").click(e => {
        var id = $(e.currentTarget).attr("post-id"),
        reply = parseInt($(e.currentTarget).attr("replying")),
        comment = $(`.comment-input[post-id="${id}"]`).val();
        
        $(`.comment-input[post-id="${id}"]`).val("");
        $(e.currentTarget).attr("replying", 0);
    
        if(comment.length == 0) return;
        if(reply && comment.charAt(0) == "@"){
            $.post("/api/post/reply", {
                user_id:user_id,
                post_id:id,
                comment_id:reply,
                comment:comment
            });

            $(`.comments-reply[comment-id='${id}']`).css("display", "block");
    
            $(`.comments-reply[comment-id="${reply}"]`).append(`
                <div class="comment-reply">
                    <a href="/u/${user_name}"><span class="comment-by">${user_name}</span></a>
                    <span class="comment-date">Just now</span>
                    <p class="comment-value mb-0">${comment}</p>
                </div>
            `);
        } else {
            $.post("/api/post/comment", {
                user_id:user_id,
                post_id:id,
                comment:comment
            }).then(res => {
                $(`.no-comment[post-id="${id}"]`).remove();
                $(`.comments[post-id='${id}']`).prepend(`
                    <div class="comment">
                        <a comment-id="${res.id}" post-id="${id}" username="${user_name}">
                            <span class="comment-by">${user_name}</span>
                        </a>
                        <span class="comment-date">Just Now</span>
                        <p class="comment-value mb-0">${comment}</p>
                        <div class="comments-reply" comment-id="${res.id}"></div>
                    </div>
                `);
            });
        }
    });
    
    $(".comment-breply .breply-reply").click(e => {
        var cid = $(e.currentTarget).attr("comment-id"),
        pid = $(e.currentTarget).attr("post-id"),
        name = $(e.currentTarget).attr("username");
    
        $(`.comment-input[post-id='${pid}']`).val("@" + name + " ");
        $(`.comment-send[post-id='${pid}']`).attr("replying", cid);
    });
}