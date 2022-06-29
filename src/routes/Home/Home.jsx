import React from 'react';
import style from './Home.module.css'
import {useEffect, useState} from 'react'
import Card from '../../components/Card/Card'
import Detail from '../../routes/Detail/Detail'
import {useContext} from 'react'
import axios from 'axios'; 
import Navbar from '../../components/Navbar/Navbar'
import Paginado from '../../components/Paginado/Paginado'
import PokeNotFound from '../../components/PokeNotFound/PokeNotFound';


const Home = () => {
    
    const baseURL = 'https://pokeapi.co/api/v2/pokemon/'
    const extendedLimit = "?limit=150"
            
        
    const  [name, setName] = useState("") // es lo que escribe el usuario
    const  [pokeByName, setPokeByName] = useState("") // es el poke q traje con el name
    const  [errorPokeNotFound, setErrorPokeNotFound] = useState(false);

    const  [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
    const  [nextPageUrl, setNextPageUrl] = useState();
    const  [previousPageUrl, setPreviousPageUrl] = useState()
    const  [pageNumber, setPageNumber] = useState(1)
    const  [allPokemons, setAllPokemons] = useState([])
    //const [pokemon, setPokemon] = useState();

    
        
  
    useEffect( () => {

        const grabData = async () => {
            setErrorPokeNotFound(false)
            console.log('running the useEffect')
            const { data } = await axios(currentPageUrl)
            const { results } = data

            setNextPageUrl(data.next)
            setPreviousPageUrl(data.previous)

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

    }, [currentPageUrl])



    const filterByName = async (e) => {
            e.preventDefault();
            setErrorPokeNotFound(false)
            console.log("LLEGUE ACA")
            

            try {
                if(name ==""){

                    setCurrentPageUrl('https://pokeapi.co/api/v2/pokemon/')
                }else{
                    const {data} = await axios.get(baseURL+name)
                    setPokeByName(data)
                    
                }
            
            
            } catch (error) {
                setErrorPokeNotFound(true)
                console.log(error)
            }
            
            
                       
        }


    function goToNumber (num) {
        const offset = (num*20)-20
        setPageNumber(num)
        setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon/?limit=200&offset=${offset}`)
    }

    function goToNextPage(){
        setCurrentPageUrl(nextPageUrl)
      }

      function goToPreviousPage(){
        setCurrentPageUrl(previousPageUrl)
      }
      console.log(pokeByName)
      
      
    return (
    <div className = {style.fondo}>
        <Navbar allPokemons = {allPokemons} name ={name} setName={setName} filterByName = {filterByName}></Navbar>
        
        <Paginado allPokemons = {allPokemons} pageNumber = {pageNumber} goToNumber ={goToNumber}></Paginado>
        
        


        <div className = {style.home}>

        {

            
            pokeByName != ""? (
                <Card key = {pokeByName.id} poke = {pokeByName}></Card>
            )
            : ( errorPokeNotFound ? (

                <PokeNotFound></PokeNotFound>
                
               )
               :
               
               allPokemons.map(poke => {
                return(
                    
                    
                     <Card key = {poke.data.id} poke = {poke.data}></Card>
                     
                    )})
            )
        }
                
     

        </div>

    </div>
  )

}

export default Home
