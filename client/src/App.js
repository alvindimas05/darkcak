import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Search from "./pages/Search";
import User from "./pages/User";
import Upload from "./pages/Upload";
import Prof from "./pages/Prof";
import Logout from "./pages/Logout";
import Category from "./pages/Category";
import OnePost from "./pages/Post";

axios.defaults.withCredentials = true;

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/p/:page" element={<Main/>}/>
        <Route path="/g/:id" element={<OnePost/>}/>
        <Route path="/s/:search" element={<Search/>}/>
        <Route path="/s/:search/p/:page" element={<Search/>}/>
        <Route path="/u/:user" element={<User/>}/>
        <Route path="/u/:user/p/:page" element={<User/>}/>
        <Route path="/c/:category" element={<Category/>}/>
        <Route path="/c/:category/p/:page" element={<Category/>}/>
        <Route path="/profile" element={<Prof/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/upload" element={<Upload/>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </BrowserRouter>
  )
}