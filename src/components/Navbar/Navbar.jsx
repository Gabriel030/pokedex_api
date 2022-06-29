import style from '../Navbar/Navbar.module.css'
import React from 'react'
import {Link} from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar';
import Logo from '/images/palanding.png';


const Navbar = ({allPokemons, name, setName, filterByName}) => {





  return (
  
      <nav className={style.nav}>
        <Link to='/home'>
                <span className={style.landinglink}>
                    <img id="logoPoke" src={Logo} width="120" alt="landing" />
                </span>
            </Link>

            <SearchBar allPokemons ={allPokemons} name ={name} setName={setName} filterByName={filterByName}></SearchBar>
    </nav>
    
    
  )

}

export default Navbar