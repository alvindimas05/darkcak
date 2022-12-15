import axios from "axios";
import { Replys, Reply } from "./Reply";

export async function Send(id, comment, setComment, data, setData, reply, setReply){
    if(comment.length < 1) return;
    
    if(reply && comment.charAt(0) === "@"){
        await axios.post("http://localhost:8080/api/post/reply", {
            user_id:"Lv1pY48mJ0naaBAiLFhz",
            post_id:id,
            comment_id:reply,
            comment:comment
        });

        setData(data.map(dat => {
            if(dat.post_id === id){
                dat.comments = dat.comments.map(com => {
                    if(com.comment_id === reply){
                        com.reply = [...com.reply, {
                            username:"alvindimas",
                            time:"Just now",
                            comment:comment
                        }];
                    }
                    return com;
                });
            }
            return dat;
        }));
    } else {
        var cid = await axios.post("http://localhost:8080/api/post/comment", {
            user_id:"Lv1pY48mJ0naaBAiLFhz",
            post_id:id,
            comment:comment
        });
        cid = cid.data.id;

        setData(data.map(dat => {
            if(dat.post_id === id){
                dat.comments = [...dat.comments, {
                    comment_id:cid,
                    username:"alvindimas05",
                    comment:comment,
                    time:"Just now"
                }];
            }
            return dat;
        }));
    }
    setReply(0);
    setComment("");
}

export function Comments(props){
    var comments = props.comments,
    data = props.data,
    setData = props.setData,
    setReply = props.setReply,
    setComment = props.setComment;

    if(comments.length === 0) return(<h5>No comments yet...</h5>);

    return comments.map((com, i) => {
        function btn_reply(){
            setData(data.map(dat => {
                if(dat.post_id === props.id){
                    dat.comments = dat.comments.map(co => {
                        if(co.comment_id === com.comment_id){
                            if(co.display) co.display = false;
                            else co.display = true;
                        }
                        return co;
                    });
                }
                return dat;
            }));
        }
        return(
            <div className="comment" key={i}>
                <a href={"/u/" + com.username}>
                    <span className="comment-by">{com.username}</span>
                </a>
                &nbsp;
                <span className="comment-date">{com.time}</span>
                <p className="comment-value mb-0">{com.comment}</p>
                <div className="comment-breply">
                    <span className="breply-reply" onClick={() => Reply(com.username, com.comment_id, setReply, setComment)}>
                        Reply
                    </span>
                    &nbsp;&nbsp;
                    <span className="breply-show" onClick={btn_reply}>
                        {com.reply.length ? "Show Reply" : "No Reply"}
                    </span>
                </div>
                <div className="comments-reply" style={{ display:com.display ? "block" : "none" }}><Replys replys={com.reply}/></div>
            </div>
        );
    });
}