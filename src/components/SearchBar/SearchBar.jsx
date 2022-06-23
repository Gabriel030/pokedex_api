import React from 'react'
import style from '../SearchBar/SearchBar.module.css'


const SearchBar = () => {
  return (
    <div className={style.searchBox}>
            <form >
                <input 
                    className={style.searchTxt}
                    type="text" 
                    placeholder="Search Pokemon..."
                    value = ""
                    onChange={(e) => handleInputChange(e)}
                />
                <button type="submit" className={style.searchBtn} style={{ outline: 'none' }}>
                    <i className="fas fa-search" ></i>
                </button>
            </form>
        </div>
  )
}

export default SearchBar
