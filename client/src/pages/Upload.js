import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";

import "./css/upload.css";
import Loading from "./Loading/Loading";
var base_url = process.env.REACT_APP_BASE_URL,
categoryList = [
    "animals",
    "anime",
    "ask",
    "comic",
    "encyclopedia",
    "game",
    "gore",
    "korean",
    "news",
    "nsfw",
    "politic",
    "sport",
    "meme"
];
export default function Upload(){
    const [title, setTitle] = useState(""),
    [file, setFile] = useState(null),
    [src, setSrc] = useState(null),
    [category, setCategory] = useState(""),
    [display, setDisplay] = useState(false),
    [done, setDone] = useState(false),

    [isImage, setIsImage] = useState(true),
    [check, setCheck] = useState(false),
    [cooldown, setCooldown] = useState(false),

    focus = useRef(null);

    function handleFile(e){
        var fr = new FileReader(),
        imgtype = ["image/png", "image/jpg", "image/jpeg", "image/gif"],
        isimage = true;
    
        if(!imgtype.includes(e.target.files[0].type)) isimage = false;
        if(e.target.files[0].type !== "video/mp4" && !isimage){
            alert("Sus files");
            e.target.value = "";
        } else {
            setIsImage(isimage);
            if(isimage){
                fr.readAsDataURL(e.target.files[0]);
                fr.onload = () => setSrc(fr.result);
            } else setSrc(URL.createObjectURL(e.target.files[0]));
            setFile(e.target.files[0]);
        }
    }

    function add_val(val){
        var cat = category;
        while(true){
            if(cat[0] === " ") cat = cat.slice(1);
            else if(cat.slice(-2) === "  ") cat = cat.slice(0, -1);
            else break;
        }
        cat = cat.split(" ");
        cat[cat.length - 1] = val;
        setCategory(("" + cat).replaceAll(",", " ") + " ");
        focus.current.focus();
    }

    async function upload(){
        setDone(true);
        var cat = category;
        while(true){
            if(cat[0] === " ") cat = cat.slice(1);
            else if(cat.slice(-1) === " ") cat = cat.slice(0, -1);
            else break;
        }
        cat = cat.split(" ");
        for(var i of cat){
            if(categoryList.indexOf(i) < 0) return alert("Kategori ada yang tidak valid!");
        }
        if(title && cat && file){
            var fd = new FormData();
            fd.append("file", file);
            fd.append("category", JSON.stringify(cat));
            fd.append("title", title);

            var res = await axios.post(base_url + "/api/post/create", fd,
            { headers:{ "Content-Type":"multipart/form-data"} });

            if(res.data.status) window.location.href = "/";
            else alert(res.data.message);
        }
    }

    useEffect(() => {
        if(!check) (async () => {
            var cooldown = await axios.get(base_url + "/api/user/cooldown");
            setCheck(true);
            setCooldown(cooldown.data.status);
        })();
    }, [check]);

    function Main(){
        return(
            <>
                {done ? <Loading/> : ""}
                <div className="mt-3">
                    <span>Judul :</span>
                    <textarea className="w-100 p-2" onInput={e => setTitle(e.target.value)} rows="3"></textarea>
                </div>
                <div className="mt-3 position-relative">
                    <span>Kategori : </span>
                    <input ref={focus} value={category} onChange={e => {
                        setCategory(e.target.value);
                        setDisplay(true);
                    }} onBlur={() => setTimeout(() => setDisplay(false), 100)} className="w-100"/>
                    <div className="w-100" id="input-list" style={{ display:display ? "block" : "none" }}>
                        {categoryList.map((val, i) => {
                            var cat = category.toLowerCase();
                            while(true){
                                if(cat[0] === " ") cat = cat.slice(1);
                                else break;
                            }
                            
                            cat = cat.split(" ");
                            cat = cat[cat.length - 1];
                            if(val.indexOf(cat) > -1){
                                return <div onClick={() => add_val(val)} key={i}>{val}</div>;
                            }
                            return "";
                        })}
                    </div>
                </div>
                <div className="mt-3">
                    <span>Gambar :</span>
                    <input className="w-100" onChange={handleFile} type="file" accept=".jpg,.jpeg,.png"/>
                </div>
                <div className="mt-3">
                    <span>File Preview :</span>
                    {isImage ? <img id="img" alt="Preview" className="w-100" src={file ? src : "https://via.placeholder.com/300"}/> :
                    <video className="w-100" controls>
                        <source src={file ? src : "https://www.w3schools.com/html/mov_bbb.mp4"}/>
                    </video>
                    }
                </div>
                <button className="btn btn-dark mt-3" onClick={upload}>Upload</button>
            </>
        )
    }

    function Cooldown(){
        setTimeout(() => window.location.href = "/", 5000);
        return(
            <div className="text-center mt-3">
                <img className="w-50" src="https://media.tenor.com/o0lrdNm2BawAAAAC/aqua-cry-cute-aqua.gif" alt="Aqua Crying"/>
                <h5 className="mt-2">Kamu masih cooldown untuk memposting!</h5>
                <h6>Kamu akan dipindahkan ke halaman utama dalam 5 detik...</h6>
            </div>
        )
    }
    return(
        <>
            <Nav/>
            <div className="container">
                {check ? (cooldown ? Cooldown() : Main()) : <Loading/>}
            </div>
        </>
    );
}