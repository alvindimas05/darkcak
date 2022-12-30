import axios from "axios";
import cookies from "js-cookie";

export function Reply(username, id, setReply, setComment){
    setComment(`@${username} `);
    setReply(id);
}
export function Replys(props){
    var replys = props.replys,
    setReply = props.setReply,
    setComment = props.setComment;

    return replys.map((rep, i) => {
        async function report(){
            var reason = prompt("Give me a good reason (Spam False Report = Warn/Banned)");
            if(!reason || !cookies.get("username")) return;
            var res = await axios.post(process.env.REACT_APP_BASE_URL + "/api/admin/report", {
                type:2,
                to:rep.username,
                post_id:props.post_id,
                reason:reason
            });
            if(res.data.status) alert("Reported!");
        }
        return(
        <div className="comment-reply" key={i}>
            <a href={"/u/" + rep.username}><span className="comment-by">{rep.username}</span></a>
            &nbsp;
            <span className="comment-date">{rep.time}</span>
            <p className="comment-value mb-0">{rep.comment}</p>
            <span className="comment-breply" onClick={() => {
                setReply(props.id);
                setComment(`@${rep.username} `);
            }}>Reply</span>
            &nbsp;&nbsp;
            <span className="comment-breply" onClick={report}>Report</span>
        </div>
        )
    });
}