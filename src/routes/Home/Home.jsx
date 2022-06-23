import React from 'react';
import style from './Home.module.css'
import {useEffect, useState} from 'react'
import Card from '../../components/Card/Card'
import Detail from '../../routes/Detail/Detail'
import {useContext} from 'react'
import axios from 'axios'; 



const Home = () => {
    
    

  const [allPokemons, setAllPokemons] = useState([])
  //const [pokemon, setPokemon] = useState();
  
  const baseURL = 'https://pokeapi.co/api/v2/pokemon/'
  const extendedLimit = "?limit=100"
      
        
  
      useEffect( () => {
  
          const grabData = async () => {
            console.log('running the useEffect')
            const { data } = await axios(`${baseURL}${extendedLimit}`)
            const { results } = data
    
            return Promise.all(
              results.map( async (pokeData) => {
                const pokemon = await axios(pokeData.url);
                return pokemon
              })
            )
          }
          grabData().then(data => {
            console.log(data)
            setAllPokemons(data)
          })
      }, [])


    return (
    <>
        <h1>ACA VAN LAS CARDS </h1>

        <div className = {style.home}>
                {allPokemons.map(poke => {
                return(

                     <Card key = {poke.data.id} poke = {poke.data}>
                        
                     </Card>
                     
                    )})}
     

        </div>

    </>
  )

}

export default Home
