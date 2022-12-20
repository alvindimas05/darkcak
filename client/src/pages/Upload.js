import { useState, useRef } from "react";
import axios from "axios";
import Nav from "./Nav";

import "./css/upload.css";
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
    [image, setImage] = useState(null),
    [src, setSrc] = useState(null),
    [category, setCategory] = useState(""),
    [display, setDisplay] = useState(false),

    focus = useRef(null);

    function handleImage(e){
        var fr = new FileReader();
        fr.readAsDataURL(e.target.files[0]);
        fr.onload = () => setSrc(fr.result);
        setImage(e.target.files[0]);
    }

    function add_val(val){
        var cat = category;
        console.log(false);
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
        if(title && cat && image){
            var fd = new FormData();
            fd.append("image", image);
            fd.append("category", JSON.stringify(cat));
            fd.append("title", title);

            var res = await axios.post(base_url + "/api/post/create", fd,
            { headers:{ "Content-Type":"multipart/form-data"} });

            if(res.data.status) window.location.href = "/";
            else alert(res.data.message);
        }
    }
    return(
        <>
            <Nav/>
            <div className="container">
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
                            var cat = category;
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
                    <input className="w-100" onChange={handleImage} type="file" accept=".jpg,.jpeg,.png"/>
                </div>
                <div className="mt-3">
                    <span>Image Preview :</span>
                    <img id="img" alt="Preview" className="w-100" src={image ? src : "https://via.placeholder.com/300"}/>
                </div>
                <button className="btn btn-dark mt-3" onClick={upload}>Upload</button>
            </div>
        </>
    );
}