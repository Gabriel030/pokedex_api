import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import Detail from "./routes/Detail/Detail";
import Home from "./routes/Home/Home";
import NotFoundError from './components/NotFoundError/NotFoundError';


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./routes/Game/Game";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="home" element={<Home></Home>}></Route>
          <Route path="detail/:id" element={<Detail></Detail>}></Route>
          <Route path="/game" element={<Game />} ></Route>
          <Route path="*" element={<NotFoundError />} ></Route>
        </Routes>
      </BrowserRouter>
  

  </React.StrictMode>


);