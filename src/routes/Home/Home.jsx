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
import Loading from '/images/pokeLoading.gif';
import poke from '/images/pokebola.png';

const Home = () => {
    
    const baseURL = 'https://pokeapi.co/api/v2/pokemon/?limit=100'
    const extendedLimit = "?limit=150"
    const  [sortedArray,setSortedArray] = useState([])
    const  [types, setTypes] = useState([])
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

    
    useEffect(() =>{
        const getTypes = async () => {
           
            try {
                
                const {data} = await axios("https://pokeapi.co/api/v2/type/")
                setTypes(data.results)
            } catch (e) {
                console.log(e)
            }
        }

        getTypes()

    },[])


    
         
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
            setResultsFiltered(data)
           
            
        })

    }, [])

    useEffect(() => {
        console.log("volvi  aca gil")
        if(!name){
            console.log("no hay name")
            if(sortedArray.length === 0){
                setResultsFiltered(sortedArray)
            } else{

                setResultsFiltered(allPokemons)
            }  

        }else{
            let laData = []
            console.log("HAY NAME")
            laData = allPokemons.filter( (poke) =>   poke.data.name.includes(name)) 
            setResultsFiltered(laData)
            
            
    

        }

    },[name])
    
    




        
    function reloadAll  ()  {
        setName("")
        setSortedArray(allPokemons)
        setResultsFiltered(allPokemons)

        
    }

    function handleFilterByType (e) {
        
        if(e.target.value === "All"){
            setResultsFiltered(allPokemons)
        }else{
            const filterByType = allPokemons.filter(poke => {
            
                return  poke.data.types[0].type.name.includes(e.target.value)
           }
           )
           setResultsFiltered(filterByType)


        }
        
    }

    function handleSort (e) {
        


        let sorted
        switch (e.target.value) {
            case 'asc': 
                        
                        console.log("ASC")
                        sorted = resultsFiltered.sort((a,b) => {
                        if(a.data.name > b.data.name){
                            return 1;
                        }
                        if(b.data.name > a.data.name){
                            return -1;
                        }
                        return 0;
                        })
                
                break;
            case 'desc':
                        sorted = resultsFiltered.sort((a,b) => {
                        if(a.data.name > b.data.name){
                            return -1;
                        }
                        if(b.data.name > a.data.name){
                            return +1;
                        }
                        return 0;
                        })        



                break;

        
            default:
                break;
        }
        console.log(sortedArray)
        console.log(sorted)
        setSortedArray(sorted)
        console.log(resultsFiltered)
        
       


    }


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
        <button onClick={() => reloadAll()} className={style.poke}><img src={poke} alt="pokebola" width='20px'/> Reload all</button>

        <div className={style.sortfilter}>
                <select onChange={(e) => handleSort(e)}>
                    <option value="normal">Normal</option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                    <option value="HAttack">Highest Attack</option>
                    <option value="LAttack">Lowest Attack</option>
                </select>
                <select >
                    <option value="All">All</option>
                    <option value="Api">API</option>
                    <option value="Created">Created</option>
                </select>
                <select onChange={(e) => handleFilterByType(e)}>
                    <option value="All">all types</option>
                    {
                        types.map( type => (
                            <option value={type.name} key={type.name}>{type.name}</option>
                        ))
                    }
                </select>
            </div>


        <Paginado resultsFiltered = {resultsFiltered} pageNumber = {pageNumber} goToNumber ={goToNumber}></Paginado>
        
        


        <div className={style.home}>

            {/* Si aun no cargo allPokemons, entonces muestro el loading */}
                {allPokemons.length === 0 
                ? 
                (
                    <h3>
                        <img src={Loading} className={style.loading} alt="Loading..." />
                    </h3>
                ) 
                :
                 
                   resultsFiltered.length === 0 
                   ?
                   (
                    <h3>
                        <img src="images/searchNotFound.gif" className={style.loading} alt="Loading..." />
                    </h3>
                   )
                   :
                   (
                    /* si ya cargo el allPokemons entonces mapeo la variable */
                    resultsFiltered.map(poke => {
                        return (
                            <Card key={poke.data.id} poke={poke.data}></Card>
                        )

                    })
                   )

                }

            </div>

    </div>
  )

}

export default Home
