import React from "react";
import style from "./LandingPage.module.css";
import { Link } from "react-router-dom";


export default function LandingPage() {
  return (
    <div className={style.position}>
      <div className={style.entrada} style={{ display: "flex", flexFlow: "column"}}>
        <img src="images/logo.png" alt="Ashe" className={style.logoimg} />

        <Link to = "/home" className={style.boton}>
          Home
        </Link>

      </div>
      <img src="images/Ashe.png" alt="Loading.." width="180px" />
      <footer className={style.footer}>
        Project by Gabriel Antonietti & Ignacio Insaurralde
      </footer>
    </div>
  );
}
