import { useState, useEffect } from "react";
import axios from "axios";

import Nav from "./Nav";
import Profile from "./Profile/Profile";
import cookies from "js-cookies";

var base_url = process.env.REACT_APP_BASE_URL;
export default function Prof(){
    const [profile, setProfile] = useState({
        user:cookies.getItem("username"),
        image:{ contentType:null, data:null },
        description:null
    }),
    [image, setImage] = useState(null),
    [src, setSrc] = useState(null),
    [description, setDescription] = useState(""),
    [done, setDone] = useState(false);

    useEffect(() => {
        if(!done) (async () => {
            var profile = 
            await axios.get(base_url + "/api/user/profile?username=" + cookies.getItem("username"));

            profile.data.data.user = cookies.getItem("username");
            setProfile(profile.data.data);
            setDescription(profile.data.data.description);
            setDone(true);
        })();
    }, [done]);

    function preview_image(img){
        var fr = new FileReader();
        fr.readAsDataURL(img);
        fr.onload = () => setSrc(fr.result);
        setImage(img);
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
    return(
        <>
            <Nav/>
            <Profile profile={profile} src={src}/>
            <div className="container">
                <div className="mt-3">
                    <span>Profil :</span>
                    <input onInput={e => preview_image(e.target.files[0])} className="w-100" accept=".jpg,.jpeg,.png" type="file"/>
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
            <div className="container mt-2">
                <hr/>
                <h5>Other Options</h5>
                <div>
                    <input type="checkbox" onChange={nsfw} defaultChecked={profile.nsfw}/>&nbsp;View nsfw contents
                </div>
                <div>
                    <input type="checkbox" onChange={gore} defaultChecked={profile.gore}/>&nbsp;View gore contents
                </div>
            </div>
        </>
    );
}