import React from 'react'
import style from './Paginado.module.css'

export default function Paginado(resultsFiltered ,{pageNumber,goToNumber}){
    
    /* console.log("aca empieza macho")
    console.log(resultsFiltered)
    console.log("aca empieza termina") */
    const pageNumbers = []
    

    for (let i = 0 ; i < 100 / 20 ; i++){
        pageNumbers.push(i + 1)
    }

   



    return(
        <nav >
            <ul className={style.pagination}>
                {
                    pageNumbers && pageNumbers.map( number => (
                        <li key={number} style={{ listStyle:'none' }}>
                           <button className={style.buttons} style={ pageNumber === number ? {color:"white"} : {color: "#797979"}}>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )

}





