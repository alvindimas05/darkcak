import { useState, useEffect, useRef } from "react";
import axios from "axios";

import Nav from "./Nav";
import Profile from "./Profile/Profile";
import cookies from "js-cookie";

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

export default function Prof(){
    const [profile, setProfile] = useState({
        user:cookies.get("username"),
        image:{ contentType:null, data:null },
        description:null,
    }),
    [image, setImage] = useState(null),
    [src, setSrc] = useState(null),
    [description, setDescription] = useState(""),
    [done, setDone] = useState(false),
    [blacklist, setBlacklist] = useState(""),
    [display, setDisplay] = useState(false),
    
    focus = useRef(null);

    useEffect(() => {
        if(!done) (async () => {
            var profile = 
            await axios.get(base_url + "/api/user/profile?username=" + cookies.get("username"));

            profile.data.data.user = cookies.get("username");
            profile.data.data.blacklist = ("" + profile.data.data.blacklist).replace(",", " ");
            setProfile(profile.data.data);
            setBlacklist(profile.data.data.blacklist);
            setDescription(profile.data.data.description);
            setDone(true);
        })();
    }, [done]);

    function preview_image(e){
        var fr = new FileReader(),
        imgtype = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
    
        if(imgtype.includes(e.target.files[0].type)){
            fr.readAsDataURL(e.target.files[0]);
            fr.onload = () => setSrc(fr.result);
            setImage(e.target.files[0]);
        } else {
            alert("Sus files");
            e.target.value = "";
        }
    }
    
    async function send(){
        var fd = new FormData();
        fd.append("description", description);
        fd.append("image", image);
        var res = await axios.post(base_url + "/api/user/profile", fd,
        { headers:{ "Content-Type":"multipart/form-data" } });

        if(res.data.status) window.location.reload();
        else alert(res.data.message);
    }

    async function nsfw(e){
        await axios.post(base_url + "/api/user/nsfw", { check:e.target.checked });
    }

    async function gore(e){
        await axios.post(base_url + "/api/user/gore", { check:e.target.checked });
    }
    function add_val(val){
        var cat = blacklist;
        while(true){
            if(cat[0] === " ") cat = cat.slice(1);
            else if(cat.slice(-2) === "  ") cat = cat.slice(0, -1);
            else break;
        }
        cat = cat.split(" ");
        cat[cat.length - 1] = val;
        setBlacklist(("" + cat).replaceAll(",", " ") + " ");
        focus.current.focus();
    }

    async function sendbl(e){
        if(e.key === "Enter"){
            var cat = blacklist;
            while(true){
                if(cat[0] === " ") cat = cat.slice(1);
                else if(cat.slice(-2) === "  ") cat = cat.slice(0, -1);
                else break;
            }
            cat = cat.split(" ");
            var result = await axios.post(base_url + "/api/user/blacklist", { blacklist:cat });
            if(result) window.location.reload();
        }
    }
    return(
        <>
            <Nav/>
            <Profile profile={profile} src={src}/>
            <div className="container">
                <div className="mt-3">
                    <span>Profil :</span>
                    <input onInput={preview_image} className="w-100" accept=".jpg,.jpeg,.png" type="file"/>
                </div>
                <div className="mt-3">
                    <span>Description :</span>
                    <textarea className="w-100 p-2" rows="5" 
                    defaultValue={profile.description ? profile.description : ""}
                    onInput={e => setDescription(e.target.value)}
                    placeholder="Insert description here"></textarea>
                </div>
                <button className="mt-1 btn btn-dark" onClick={async () => send()}>Submit</button>
            </div>
            <div className="container mt-2 mb-5">
                <hr/>
                <h5>Other Options</h5>
                <div>
                    <input type="checkbox" onChange={nsfw} defaultChecked={profile.nsfw}/>&nbsp;View nsfw contents
                </div>
                <div>
                    <input type="checkbox" onChange={gore} defaultChecked={profile.gore}/>&nbsp;View gore contents
                </div>
                <div className="position-relative mt-2">
                    <h6>Blacklist Tags</h6>
                    <input ref={focus} value={blacklist} onChange={e => {
                        setBlacklist(e.target.value);
                        setDisplay(true);
                    }} onBlur={() => setTimeout(() => setDisplay(false), 100)} onKeyDown={sendbl} className="w-100"/>
                    <div className="w-100" id="input-list" style={{ zIndex:10, display:display ? "block" : "none" }}>
                        {categoryList.map((val, i) => {
                            var cat = blacklist.toLowerCase();
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
                <hr/>
            </div>
        </>
    );
}