import React from 'react';
import style from './Home.module.css'
import {useEffect, useState} from 'react'
import Card from '../../components/Card/Card'

const baseURL = 'https://pokeapi.co/api/v2/pokemon/'
const extendedLimit = "?limit=100"

const Home = () => {
    
    const [allPokemons, setAllPokemons] = useState([])
    const [pokemon, setPokemon] = useState();
    const [cont, setCont] = useState(1);

        
    
        const getAllPokemons = async (contador) =>{
            
            let endpoint = String(contador)
            const res = await fetch(baseURL + endpoint)
            const pokemon = await res.json();
            
            setAllPokemons([...allPokemons, pokemon])
            setCont(prevstate => prevstate +1); 
            
        }

      while( cont < 10) {

          useEffect(() => {
              getAllPokemons(cont)
              
          }, [])
          

      }
        

        

            
        
        
        console.log(allPokemons); 

    

  
    return (
    <>
        <h1>Hola soy la </h1>

        <div style = {{display: "flex"}}>
            
        
        

        </div>

    </>
  )

}

export default Home
