import { useState } from "react";
import axios from "axios";

import Nav from "./Nav";

var base_url = process.env.REACT_APP_BASE_URL;
export default function Register(){
    const [email, setEmail] = useState(""),
    [username, setUsername] = useState(""),
    [password, setPassword] = useState(""),
    [vpassword, setVpassword] = useState("");

    async function create(){
        var res = await axios.post(base_url + "/api/user/create", {
            email:email,
            username:username,
            password:password,
            vpassword:vpassword
        });

        if(res.data.status){
            alert("Check your email to verify!");
            window.location.href = "/";
        } else alert(res.data.message);
    }
    return(
        <>
            <Nav/>
            <div className="container p-2" align="center">
                <h3>Register Darkcak</h3>
                <div>
                    <span>Email</span><br/>
                    <input type="text" name="email" onInput={e => setEmail(e.target.value)} required/><br/>
                    <span>Username</span><br/>
                    <input type="text" name="username" onInput={e => setUsername(e.target.value)} required/><br/>
                    <span>Password</span><br/>
                    <input type="password" name="password" onInput={e => setPassword(e.target.value)} required/><br/>
                    <span>Verifikasi Password</span><br/>
                    <input type="password" name="vpassword" onInput={e => setVpassword(e.target.value)} required/><br/>
                    <button className="btn btn-dark mt-2" onClick={create}>Register</button><br/>
                    <a href="/login">Sudah punya akun?</a>
                </div>
            </div>
        </>
    )
}