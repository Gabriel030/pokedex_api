import React from 'react'
import style from '../SearchBar/SearchBar.module.css'
import {useState} from 'react'



const SearchBar = ({name, setName}) => {

   

  
    
  return (
    <div className={style.searchBox}>
            <form >
                <input 
                    className={style.searchTxt}
                    type="text" 
                    placeholder="Search Pokemon..."
                    value = {name}
                    onChange={ (e) => setName(e.target.value)}
                />
                <button type="submit" className={style.searchBtn} style={{ outline: 'none' }}>
                    <i className="fas fa-search" ></i>
                </button>
            </form>
        </div>
  )
}

export default SearchBar
