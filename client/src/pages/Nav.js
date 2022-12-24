import { useState, useRef } from "react";
import cookies from "js-cookie";
import "./css/nav.css";

function a_href(e){
    window.location.href = e.currentTarget.children[0].getAttribute("href");
}

function nav_list(status){
    if(status.status){
        return(
        <div className="#nav-list">
            <div className="btn-list py-2 px-3" onClick={a_href}>
                <a href={"/u/" + status.username}>Your Posts</a>
            </div>
            <div className="btn-list py-2 px-3" onClick={a_href}>
                <a href="/profile">Profile</a>
            </div>
            <div className="btn-list py-2 px-3" onClick={a_href}>
                <a href="/upload">Upload</a>
            </div>
            <div className="btn-list py-2 px-3" onClick={a_href}>
                <a href="/logout">Log out</a>
            </div>
            <div className="btn-list py-2 px-3" onClick={a_href}>
                <a href="https://saweria.co/alvindimas05">Donate</a>
            </div>
        </div>
        );
    } else {
        return(
            <div>
                <div className="btn-list py-2 px-3" onClick={a_href}>
                    <a href="/login">Log in</a>
                </div>
                <div className="btn-list py-2 px-3" onClick={a_href}>
                    <a href="/register">Register</a>
                </div>
            </div>
        );
    }
}
var categoryList = [
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
export default function Nav(props){
    const [ display, setDisplay ] = useState("none"),
    [search, setSearch] = useState(""),
    [sdisplay, setSdisplay] = useState(false),
    [check, setCheck] = useState(false),

    focus = useRef(null);

    function add_val(val){
        var cat = search.toLowerCase();
        while(true){
            if(cat[0] === " ") cat = cat.slice(1);
            else if(cat.slice(-2) === "  ") cat = cat.slice(0, -1);
            else break;
        }
        cat = cat.split(" ");
        cat[cat.length - 1] = val;
        setSearch(("" + cat).replaceAll(",", " ") + " ");
        focus.current.focus();
    }

    function list_click(){
        if(display === "none") setDisplay("block");
        else setDisplay("none");
    }

    function search_enter(e){
        if(e.key === "Enter"){
            e.preventDefault();
            if(check) window.location.href = "/c/" + search;
            else window.location.href = "/s/" + search;
        }
    }

    var status = {
        status:cookies.get("username") ? true : false,
        username:cookies.get("username")
    };
    return(
    <nav className="nav bg-dark text-light position-relative" style={{ zIndex:"20" }}>
        <div className="container d-flex align-items-center my-2 px-3">
            <a className="navbar-brand fs-5" href="/">Darkcak</a>
            <i className="fa fa-list ms-auto" onClick={list_click}></i>
        </div>
        <div className="container bg-dark m-0 px-0" id="nav-list" style={{ display:display }}>
            {nav_list(status)}
            <div className="row py-2 px-1 w-100 m-0 search">
                <div className="col-11 ps-2 position-relative">
                    <input id="search" placeholder="Search" type="text" ref={focus} value={search}
                    onFocus={e => {
                        if(props.data) props.setData(props.data.map(dat => {
                            dat.display = false;
                            return dat;
                        }));
                        e.target.focus();
                    }}
                    onChange={e => {
                        setSearch(e.target.value);
                        if(check) setSdisplay(true);
                    }} onBlur={() => {
                        if(check) setTimeout(() => setSdisplay(false), 100);
                    }} onKeyDown={search_enter}/>
                    <div id="search-list-parent" style={{ display:sdisplay ? "block" : "none" }}>
                        <div id="search-list">
                            {(() => {
                                if(check) return categoryList.map((val, i) => {
                                    var cat = search.toLowerCase();
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
                                }); else return "";
                            })()}
                        </div>
                    </div>
                </div>
                <div className="col-1 ps-0 pe-1 d-flex justify-content-center">
                    <input onChange={e => setCheck(e.target.checked)} id="checkbox" type="checkbox"/>
                </div>
            </div>
        </div>
    </nav>
    );
}