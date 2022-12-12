//import axios from "axios";
import { useState, useRef} from "react";
import "./css/nav.css";

export default function Nav(){
    const [ display, setDisplay ] = useState("none"),
    btnRef = useRef();

    function list_click(){
        if(display === "none") setDisplay("block");
        else setDisplay("none");
    }

    function a_href(e){
        window.location.href = e.currentTarget.children[0].getAttribute("href");
    }

    function nav_list(status){
        if(status.status){
            return(
            <div className="#nav-list">
                <div className="btn-list py-2 px-3" onClick={a_href}>
                    <a href={"/u?username" + status.username}>Your Posts</a>
                </div>
                <div className="btn-list py-2 px-3" ref={btnRef}>
                    <a href="/profile">Profile</a>
                </div>
                <div className="btn-list py-2 px-3" ref={btnRef}>
                    <a href="/upload">Upload</a>
                </div>
                <div className="btn-list py-2 px-3" ref={btnRef}>
                    <a href="/logout">Log out</a>
                </div>
            </div>
            );
        } else {
            return(
                <div>
                    <div className="btn-list py-2 px-3" ref={btnRef}>
                        <a href="/login">Log in</a>
                    </div>
                    <div className="btn-list py-2 px-3" ref={btnRef}>
                        <a href="/register">Register</a>
                    </div>
                </div>
            );
        }
    }

    var status = {//axios.get("/api/nav");
        status:true,
        username:"alvindimas"
    }
    return(
    <nav className="nav bg-dark text-light">
        <div className="container d-flex align-items-center my-2 px-3">
            <a className="navbar-brand fs-5" href="/">Darkcak</a>
            <i className="fa fa-list ms-auto fa-xl" onClick={list_click}></i>
        </div>
        <div className="container bg-dark m-0 px-0" id="nav-list" style={{ display:display }}>
            {nav_list(status)}
            <div className="py-2 px-3">
                <input id="search" type="text" placeholder="Search"/>
            </div>
        </div>
    </nav>
    );
}