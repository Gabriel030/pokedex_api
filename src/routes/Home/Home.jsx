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
    
    const baseURL = 'https://pokeapi.co/api/v2/pokemon/?limit=100'
    const extendedLimit = "?limit=150"
            
        
    const  [name, setName] = useState("") // es lo que escribe el usuario
    const  [pokeByName, setPokeByName] = useState("") // es el poke q traje con el name
    const  [errorPokeNotFound, setErrorPokeNotFound] = useState(false);
    const  [resultsFiltered, setResultsFiltered] = useState([]);

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

           
            
        }).then(() => {
            if(!name){
                console.log("no hay name")
                setResultsFiltered(allPokemons)
                console.log(resultsFiltered)
            }else{
                let laData = []
                console.log("HAY NAME")
                laData = allPokemons.filter( (poke) =>   poke.data.name.includes(name)) 
                setResultsFiltered(laData)
        
        
        

            }
        })

    }, [resultsFiltered])


    
    




    console.log(allPokemons)
    console.log(resultsFiltered)

        





    function goToNumber (num) {
        const offset = (num*20)-20
        setPageNumber(num)
        setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon/?limit=100&offset=${offset}`)
    }

   /*  function goToNextPage(){
        setCurrentPageUrl(nextPageUrl)
      }

      function goToPreviousPage(){
        setCurrentPageUrl(previousPageUrl)
      }
       */
      
      
    return (
    <div className = {style.fondo}>
        <Navbar name ={name} setName={setName} ></Navbar>
        
        <Paginado resultsFiltered = {resultsFiltered} pageNumber = {pageNumber} goToNumber ={goToNumber}></Paginado>
        
        


        <div className = {style.home}>

        {

                                     
               resultsFiltered.map(poke => {
                return(
                    
                    
                     <Card key = {poke.data.id} poke = {poke.data}></Card>
                     
                    )})
            
        }
                
     

        </div>

    </div>
  )

}

export default Home
