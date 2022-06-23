import style from '../Navbar/Navbar.module.css'
import React from 'react'
import {Link} from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar';

const Navbar = () => {
  return (
    <nav className={style.nav}>
        <Link to='/'>
                <span className={style.landinglink}>
                    <img id="logoPoke" src={`images/palanding.png`} width="120" alt="landing" />
                </span>
            </Link>

            <SearchBar></SearchBar>
    </nav>
  )

}

export default Navbar
