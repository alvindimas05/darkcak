import Nav from "./Nav";
import axios from "axios";
import { useState } from "react";
import cookies from "js-cookie";

var base_url = process.env.REACT_APP_BASE_URL;
export default function Login(){
    const [username, setUsername] = useState(""),
    [password, setPassword] = useState("");

    async function login(){
        var res = await axios.post(base_url + "/api/user/login", {
            username:username,
            password:password
        });
        if(res.data.status){
            cookies.set("username", res.data.username, { expires:360 });
            window.location.href = "/";
        } else alert("Username atau Password salah!");
    }
    return(
        <>
            <Nav/>
            <div className="container p-2" align="center">
                <h3>Login Darkcak</h3>
                <div>
                    <span>Username</span><br/>
                    <input type="text" name="username" onInput={e => setUsername(e.target.value)} required/><br/>
                    <span>Password</span><br/>
                    <input type="password" name="password" onInput={e => setPassword(e.target.value)} required/><br/>
                    <button className="btn btn-dark mt-2" onClick={login}>Login</button><br/>
                    <a href="/register">Belum punya akun?</a>
                </div>
            </div>
        </>
    );
}