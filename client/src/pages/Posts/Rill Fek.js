import axios from "axios";
import cookies from "js-cookie";

var base_url = process.env.REACT_APP_BASE_URL;
export async function Rill(id, data, setData){
    if(!cookies.get("username")) window.location.href = "/login";

    await axios.post(base_url + "/api/post/rill", { post_id:id });
    setData(data.map(dat => {
        if(dat.post_id === id){
            if(dat.rcol){
                dat.rcol = false;
                dat.rill--;
            } else {
                dat.rcol = true;
                dat.rill++;
            }
            return dat;
        }
        return dat;
    }));
}

export async function Fek(id, data, setData){
    if(!cookies.get("username")) window.location.href = "/login";

    await axios.post(base_url + "/api/post/fek", { post_id:id });
    setData(data.map(dat => {
        if(dat.post_id === id){
            if(dat.fcol){
                dat.fcol = false;
                dat.fek--;
            } else {
                dat.fcol = true;
                dat.fek++;
            }
            return dat;
        }
        return dat;
    }));
}