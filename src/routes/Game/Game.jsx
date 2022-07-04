import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'; 
import style from './Game.module.css'


const Game = () => {

    const baseURL = 'https://pokeapi.co/api/v2/pokemon/?limit=100'


    useEffect( () => {

        const grabData = async () => {
            setErrorPokeNotFound(false)
            console.log('running the useEffect')
            const { data } = await axios(baseURL)
            const { results } = data
           
       return Promise.all(
            
            results.map( async (pokeData) => {
            const pokemon = await axios(pokeData.url);
            //si el id es mayor a 100, me tengo q traer una imagen de la api
            
            return pokemon
            })
        )
        }
        
        grabData()
            .then(data => {
           // console.log(data)
            setAllPokemons(data)
           
        })
    }, [])






  return (
    <div>
      <h4>llegaste papa</h4>
    </div>
 )
}

export default Game
