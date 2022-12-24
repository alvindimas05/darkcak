import { useState } from "react";
import { Rill, Fek } from "./Rill Fek";
import { Send, Comments } from "./Comment";
import axios from "axios";
import cookies from "js-cookie";

export default function Post(props){
    var dat = props.dat,
    data = props.data,
    setData = props.setData;
    
    const [comment, setComment] = useState(""),
    [reply, setReply] = useState(0);

    function btn_comment(){
        if(props.one) return;
        setData(data.map(da => {
            if(da.post_id === dat.post_id){
                if(da.display) da.display = false;
                else da.display = true;
            }
            return da;
        }));
    }

    async function report(){
        var msg = prompt("Give me a good reason (Spam False Report = Warn/Banned)");
        if(!msg || !cookies.get("username")) return;
        var res = await axios.post(process.env.REACT_APP_BASE_URL + "/api/post/report", {
            post_id:dat.post_id,
            msg:msg
        });
        if(res.data.status) alert("Reported!");
    }

    return(
        <div className="post mt-2">
            <div>
                {dat.isImage ? 
                    <img onClick={() => window.location.href = "/g/" + dat.post_id} className="w-100" alt="Post" 
                    src={process.env.REACT_APP_BASE_URL + "/api/post/file?post_id=" + dat.post_id}/>
                :
                    <video className="w-100" controls>
                        <source src={process.env.REACT_APP_BASE_URL + "/api/post/file?post_id=" + dat.post_id}/>
                    </video>
                }
                <div style={{ marginTop:"2.5px" }} onClick={() => window.location.href = "/g/" + dat.post_id}>
                    <span className="post-title">{dat.title}</span>
                </div>
                <div style={{ marginTop:"-5px" }}>
                    <a className="post-by" href={"/u/" + dat.username}>{dat.username}</a>
                    &nbsp;
                    <span className="post-date">{dat.time}</span>
                </div>
                <div style={{ marginTop:"-5px", marginBottom:"2px" }} className="post-date">
                    {dat.category.map((cat, i) => {
                        if(i === dat.category.length - 1) return cat;
                        else return cat + ", ";
                    })}
                </div>
                <button className="btn btn-dark btn-rill" onClick={async () => Rill(dat.post_id, data, setData)} style={{ color:dat.rcol ? "lime" : "white" }}>
                    <i className="fa fa-thumbs-up"/> Rill
                </button>
                &nbsp;
                <button className="btn btn-dark btn-fek" onClick={async () => Fek(dat.post_id, data, setData)} style={{ color:dat.fcol ? "red" : "white" }}>
                    <i className="fa fa-thumbs-down"/> Fek
                </button>
                &nbsp;
                <button className="btn btn-dark btn-comment" onClick={btn_comment} style={{ display:props.one ? "none" : ""}}><i className="fa fa-comment"/> Comments</button>
                &nbsp;
                <button className="btn btn-dark" onClick={report}>
                    <i className="fa fa-flag"/>
                </button>
                <p className="post-laiks mx-0 my-1">
                    <span><span className="rill-val">{dat.rill}</span> Rill</span>
                    &nbsp;
                    <span><span className="fek-val">{dat.fek}</span> Fek</span>
                </p>
            </div>
            <div className="comments py-1" style={{ display:dat.display || props.one ? "block" : "none" }}>
                <Comments id={dat.post_id} comments={dat.comments} reply={reply} setReply={setReply} data={data} setData={setData} setComment={setComment}/>
                <div className="row gx-2 mt-2">
                    <input onInput={e => setComment(e.target.value)} value={comment} placeholder="Comment" type="text" className="col-9 comment-input"/>
                    <div className="col-3" align="center">
                        <button className="btn btn-dark px-3 comment-send" onClick={async () => Send(dat.post_id, comment, setComment, data, setData, reply, setReply)}>Send</button>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
    );
}