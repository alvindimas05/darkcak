import axios from "axios";

export async function Rill(id, data, setData){
    await axios.post("http://localhost:8080/api/post/rill", { post_id:id });

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
    await axios.post("http://localhost:8080/api/post/fek", { post_id:id });

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