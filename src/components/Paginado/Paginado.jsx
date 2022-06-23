import React from 'react'
import style from './Paginado.module.css'

export default function Paginado({allPokemons, pageNumber,goToNumber}){
    
    console.log("aca empieza macho")
    console.log(allPokemons)
    console.log("aca empieza termina")
    const pageNumbers = []
    

    for (let i = 0 ; i < 200 / 20 ; i++){
        pageNumbers.push(i + 1)
    }

    console.log(pageNumbers)



    return(
        <nav >
            <ul className={style.pagination}>
                {
                    pageNumbers && pageNumbers.map( number => (
                        <li key={number} style={{ listStyle:'none' }}>
                           <button className={style.buttons} style={ pageNumber === number ? {color:"white"} : {color: "#797979"}}onClick={() => goToNumber(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )

}