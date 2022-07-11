import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from './Game.module.css';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import pokedex from '/images/pokedex.png';
import palanding from '/images/palanding.png';
import Loading from '/images/pokeLoading.gif';
import gamelogo from '/images/gamelogo.png';
import gamegif from '/images/gamegif.gif';
import background from '/images/pokemongame.png';
import Navbar from '../../components/Navbar/Navbar';
import reload from '/images/reload.svg';

export default function Game() {

    const [success, setSuccess] = useState(true)
    const [game, setGame] = useState(false)
    const [allPokemons, setAllPokemons] = useState([]);
    const [chosenPokemon, setChosenPokemon] = useState([]); 
    const [pokeOptions, setPokeOptions] = useState([]);// 4 pokemons para opciones
    const baseURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    //const [pokeOptions, setPokeOptions] = useState([])
    // console.log(myPokemon[0] ? myPokemon[0].name : 'no hay nombre')


    const actualizar = () => {

        let pokeSorted = []
        
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        for(let i = 0; i < 4; i++){
            //chosenPokemons.length
            let indexRandom = getRandomInt(0, 148) ;
            //let poke = chosenPokemons.filter(indexRandom, 1);
            const { 0: poke } = allPokemons.filter((poke) => poke.data.id === indexRandom);
            pokeSorted.push(poke)
        }
        setPokeOptions(pokeSorted)

        // selecciona pokemon random elegido y lo pone en un estado
        let indexPok = getRandomInt(0, 3)
        setChosenPokemon(pokeSorted[indexPok])
}



useEffect(() => {
    
    if(!allPokemons.length){
         
                const grabData = async () => {
                    const { data } = await axios(baseURL)
                    const { results } = data
                    return Promise.all(
                        results.map(async (pokeData) => {
                            const pokemon = await axios(pokeData.url);
                            return pokemon
                        })
                    )
                }
                grabData()
                        .then(data => {
                            setAllPokemons(data)
                            //setChosenPokemons(prevState => [prevState, ...allPokemons])
                        })
    }
        
    if(!pokeOptions.length && allPokemons.length) {
                actualizar()
    }

}, [allPokemons ])


    //pokeOptions[0].data.sprites.other.home.front_default


  const handleOption = (e) => {
    console.log(e.target.innerText.toLowerCase())
        console.log(chosenPokemon.data.name)

    if( e.target.innerText.toLowerCase() == chosenPokemon.data.name){
        
        setSuccess(true)
    } else {
        setSuccess(false)
    }
    setGame(true)
}

    const handleReload = (e) =>{
        setGame(false)
        setAllPokemons([])
        setPokeOptions([])  
    }

    return (
        <div className={style.game}>

            

    <div className={style.game}>
          
            
            <div className={style.header}>
            <Link to='/home' style={{textDecoration: 'none'}} className={style.home}><button className={style.button}><img src={palanding} alt="palanding" width='100px'/></button></Link>
              <button  onClick={(e) => handleReload(e)} className={style.reload}><img src={reload} alt="pokebola" width='40px'/></button>
              <img src={background} className={style.bkg} alt="pokebola" width='580px'/>
              {
                pokeOptions.length && chosenPokemon ?
                <img 
                    src={chosenPokemon.data.sprites.other.home.front_default} 
                    style={ game ? {filter: 'grayscale(0) brightness(100%)'} : {}} className={style.img} alt="Pokemon" width='220px'/> :
                <img src={gamegif} style={ game ? {filter: 'grayscale(0) brightness(100%)'} : {}} className={style.img} alt="Pokemon" width='220px'/> 
            
              }
              <span className={style.introduction}>  <img src={gamelogo} alt="pokebola" width='300px' />
              

              {
                pokeOptions.length && game === false ?
                <div className={style.options}>
                        <button onClick={(e)=> handleOption(e)}> {pokeOptions[0]?.data.name.toUpperCase()} </button>
                        <button onClick={(e)=> handleOption(e)} > {pokeOptions[1]?.data.name.toUpperCase()} </button>
                        <button onClick={(e)=> handleOption(e)} > {pokeOptions[2]?.data.name.toUpperCase()} </button>
                        <button onClick={(e)=> handleOption(e)}> {pokeOptions[3]?.data.name.toUpperCase()} </button>
                </div>
                 :
                <div></div>
              }
                </span>
              {
                  game  ? 
                  success ?
                  <div className={style.result}>
                      Correct! This pokemon is {chosenPokemon?.data.name}
                  </div> :
                  <div className={style.result}>
                      Oops! Incorrect. This pokemon is {chosenPokemon?.data.name}
                  </div>
                  :
                  <div></div>
              }
            </div>
        </div>
        </div>
    )
}
