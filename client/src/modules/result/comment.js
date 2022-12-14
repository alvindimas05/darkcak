import axios from "axios";

export default async function Send(id, comment, ucom, setUcom, setComment){
    if(comment.length < 1) return;

    await axios.post("http://localhost:8080/api/post/comment", {
        user_id:"Lv1pY48mJ0naaBAiLFhz",
        post_id:id,
        comment:comment
    });

    setUcom([...ucom, {
        username:"alvindimas05",
        comment:comment,
        time:"Just now",
        reply:[]
    }]);
    setComment("");
}