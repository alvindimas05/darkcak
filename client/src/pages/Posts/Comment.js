import axios from "axios";
import cookies from "js-cookies";
import { Replys, Reply } from "./Reply";

var base_url = process.env.REACT_APP_BASE_URL;
export async function Send(id, comment, setComment, data, setData, reply, setReply){
    if(!cookies.getItem("username")) window.location.href = "/login";
    if(comment.length < 1) return;
    
    if(reply && comment.charAt(0) === "@"){
        await axios.post(base_url + "/api/post/reply", {
            post_id:id,
            comment_id:reply,
            comment:comment
        });

        setData(data.map(dat => {
            if(dat.post_id === id){
                dat.comments = dat.comments.map(com => {
                    if(com.comment_id === reply){
                        com.reply.push({
                            username:cookies.getItem("username"),
                            time:"Just now",
                            comment:comment
                        });
                    }
                    return com;
                });
            }
            return dat;
        }));
    } else {
        var cid = await axios.post(base_url + "/api/post/comment", {
            post_id:id,
            comment:comment
        });
        cid = cid.data.id;

        setData(data.map(dat => {
            if(dat.post_id === id){
                dat.comments.push({
                    comment_id:cid,
                    username:cookies.getItem("username"),
                    comment:comment,
                    time:"Just now",
                    reply:[]
                });
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

    if(comments.length === 0) return(<h6>No comments yet...</h6>);

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
                <div className="comments-reply" style={{ display:com.display ? "block" : "none" }}>
                    <Replys replys={com.reply}/>
                </div>
            </div>
        );
    });
}