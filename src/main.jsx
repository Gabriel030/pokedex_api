import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
//importar el provider y el store
import { Provider } from "react-redux";
import { store } from "./statesHandler/store";
import Home from "./routes/Home/Home";
import NotFoundError from './components/NotFoundError/NotFoundError'

//rutas
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="home" element={<Home></Home>}></Route>
          <Route path = "*" element ={<NotFoundError/>} ></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
