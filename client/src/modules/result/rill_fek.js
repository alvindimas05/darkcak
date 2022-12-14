import axios from "axios";

export async function Rill(id, rill, setRill, rval, setRval){
    await axios.post("http://localhost:8080/api/post/rill", {
        user_id:"Lv1pY48mJ0naaBAiLFhz",
        post_id:id
    });

    if(rill === "#fff"){
        setRill("lime");
        setRval(rval + 1);
    } else {
        setRill("#fff");
        setRval(rval - 1);
    }
}

export async function Fek(id, fek, setFek, fval, setFval){
    await axios.post("http://localhost:8080/api/post/fek", {
        user_id:"Lv1pY48mJ0naaBAiLFhz",
        post_id:id
    });

    if(fek === "#fff"){
        setFek("red");
        setFval(fval + 1)
    } else {
        setFek("#fff");
        setFval(fval - 1)
    }
}