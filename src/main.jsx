import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

//impotar el creador de contexto

import Detail from "./routes/Detail/Detail";

import Home from "./routes/Home/Home";
import NotFoundError from './components/NotFoundError/NotFoundError'

//rutas
import { BrowserRouter, Routes, Route } from "react-router-dom";









ReactDOM.createRoot(document.getElementById("root")).render(
  
    

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="home" element={<Home></Home>}></Route>
          <Route path="detail/:id" element={<Detail></Detail>}></Route>
          <Route path = "*" element ={<NotFoundError/>} ></Route>
        </Routes>
      </BrowserRouter>
    
    
 
);
